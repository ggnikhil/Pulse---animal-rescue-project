import React from 'react'

const Report = ({ report }) => {
  return (
    <div className='report'>
      <div className='imgbox'>
        <img src={report.photo} alt="reportimage" />
        <p className={`status-badge ${report.status === 'accepted' ? 'badge-accepted' : report.status === 'resolved' ? 'badge-resolved' : 'badge-pending'}`}>
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
      </div>

      <div className='nametime'>
        <div className='userDetails'>
          {report.status === 'accepted' ? '✅ Rescue on the way!' : report.status === 'resolved' ? '🏁 Rescued!' : '⏳ Waiting for rescue...'}
        </div>
        <div className='time'>
          <h3>{report.timeAgo}</h3>
        </div>
      </div>
    </div>
  )
}

export default Report