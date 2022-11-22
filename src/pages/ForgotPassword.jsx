import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToaster,
} from '@coreui/react'
import { useFormik } from 'formik'
import Toast from '../components/Toast'
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { MemberService } from '../services'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../utils'

const Register = () => {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.authSlice)

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      eposta: '',
    },
    // validationSchema: UserSchema,
    onSubmit: (values) => {
      console.log(values.eposta);
      setLoading(true)
      MemberService.forgotPassword(values.eposta).then((res) => {
        navigate(getPath('login'))
      })
    },
  })

  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  const [toast, setToast] = useState(0)

  const showSuccessToast = () => {
    setToast(<Toast>Şifreniz mail adresinize gönderilmiştir.</Toast>)
  }
  const showFailureToast = () => {
    setToast(<Toast>Mail adresi bulunamadı!</Toast>)
  }

  useEffect(() => {
    formRef.current.querySelector('input').focus()
  }, [])

  // const clickHandle = () => {
  //   MemberService.forgotPassword(formik.values.eposta).then((res) => {
  //     MemberService.getUsersDetail(formik.values.eposta).then((memberRes) => {
  //       dispatch(setUser({ ...user, email: memberRes.data.email }))
  //     })
  //   })
  // }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center background-image">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol
            md={9}
            lg={7}
            xl={6}
          >
            <CCard
              className="mx-4"
              style={{ backgroundColor: 'rgba(255, 255, 255 , 0.6)', position: 'relative' }}
            >
              <div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px) opacity(.9)', zIndex: 0 }}>
              </div>
              <CCardBody className="p-4" style={{ zIndex: 1 }}>
                <CForm
                  onSubmit={formik.handleSubmit}
                  ref={formRef}
                >
                  <h1>Şifremi Unuttum?</h1>
                  <p className="text-medium-emphasis">
                    Aşağıdaki formu doldurarak mailinize yeni şifre alabilirsiniz!
                  </p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Eposta"
                      autoComplete="eposta"
                      type="text"
                      name="eposta"
                      feedback={formik.errors.eposta}
                      invalid={!!(formik.touched.eposta && formik.errors.eposta)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.eposta}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton
                      color="success"
                      type="submit"
                      disabled={loading}

                    >
                      {loading && (
                        <CSpinner
                          component="span"
                          size="sm"
                        />
                      )}
                      Yeni Şifre Al
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CToaster
              placement="top-end"
              push={toast}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
