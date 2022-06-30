import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Login() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, currentUser, logout } = useAuth()

  const handleClick = async () => {
    console.log(useAuth)

    if (!validSubmission()) return

    try {
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError('Failed To Log In')
    }
    setLoading(false)
  }

  const validSubmission = () => {
    setError('')

    //Inputs are filled
    if (email === '' || password === '') {
      return setError('Please Fill In All Input Fields')
    }

    //Email is valid.
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return setError('Invalid Email')
    }

    return true
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex-container space-from-top'>
        <div className='login-content'>
          <h2>Log In</h2>

          {error === '' ? '' : <h3 className='error'>{error}</h3>}
          <h4>Email:</h4>
          <input
            type='email'
            onChange={(event) => setEmail(event.target.value)}
          />
          <h4>Password:</h4>
          <input
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            onClick={handleClick}
            type='submit'
            className={loading ? 'disabled' : ''}
          >
            Log In
          </button>
        </div>
        <h4 className='link'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </h4>
        <h4 className='link'>
          Already have an accoount? <Link to='/signup'>Sign Up</Link>
        </h4>
      </div>
    </div>
  )
}
