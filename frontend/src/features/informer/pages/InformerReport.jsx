import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../style/reportInformer.scss"
import { useInformer } from '../hooks/useInformer'

const InformerReport = () => {
  const navigate = useNavigate()
  const { loading, handleCreateReport } = useInformer()

  const [animalCategory, setAnimalCategory] = useState('')
  const [animalType, setAnimalType] = useState('')
  const [injuryType, setInjuryType] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [location, setLocation] = useState({ lat: '', lon: '', name: '' })

  const animalCategories = [
    { label: 'Mammals', emoji: '🐾' },
    { label: 'Reptiles', emoji: '🦎' },
    { label: 'Birds', emoji: '🐦' },
    { label: 'Amphibians', emoji: '🐸' },
  ]

  const injuryTypes = [
    { label: 'Hit by vehicle', emoji: '🚗' },
    { label: 'Bleeding', emoji: '🩸' },
    { label: 'Stuck', emoji: '😰' },
    { label: 'Sick', emoji: '🤒' },
    { label: 'Unconscious', emoji: '😵' },
    { label: 'Trapped', emoji: '🪤' },
  ]

  const handlePhoto = (e) => {
    if (e.target.files[0]) setPhoto(e.target.files[0])
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        name: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!location.lat || !location.lon) {
      alert("Please detect your location first!")
      return
    }

    if (!photo) {
      alert("Please take a photo!")
      return
    }

    if (!animalCategory) {
      alert("Please select animal category!")
      return
    }

    if (!injuryType) {
      alert("Please select injury type!")
      return
    }

    try {
      await handleCreateReport(
        animalCategory.toLowerCase(),
        animalType,
        injuryType.toLowerCase(),
        description,
        photo,
        location.lat,
        location.lon
      )
      navigate('/informer/conformation')
    } catch (err) {
      alert(err.response?.data?.message || "Report submission failed!")
    }
  }

  if (loading) return <main><h1>Submitting...</h1></main>

  return (
    <main>
      <div className='reportpage'>

        <div className='report-header'>
          <button className='back-btn' onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1>Report Injured Animal</h1>
          <span>2 min</span>
        </div>

        <form className='report-form' onSubmit={handleSubmit}>

          <div className='field'>
            <label>📷 ANIMAL PHOTO *</label>
            <div className='photo-box' onClick={() => document.getElementById('photoInput').click()}>
              {photo ? <p>✅ {photo.name}</p> : <p>📷 Tap to capture photo</p>}
              <input id='photoInput' type="file" accept="image/*" capture="environment" onChange={handlePhoto} hidden />
            </div>
          </div>

          <div className='field'>
            <label>📍 YOUR LOCATION *</label>
            <div className='location-box'>
              <div className='location-text'>
                <span>📍</span>
                <p>{location.name || 'Tap refresh to detect'}</p>
              </div>
              <button type="button" className='refresh-btn' onClick={getLocation}>
                Refresh
              </button>
            </div>
          </div>

          <div className='field'>
            <label>🐾 ANIMAL CATEGORY *</label>
            <div className='chip-group'>
              {animalCategories.map((a) => (
                <button type="button" key={a.label}
                  className={`chip ${animalCategory === a.label ? 'active' : ''}`}
                  onClick={() => setAnimalCategory(a.label)}>
                  {a.emoji} {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className='field'>
            <label>🐶 ANIMAL TYPE *</label>
            <input type="text" placeholder='e.g. Dog, Cat, Snake, Parrot...'
              value={animalType} onChange={(e) => setAnimalType(e.target.value)} required />
          </div>

          <div className='field'>
            <label>🚨 INJURY TYPE *</label>
            <div className='chip-group'>
              {injuryTypes.map((i) => (
                <button type="button" key={i.label}
                  className={`chip ${injuryType === i.label ? 'active' : ''}`}
                  onClick={() => setInjuryType(i.label)}>
                  {i.emoji} {i.label}
                </button>
              ))}
            </div>
          </div>

          <div className='field'>
            <label>📝 DESCRIPTION *</label>
            <input type="text" placeholder='Describe the animal condition...'
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <button type="submit" className='btn-orange submit-btn'>
            🚨 SUBMIT REPORT
          </button>

        </form>
      </div>
    </main>
  )
}

export default InformerReport