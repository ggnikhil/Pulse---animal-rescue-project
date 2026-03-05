import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import "../style/registerInformer.scss"
import { useInformer } from '../hooks/useInformer'

const InformerRegister = () => {
  const navigate = useNavigate()
  const { loading, handleRegisterInformer } = useInformer()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegisterInformer(formData.username, formData.email, formData.password, formData.contact)
      setFormData({ username: '', email: '', password: '', contact: '' })
      navigate('/informer/login')
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!")
    }
  }

  if (loading) return <main><h1>Loading.......</h1></main>

  return (
    <main>
      <div className='informerRegister'>
        <div className='registerbox1'>
          <h1>Register</h1>
        </div>

        <div className='registerbox2'>
          <form onSubmit={handleSubmit}>

            <div className='Username'>
              <h3>Username</h3>
              <input type="text" name="username" value={formData.username}
                onChange={handleChange} placeholder='Enter Username' required />
            </div>

            <div className='contact'>
              <h3>Contact</h3>
              <input type="number" name="contact" value={formData.contact}
                onChange={handleChange} placeholder='Example 1234567890' required />
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

            <button type="submit" className='btn-red'>Create Account</button>
          </form>
        </div>

        <div className='registerbox3'>
          <p className='loginPtag'>Already have account? <Link to={"/informer/login"}>login here</Link></p>
        </div>
      </div>
    </main>
  )
}

export default InformerRegister