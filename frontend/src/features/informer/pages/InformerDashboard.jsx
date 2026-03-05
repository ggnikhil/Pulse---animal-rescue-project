import React, { useEffect } from 'react'
import "../style/dashboardInformer.scss"
import Report from '../components/Report'
import { useNavigate } from 'react-router'
import { useInformer } from '../hooks/useInformer'

const InformerDashboard = () => {
  const navigate = useNavigate()
  const { reports, reportsLoading, handleGetMyReports, informer, handleGetInformerDetails, handleLogoutInformer } = useInformer()

  const handleLogout = async () => {
    await handleLogoutInformer()
    navigate('/informer/login')
  }

  useEffect(() => {
    handleGetMyReports()
    handleGetInformerDetails()
  }, [])

  return (
    <div className='main'>
      <div className='informerdashboard'>

        <div className='header'>
          <div className='header-logo'>
            <img src="/hii.png" alt="logo" />
          </div>
          <div className='header-reports'>
            <p>🐾 Reports: {reports.length}</p>
          </div>
          <div className='informeruser' onClick={handleLogout}>
            <img src={informer?.profile || "/default-avatar.png"} alt="informer" />
          </div>
        </div>

        <div className='feed'>
          {reportsLoading && <h2>Loading...</h2>}
          {!reportsLoading && reports.length === 0 && <h2>No reports yet</h2>}
          {!reportsLoading && reports.map((report) => (
            <Report key={report._id} report={report} />
          ))}
        </div>

        <button className='fab-btn' onClick={() => navigate('/informer/report')}>
          <i className="ri-add-line"></i>
          <span className='fab-tooltip'>New Report</span>
        </button>

      </div>
    </div>
  )
}

export default InformerDashboard