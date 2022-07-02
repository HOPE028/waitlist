import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from './Navbar'

export default function DashBoard() {
  const { logout, currentUser } = useAuth()
  const [currentUserInfo, setCurrentUserInfo] = useState()
  const [error, setError] = useState('')
  let currentUserCollectionRef
  let navigate = useNavigate()

  const logOff = () => {
    setError('')
    try {
      logout()
      navigate('/login')
    } catch (error) {
      setError('Could not log out')
    }
  }

  useEffect(() => {
    if (currentUser) {
      currentUserCollectionRef = doc(db, 'Users', currentUser.uid)

      getCurrentUser()
    }
  }, [currentUser])

  const getCurrentUser = async () => {
    const getUser = async () => {
      const user = await getDoc(currentUserCollectionRef)

      setCurrentUserInfo(user)
    }
    getUser()
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex-container'>
        <div className='container-dashboard'>
          <h3 className='top-right-80 seven-hundred current-user'>
            Current User:{' '}
            {currentUserInfo &&
              currentUserInfo._document.data.value.mapValue.fields.displayName
                .stringValue}
          </h3>
          <button className='top-left-90 log-out' onClick={logOff}>
            Log Out
          </button>
          <h1 className='title'>Waitlist</h1>
          <h2>Welcome To The Oak Lawn Child Care Waitlist!</h2>
          <div className='margin-top'>
            <h3>
              Here you can view waitlist sizes for different ages, register your
              child under one, and get up-to-date information on what place you
              are on the waitlist.
            </h3>
            <h3>
              There are three different waitlists due to the different spots
              available for different ages. The infant waitlist is for children
              under 2 years of age. Preschool for ages 2-5 and finally school
              age for children between 6 and 12 years old.{' '}
            </h3>
            <h3>Start by selecting one of the waitlists!</h3>
            <Link to='/infant'>
              <h3 className='inline link'>Infant&nbsp;Waitlist</h3>
            </Link>
            {'   '}
            <Link to='/preschool'>
              <h3 className='inline link'>Preschool&nbsp;Waitlist</h3>
            </Link>
            {'   '}
            <Link to='/school-age'>
              <h3 className='inline link'>School&nbsp;Age&nbsp;Waitlist</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
