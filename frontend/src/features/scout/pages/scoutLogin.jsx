import React, { useState } from 'react'
import "../style/loginScout.scss"
import { Link, useNavigate } from "react-router"
import { useScout } from '../hooks/useScout'

const ScoutLogin = () => {
  const navigate = useNavigate()
  const { loading, handleLoginScout } = useScout()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await handleLoginScout(formData.email, formData.password)
      setFormData({ email: '', password: '' })
      navigate('/scout/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!")
    }
  }

  if (loading) {
    return <main><h1>Loading.......</h1></main>
  }

  return (
    <main>
      <div className='scoutLogin'>
        <div className='loginbox1'>
          <h1>login</h1>
        </div>

        <div className='loginbox2'>
          <form onSubmit={handleSubmit}>

            <div className='emailbox'>
              <h3>email</h3>
              <input type="text" name="email" value={formData.email}
                onChange={handleChange} placeholder='email@example.com / username' required />
            </div>

            <div className='passwordbox'>
              <h3>password</h3>
              <input type="password" name="password" value={formData.password}
                onChange={handleChange} placeholder='enter password' required />
            </div>

            <button type="submit" className='btn-red'>Login</button>

          </form>
        </div>

        <div className='loginbox3'>
          <p className='loginPtag'>New here? <Link to={"/scout/register"}>Create new Account</Link></p>
        </div>

        <div className='loginbox4'>
          <p className='policyPara'>By continuing to log in or sign up, you confirm that you have read, understood, and agree to our Terms of Service and Privacy Policy, which govern your use here.</p>
        </div>
      </div>
    </main>
  )
}

export default ScoutLogin