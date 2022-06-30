import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const { resetPassword } = useAuth()

  const handleClick = async () => {
    if (!validSubmission()) return

    try {
      setLoading(true)
      await resetPassword(email)
      setSuccess('Email sent! Please check your inbox... (spam too)')
    } catch (error) {
      console.log(error)
      setError(
        'There was an error. Please check if you entered the right email'
      )
    }
    setLoading(false)
  }

  const validSubmission = () => {
    setError('')

    //Inputs are filled
    if (email === '') {
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
          <h2>Retrieve Password</h2>

          {error === '' ? '' : <h3 className='error'>{error}</h3>}
          {success === '' ? '' : <h3 className='success'>{success}</h3>}
          <h4>Email:</h4>
          <input
            type='email'
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            onClick={handleClick}
            type='submit'
            className={loading ? 'disabled' : ''}
          >
            Send Email
          </button>
        </div>
        <h4 className='link'>
          Know Your Password? <Link to='/login'>Log In</Link>
        </h4>
      </div>
    </div>
  )
}
