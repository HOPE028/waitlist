import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase-config'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import Navbar from './Navbar'

export default function SignUp() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const usersCollectionRef = collection(db, 'Users')
  const { signup, currentUser } = useAuth()

  const handleClick = async () => {
    if (!validSubmission()) return

    try {
      setLoading(true)
      let newSubmission = await signup(email, password)
      let submission = newSubmission.user

      console.log(submission.uid)

      const docRef = doc(db, 'Users', submission.uid)

      console.log(docRef)

      await setDoc(docRef, { displayName: name, email: email })

      const newCollectionRef = collection(db, 'Users', submission.uid, 'kids')

      await addDoc(newCollectionRef, {
        age: Number(-1),
        name: 'Fake Account',
        order: Number(-1),
        sex: 'Male',
      })

      navigate('/waitlist')
    } catch (error) {
      console.log(error)
      setError('Failed To Create An Account')
    }
    setLoading(false)
  }

  const validSubmission = () => {
    setError('')

    //Inputs are filled
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      passwordConfirmation === ''
    ) {
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

    //Passwords match each other.
    if (password !== passwordConfirmation) {
      return setError('Passwords Do Not Match')
    }

    return true
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex-container space-from-top'>
        <div className='login-content'>
          <h2>Sign Up</h2>
          {currentUser && currentUser.email}
          {error === '' ? '' : <h3 className='error'>{error}</h3>}
          <h4>Display Name:</h4>
          <input
            type='text'
            onChange={(event) => setName(event.target.value)}
          />
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
          <h4>Password Confirmation:</h4>
          <input
            type='password'
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <button
            onClick={handleClick}
            type='submit'
            className={loading ? 'disabled' : ''}
          >
            Sign Up
          </button>
        </div>
        <h4 className='link'>
          Already have an accoount? <Link to='/login'>Log In</Link>
        </h4>
      </div>
    </div>
  )
}
