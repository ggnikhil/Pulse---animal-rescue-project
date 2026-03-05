import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import '../style/conformationScout.scss'
import { useScout } from '../hooks/useScout'

const ScoutConformation = () => {
  const navigate = useNavigate()
  const { setActiveReport } = useScout()

  useEffect(() => {
    // activeReport clear karo — localStorage bhi
    setActiveReport(null)
  }, [])

  return (
    <main>
      <div className='conformation'>

        <div className='check-icon'>✅</div>

        <div className='conformation-text'>
          <h1>Rescue Complete!</h1>
          <p>Great work! 🐾<br />
          You have successfully rescued the animal. Thank you for your service!</p>
        </div>

        <div className='conformation-btns'>
          <button className='btn-blue' onClick={() => navigate('/scout/dashboard')}>
            🏠 Go to Home
          </button>
        </div>

      </div>
    </main>
  )
}

export default ScoutConformation
