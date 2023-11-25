import React, { useState } from 'react'
import logo from '../KidsHandX2.png'

export default function Navbar() {
  const [showToolBar, setShowToolBar] = useState(false)

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar_container'>
          <a href='https://oldfieldchildcare.netlify.app/' id='navbar_logo'>
            <img
              src={logo}
              alt='Old Field Child Care Logo'
              className='navbar_pic'
            />
            Old Field Child Care
          </a>
          <button onClick={() => setShowToolBar(!showToolBar)}>
            <div
              className={`navbar_toggle ${showToolBar && 'is-active'}`}
              id='mobile-menu'
            >
              <span className='bar'></span>
              <span className='bar'></span>
              <span className='bar'></span>
            </div>
          </button>
          <ul className={`navbar_menu ${showToolBar && 'active'}`}>
            <li className='navbar_btn'>
              <a href='/' className='button'>
                WAITLIST
              </a>
            </li>
            <li className='navbar_btn'>
              <a
                href='https://oldfieldchildcare.netlify.app/#news'
                className='button'
              >
                NEWS
              </a>
            </li>
            <li className='navbar_btn'>
              <a
                href='https://oldfieldchildcare.netlify.app/#photoGallery'
                className='button'
              >
                PHOTO&nbsp;GALLERY
              </a>
            </li>
            <li className='navbar_btn'>
              <a
                href='https://oldfieldchildcare.netlify.app/#contact'
                className='button'
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
