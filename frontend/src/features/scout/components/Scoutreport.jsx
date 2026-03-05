import React from 'react'
import "../style/dashboardScout.scss"
import { useNavigate } from 'react-router'
import { useScout } from '../hooks/useScout'

const ScoutReport = ({ report }) => {
  const navigate = useNavigate()
  const { handleAcceptReport } = useScout()

  const handleAccept = async () => {
    try {
      await handleAcceptReport(report)
      navigate('/scout/active-rescue')
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept report!")
    }
  }

  const isAccepted = report.status === 'accepted'
  const isResolved = report.status === 'resolved'

  return (
    <div className='report'>

      <div className='imgbox'>
        <img src={report.photo} alt="animal" />
        <p className={`status-badge ${isAccepted ? 'badge-accepted' : isResolved ? 'badge-resolved' : 'badge-pending'}`}>
          {report.status}
        </p>
      </div>

      <div className='animaldetails'>
        <div className='damagetype'>
          <h1>🐾 {report.animal_type} - {report.injury_type}</h1>
        </div>
        <div className='location'>
          <h3>📍&nbsp;&nbsp; {report.location_name}</h3>
        </div>
        <div className='extra-info'>
          <span className='distance'>📏 {report.distance}</span>
          <span className='duration'>🕐 {report.duration}</span>
        </div>
      </div>

      <div className='nametime'>
        <div className='userDetails'>
          Reported by: {report.informer_name}
        </div>
        <div className='time'>
          <h3>{report.timeAgo}</h3>
        </div>
      </div>

      {/* Accepted ya Resolved hone par buttons ki jagah message */}
      {isAccepted || isResolved ? (
        <div className='accepted-info'>
          <span>
            {isAccepted
              ? `✅ Accepted by: ${report.scout_name || 'A Scout'}`
              : `🏁 Resolved by: ${report.scout_name || 'A Scout'}`}
          </span>
        </div>
      ) : (
        <div className='action-btns'>
          <button onClick={handleAccept} className='btn-accept'>✅ Accept</button>
          <button className='btn-ignore'>✖ Ignore</button>
        </div>
      )}

    </div>
  )
}

export default ScoutReport