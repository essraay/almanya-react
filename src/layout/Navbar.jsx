import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink
} from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useAppSelector } from '../store'
import { getPath } from '../utils'

const Navbar = () => {
  const { user } = useAppSelector((state) => state.authSlice)
  const [navbarVisibility, setNavbarVisibility] = useState(false)

  return (
    <>
      <CNavbar
        expand="lg"
        // colorScheme="light"
        style={{ backgroundColor: 'white' }}
      // className="bg-light"
      >
        <CContainer>
          <CNavbarToggler
            onClick={() => setNavbarVisibility(x => !x)}
          />
          <CCollapse
            visible={navbarVisibility}
            className="navbar-collapse justify-content-center"
          >
            <a class="navbar-toggle nav-link">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>

            <CNavbarNav className='gap-5'>
              {user && <><CNavItem>
                <CNavLink className='col-md-4' href={getPath('homepage')} active>
                  <h6 style={{ color: '#13004D' }}>Anasayfa</h6>
                </CNavLink>
              </CNavItem>
                <CNavItem className='col-md-4'>
                  <CNavLink href={getPath('applications')}>
                    <h6>Başvurular</h6>
                  </CNavLink>
                </CNavItem></>}
              <CNavItem className='col-md-4'>
                <CNavLink href={getPath('forms')}>
                  <h6>Formlar</h6>
                </CNavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}

export default Navbar