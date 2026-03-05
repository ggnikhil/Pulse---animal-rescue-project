import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/registerScout.scss"
import { useScout } from '../hooks/useScout'

const ScoutRegister = () => {
  const navigate = useNavigate()
  const { loading, handleRegisterScout } = useScout()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    ngo_name: '',
    ngo_address: '',
  })

  const [ngoLocation, setNgoLocation] = useState({ lat: '', lon: '', name: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getNgoLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setNgoLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        name: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!ngoLocation.lat || !ngoLocation.lon) {
      alert("Please detect your NGO location first!")
      return
    }

    try {
      await handleRegisterScout(
        formData.username,
        formData.email,
        formData.password,
        formData.contact,
        formData.ngo_name,
        formData.ngo_address,
        ngoLocation.lat,
        ngoLocation.lon
      )
      setFormData({ username: '', email: '', password: '', contact: '', ngo_name: '', ngo_address: '' })
      setNgoLocation({ lat: '', lon: '', name: '' })
      navigate('/scout/login')
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!")
    }
  }

  if (loading) {
    return <main><h1>Loading.......</h1></main>
  }

  return (
    <main>
      <div className='scoutregister'>

        <div className='registerbox1'>
          <h1>Register</h1>
        </div>

        <div className='registerbox2'>
          <form onSubmit={handleSubmit}>

            <div className='namedail'>
              <div className='namedailbox1'>
                <h3>Username</h3>
                <input type="text" name="username" value={formData.username}
                  onChange={handleChange} placeholder='Enter Username' required />
              </div>
              <div className='namedailbox2'>
                <h3>NGO Name</h3>
                <input type="text" name="ngo_name" value={formData.ngo_name}
                  onChange={handleChange} placeholder='Enter NGO name' required />
              </div>
            </div>

            <div className='contact'>
              <h3>Contact</h3>
              <input type="number" name="contact" value={formData.contact}
                onChange={handleChange} placeholder='Example 1234567890' required />
            </div>

            <div className='ngoaddress'>
              <h3>NGO Address</h3>
              <input type="text" name="ngo_address" value={formData.ngo_address}
                onChange={handleChange} placeholder='Enter NGO Address' required />
            </div>

            <div className='ngolocation'>
              <h3>NGO Location *</h3>
              <div className='location-box'>
                <div className='location-text'>
                  <span>📍</span>
                  <p>{ngoLocation.name || 'Tap refresh to detect'}</p>
                </div>
                <button type="button" className='refresh-btn' onClick={getNgoLocation}>
                  Refresh
                </button>
              </div>
            </div>

            <div className='email'>
              <h3>Email</h3>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder='Example@gmail.com' required />
            </div>

            <div className='password'>
              <h3>Password</h3>
              <input type="password" name="password" value={formData.password}
                onChange={handleChange} placeholder='Enter password' required />
            </div>

            <button type="submit" className='btn-orange'>Create Account</button>
          </form>
        </div>

        <div className='registerbox3'>
          <p className='loginPtag'>Already have account? <Link to="/scout/login">login here</Link></p>
        </div>

      </div>
    </main>
  )
}

export default ScoutRegister