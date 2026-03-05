import React, { useEffect } from 'react'
import "../style/dashboardScout.scss"
import ScoutReport from "../components/Scoutreport"
import { useNavigate } from 'react-router'
import { useScout } from '../hooks/useScout'

const ScoutDashboard = () => {
  const navigate = useNavigate()
  const { reports, reportsLoading, handleGetAllReports, scout, handleGetScoutDetails, handleLogoutScout } = useScout()

  const handleLogout = async () => {
      await handleLogoutScout()
      navigate('/scout/login')
  }

  useEffect(() => {
    handleGetAllReports()
    handleGetScoutDetails()
  }, [])

  return (
    <div className='main'>
      <div className='scoutdashboard'>

        <div className='header'>
          <div className='header-logo'>
            <img src="/hii.png" alt="logo" />
          </div>
          <div className='header-alerts'>
            <p>🚨 Alerts: {reports.length}</p>
          </div>
          <div className='scoutuser' onClick={handleLogout}>
            <img src={scout?.profile || "/default-avatar.png"} alt="scout" />
          </div>
        </div>

        <div className='feed'>
          {reportsLoading && <h2>Loading...</h2>}
          {!reportsLoading && reports.length === 0 && <h2>No reports found</h2>}
          {!reportsLoading && reports.map((report) => (
            <ScoutReport key={report._id} report={report} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default ScoutDashboard