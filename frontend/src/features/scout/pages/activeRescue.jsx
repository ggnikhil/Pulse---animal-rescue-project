import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "../style/rescueScout.scss"
import { useScout } from '../hooks/useScout'
import { useNavigate } from 'react-router'
import { resolveReport } from '../services/scout.api'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const STATUS_STEPS = ["pending", "accepted", "on way", "rescued"]

// Auto fit both markers on map
const FitBounds = ({ scoutPos, animalPos }) => {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds([scoutPos, animalPos])
    map.fitBounds(bounds, { padding: [60, 60] })
  }, [scoutPos, animalPos])
  return null
}

const ActiveRescue = () => {
  const navigate = useNavigate()
  const { activeReport } = useScout()

  const [route, setRoute] = useState(null)
  const [routeInfo, setRouteInfo] = useState(null)
  const [status, setStatus] = useState("accepted")
  const [scoutLocation, setScoutLocation] = useState(null)

  // Live location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setScoutLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
      },
      (err) => console.log("Location error:", err),
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  // Route fetch
  useEffect(() => {
    if (!scoutLocation || !activeReport) return

    const url = `http://router.project-osrm.org/route/v1/driving/${scoutLocation.lon},${scoutLocation.lat};${activeReport.informer_lon},${activeReport.informer_lat}?overview=full&geometries=geojson`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const leg = data.routes[0]
        const coords = leg.geometry.coordinates.map(([lng, lat]) => [lat, lng])
        setRoute(coords)
        setRouteInfo({
          distance: (leg.distance / 1000).toFixed(1),
          duration: Math.round(leg.duration / 60)
        })
      })
      .catch(err => console.log("Route error:", err))
  }, [scoutLocation, activeReport])

  // Check 1 — activeReport nahi hai
  if (!activeReport) {
    return (
      <div className='activerescue'>
        <div className='empty-state'>
          <h2>No active rescue</h2>
          <button onClick={() => navigate('/scout/dashboard')}>← Go Back</button>
        </div>
      </div>
    )
  }

  // Check 2 — location aa rahi hai
  if (!scoutLocation) {
    return (
      <div className='activerescue'>
        <div className='empty-state'>
          <h2>📍 Getting your location...</h2>
        </div>
      </div>
    )
  }

  const scoutPos = [scoutLocation.lat, scoutLocation.lon]
  const animalPos = [activeReport.informer_lat, activeReport.informer_lon]
  const mapCenter = [
    (scoutPos[0] + animalPos[0]) / 2,
    (scoutPos[1] + animalPos[1]) / 2
  ]

  const currentStep = STATUS_STEPS.indexOf(status)

  const handleResolved = async () => {

    try {
      await resolveReport(activeReport._id)
      setStatus('rescued')
      setTimeout(() => navigate('/scout/conformation'), 1500)
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 400) {
          navigate('/scout/conformation')
        } else {
          alert(err.response?.data?.message || "Failed to resolve!")
      }
    }
  }

  return (
    <div className='activerescue'>

      {/* Map Section */}
      <div className='map-section'>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds scoutPos={scoutPos} animalPos={animalPos} />
          <Marker position={scoutPos} />
          <Marker position={animalPos} />
          {route && <Polyline positions={route} color="#263238" weight={4} />}
        </MapContainer>

        {routeInfo && (
          <div className='map-info-pill'>
            📍 {activeReport.location_name} — {routeInfo.distance} km · {routeInfo.duration} min
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className='details-section'>

        <div className='animal-info'>
          <span className='label'>ACTIVE RESCUE</span>
          <h2>🐾 {activeReport.animal_type} — {activeReport.injury_type}</h2>
        </div>

        <a className='contact-box' href={`tel:${activeReport.informer_contact}`}>
          <span className='contact-icon'>👤</span>
          <div>
            <p className='contact-label'>Informer Contact</p>
            <p className='contact-number'>{activeReport.informer_contact} (tap to call)</p>
          </div>
        </a>

        <div className='status-section'>
          <span className='label'>STATUS</span>
          <div className='status-steps'>
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className='step-wrapper'>
                <div className={`step-circle ${i <= currentStep ? 'done' : ''}`}>
                  {i <= currentStep ? '✓' : '○'}
                </div>
                <span className={`step-label ${i <= currentStep ? 'done-label' : ''}`}>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`step-line ${i < currentStep ? 'done' : ''}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className='btn-rescued' onClick={handleResolved}>
          ✅ Mark as Rescued
        </button>

      </div>
    </div>
  )
}

export default ActiveRescue