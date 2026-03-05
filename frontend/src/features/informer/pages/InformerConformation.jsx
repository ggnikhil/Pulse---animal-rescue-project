import React from 'react'
import { useNavigate } from 'react-router'
import '../style/conformationInformer.scss'

const InformerConformation = () => {
  const navigate = useNavigate()

  return (
    <main>
      <div className='conformation'>

        {/* Checkmark */}
        <div className='check-icon'>✅</div>

        {/* Title */}
        <div className='conformation-text'>
          <h1>Report Submitted!</h1>
          <p>Your report has been received. 🐾<br />
          A nearby NGO rescue team has been notified and will reach the animal as soon as possible!</p>
        </div>

        {/* Buttons */}
        <div className='conformation-btns'>
          <button className='btn-orange' onClick={() => navigate('/informer/dashboard')}>
            🏠 Go to Home
          </button>
          <button className='btn-outline' onClick={() => navigate('/informer/report')}>
            Report Another Animal
          </button>
        </div>

      </div>
    </main>
  )
}

export default InformerConformation