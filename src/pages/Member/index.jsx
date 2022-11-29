import { CCard, CCardBody, CButton, CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilEnvelopeClosed,
  cilReload,
  cilScreenSmartphone,
  cilUser,
} from '@coreui/icons'

// import { useParams } from 'react-router-dom'
import { getPath } from '../../utils'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAppSelector } from '../../store'
import { useEffect, useState } from 'react'
import { MemberService } from '../../services'

const MemberPage = () => {
  const { user } = useAppSelector((state) => state.authSlice)
  const id = user.id

  const [loading, setLoading] = useState(true)
  const [userDetail, setUserDetail] = useState(false)

  useEffect(() => {
    MemberService.getUsersDetail(id)
      .then((res) => {
        setUserDetail(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <CContainer>
      {!loading ? (
        userDetail && (
          <>
            <div>
              <h3
                className="text-center mx-auto my-3 p-2 col-xl-6 rounded shadow"
                style={{ color: '#500000', backgroundColor: 'white' }}
              >
                Kişisel Bilgilerim
              </h3>
              <CCard className="col-xl-6 mx-auto rounded shadow">
                <CCardBody>
                  <CIcon
                    icon={cilUser}
                    className="personal-icon"
                  />
                  <p className="personal-text">
                    <strong>Adı Soyadı: </strong>
                    {userDetail.fullName}
                  </p>
                </CCardBody>
              </CCard>
              <CCard className="col-xl-6 mx-auto rounded shadow">
                <CCardBody>
                  <CIcon
                    icon={cilScreenSmartphone}
                    className="personal-icon"
                  />
                  <p className="personal-text">
                    <strong>Cep Telefon Numarası : </strong>
                    {userDetail.phone}
                  </p>
                </CCardBody>
              </CCard>
              <CCard className="col-xl-6 mx-auto rounded shadow">
                <CCardBody>
                  <CIcon
                    icon={cilEnvelopeClosed}
                    className="personal-icon"
                  />
                  <p className="personal-text">
                    <strong>Mail Adresi : </strong>
                    {userDetail.email}
                  </p>
                </CCardBody>
              </CCard>
              <br />
              <div className="col text-center">
                <CButton
                href={getPath('members.update')}
                className="update-btn text-center"
              >
                <CIcon
                  icon={cilReload}
                  className="deneme"
                />
                Güncelle
              </CButton>
              </div>
            </div>
          </>
        )
      ) : (
        <LoadingSpinner />
      )}
    </CContainer>
  )
}

export default MemberPage
