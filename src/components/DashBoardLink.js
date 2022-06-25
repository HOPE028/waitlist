import React from 'react'
import { Link } from 'react-router-dom'

export default function DashBoardLink() {
  return (
    <div>
      {' '}
      <button className='top-left-90'>
        <Link to='/waitlist'>
          <h4 id='dashboard-link'>DashBoard</h4>
        </Link>
      </button>
    </div>
  )
}
