import React from 'react'
import Navbar from './Navbar'

export default function Oaklawn() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex-container'>
        <div className='container-about-us'>
          <div className='content-about-us'>
            <img
              alt='Very Cute Picture of a baby at our Child Care'
              id='img-about-us'
              src='OaklawnImages/kidHorizontal2.jpg'
            />
            <div className='text-about-us'>
              <h2 className='title-oaklawn title-about-us'>About Us</h2>
              <p>
                <b>Oak Lawn Child Care</b> is a home child care center situated
                in Bridgewater, Winnipeg, Manitoba. We are fully licensed for 12
                children. We operate with two staff members at all times and
                take care of children including Infants, Toddlers, Preschoolers,
                Pre-K and school students with our Before and After School
                Program. For Availability please check our <span> </span>
                <a className='wait' href='/waitlist'>
                  WAITLIST
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className='location-marker' id='news'></div>
        <div className='container-news'>
          <h2 className='title-oaklawn title-container-news'>Important News</h2>
          <div className='text-news'>
            <p>
              &bull; Spots are all taken! If you would like to be added to the
              waiting list, click on <span> </span>
              <a className='links' href='#contact'>
                WAITING LIST
              </a>
            </p>

            <p>
              &bull; Oak Lawn Child care is currently open during the pandemic
              COVID-19. We will adhere to the most recent Public Health orders
              until further notice.
            </p>
          </div>
        </div>

        <div className='map_container'>
          <div id='map'></div>
        </div>

        <div className='location-marker' id='contact'></div>

        {/* Photo Gallery */}

        <div className='slider-container'>
          <div className='img-slider'>
            <div className='slide active'>
              <img
                alt='Baby at our daycare'
                src='OaklawnImages/BabyAlone.jpg'
              />
            </div>

            <div className='slide'>
              <img
                alt='Baby at our daycare'
                src='OaklawnImages/3KidsTableAnother.jpg'
              />
            </div>

            <div className='slide'>
              <img
                alt='Baby at our daycare'
                src='OaklawnImages/kidsPlayingWithSand.jpg'
              />
            </div>

            <div className='slide'>
              <img
                alt='Baby at our daycare'
                src='OaklawnImages/mainArea1.jpg'
              />
            </div>

            <div className='slide'>
              <img
                alt='Baby at our daycare'
                src='OaklawnImages/KidsTogether.jpg'
              />
            </div>

            <div className='slide'>
              <img alt='Baby at our daycare' src='OaklawnImages/Bathroom.jpg' />
            </div>

            <div className='slide'>
              <img
                alt='Baby at our daycare'
                src='../../public/OaklawnImages/KidsOnStrollers.jpg'
              />
            </div>

            <div className='navigation'>
              <div className='btn active'></div>

              <div className='btn'></div>

              <div className='btn'></div>

              <div className='btn'></div>

              <div className='btn'></div>

              <div className='btn'></div>

              <div className='btn'></div>
            </div>
          </div>
        </div>

        {/* Contact */}

        <section className='contact'>
          <div className='content'>
            <h2 id='contact title'>Contact Us</h2>
          </div>

          <div className='container'>
            <div className='contactInfo'>
              <div className='box'>
                <div className='icon'>
                  <i className='fas fa-map-marker-alt'></i>
                </div>

                <div className='text'>
                  <h3>Address</h3>

                  <p>
                    69 Oak Lawn Rd,
                    <br />
                    Winnipeg, Manitoba,
                    <br />
                    R3Y0K2
                  </p>
                </div>
              </div>

              <div className='box'>
                <div className='icon'>
                  <i className='fas fa-phone-alt'></i>
                </div>

                <div className='text'>
                  <h3>Phone</h3>

                  <p>(204)-619-2783</p>
                </div>
              </div>

              <div className='box'>
                <div className='icon'>
                  <i className='far fa-envelope'></i>
                </div>

                <div className='text'>
                  <h3>Email</h3>

                  <p>
                    oaklawnchildcare<span style={{ fontSize: '1px' }}> </span>
                    @gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className='contactForm'></div>
          </div>
        </section>

        {/* Footer */}

        <div className='container-footer'>
          <img
            src='/OaklawnImages/KidsHandX2.png'
            alt='Oak Lawn Child Care Logo'
            id='logo-footer'
          />
          <div className='text-footer'>
            <h3>Oak Lawn Child Care</h3>
            <h4>© Oak Lawn Child Care 2021. All rights reserved.</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
