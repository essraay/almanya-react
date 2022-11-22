import { cilAccountLogout, cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
} from '@coreui/react'
import React from 'react'
import avatar8 from '../assets/images/settings.svg'
import { useAppSelector } from '../store'
import { getPath, signOut } from '../utils'

const Header = () => {
  const { user } = useAppSelector((state) => state.authSlice)

  return (
    <>
      <CHeader
        // className='bg-light' 
        style={{ backgroundColor: '#3C4B64' }}
      >
        <div className='container-fluid'>
          <div className="d-flex justify-content-start">
            <h5
              style={{ color: 'white' }}
            >
              ENPERSONAL
            </h5>
          </div>

          {user && <div className="d-flex justify-content-end gap-2">
            <CDropdown>
              <CDropdownToggle
                color="light"
                placement="bottom-end"
                className="py-0"

              >
                <CAvatar
                  src={avatar8}
                  size="xs"
                  className="setting-button"

                />
              </CDropdownToggle>
              <CDropdownMenu
                className="pt-0"
                placement="bottom-end"
              >
                <CDropdownHeader
                  style={{ backgroundColor: '#3C4B64', color: 'white' }}
                >
                  <h6>Seçenekler</h6>
                </CDropdownHeader>
                <CDropdownItem
                  href={getPath('members')}
                >
                  <CIcon
                    icon={cilUser}
                    size="lg"
                    className='me-2'
                  />
                  Profil
                </CDropdownItem>
                {/* <CDropdownItem>
                  <CIcon
                    icon={cilLockLocked}
                    size="lg"
                    className='me-2'
                  />
                  Şifre Değiştir
                </CDropdownItem> */}
                <hr />
                <CDropdownItem
                  onClick={signOut}
                >
                  <CIcon
                    icon={cilAccountLogout}
                    size="lg"
                    className='me-2'
                  />
                  Çıkış Yap
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>}
        </div>
      </CHeader>
    </>
  )
}

export default Header
