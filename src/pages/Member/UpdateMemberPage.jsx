import {
  CCard,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CForm,
  CContainer,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { MemberService } from '../../services'
import { useAppSelector } from '../../store'
import { getPath } from '../../utils'

const UpdateMemberPage = () => {
  const { id } = useParams()

  const { user } = useAppSelector((state) => state.authSlice)
  const navigate = useNavigate()


  const [loading, setLoading] = useState(true)

  const [visible, setVisible] = useState(false)

  const [personelInformation, setPersonelInformation] = useState(false)

  const clickHandle = () => {
    MemberService.userUpdate(personelInformation).then(() => {
      navigate(getPath('members.detail', { id: user.id }))
    })
  }

  useEffect(() => {
    MemberService.getUsersDetail(user.id)
      .then((res) => {
        setPersonelInformation(res.data)
        // toast.success('Bilgileriniz güncellendi!')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <CContainer className="mx-auto my-3 justify-content-center">
      <CCard className="col-xl-6 rounded justify-content-center mx-auto shadow">
        <CCardBody>
          {!loading ? (
            personelInformation && (
              <>
                <CForm>
                  <CFormInput
                    style={{ margin: '1% 0' }}
                    type="text"
                    label="Adı Soyadı"
                    placeholder="Adı Soyadı"
                    value={personelInformation.fullName}
                    onChange={(e) =>
                      setPersonelInformation({ ...personelInformation, fullName: e.target.value })
                    }
                  />
                </CForm>

                <CForm>
                  <CFormInput
                    style={{ margin: '1% 0' }}
                    type="text"
                    label="Cep Telefon Numarası"
                    placeholder="Cep Telefon Numarası"
                    value={personelInformation.phone}
                    onChange={(e) =>
                      setPersonelInformation({ ...personelInformation, phone: e.target.value })
                    }
                  />
                </CForm>

                <CForm>
                  <CFormInput
                    style={{ margin: '1% 0' }}
                    type="text"
                    label="Mail Adresi"
                    placeholder="Mail Adresi"
                    value={personelInformation.email}
                    onChange={(e) =>
                      setPersonelInformation({ ...personelInformation, eposta: e.target.value })
                    }
                  />
                </CForm>

                <br />
                <div class="col text-center">
                  <CButton className="mx-auto" onClick={() => setVisible(!visible)}>Kaydet</CButton>
                </div>

                <CModal
                  visible={visible}
                  onClose={() => setVisible(false)}
                >
                  <CModalHeader>
                    <CModalTitle>Kaydedilsin mi?</CModalTitle>
                  </CModalHeader>
                  <CModalBody>Yaptığınız değişiklikler kaydedilecek..</CModalBody>
                  <CModalFooter>
                    <CButton
                      color="secondary"
                      onClick={() => setVisible(false)}
                    >
                      Kapat
                    </CButton>
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={loading}
                      className="update-btn"
                      onClick={clickHandle}
                    >
                      Kaydet
                    </CButton>
                  </CModalFooter>
                </CModal>
              </>
            )
          ) : (
            <LoadingSpinner />
          )}
        </CCardBody>
      </CCard>



    </CContainer>

  )
}

export default UpdateMemberPage
