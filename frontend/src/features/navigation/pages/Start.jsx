import React from 'react'
import '../style/start.scss'
import { useNavigate } from 'react-router'

const Start = () => {

    const navigate = useNavigate()

  return (
    <main>
        <div className='startpage'>

            <div className='continueinformer'>
                <div className='informerimg'>
                    <img src="/infomer.jpg" alt="informer" />
                </div>
                <button onClick={() => navigate('/informer/login')} className='button'>Continue as Informer</button>
            </div>

            <div className='continuescout'>
                <div className='scoutimg'>
                    <img src="/scout image.jpg" alt="scout" />
                </div>
                <button onClick={() => navigate('/scout/login')} className='button'>Continue as Scout</button>
            </div>

        </div>
    </main>
  )
}

export default Start