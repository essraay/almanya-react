import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAppDispatch, useAppSelector } from '../store'
import { getPath } from '../utils'
import { useFormik } from 'formik'
import { LoginSchema } from '../validations/LoginSchema'
import { setUser } from '../store/authSlice'
import { MemberService } from '../services'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAppSelector((state) => state.authSlice)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // console.log(values)
      MemberService.authenticate(values)
        .then((response) => {
          dispatch(setUser(response))
        })
        .catch(({ error }) => {
          // switch (error?.message) {
          //   case 'wrong email':
          //     toast.error('Hatalı Mail Adresi Girdiniz!')
          //     break
          //   case 'wrong password':
          //     toast.error('Hatalı Şifre Girdiniz!')
          //     break
          //   default:
          //     break
          // }
          // console.log('catch', error)
          toast.error("Kullanıcı adı veya şifre yanlış.")
        })
        .finally(() => {
          console.log('end')
        })
    },
  })

  if (user) return <Navigate to={location?.state?.returnUrl || getPath('homepage')} />

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: '#BFDBFF' }}>
      <CContainer>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>

              <CCard className="bg-primary text-white py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <img className='mx-auto' src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="" style={{ width: '66%' }} />
                </CCardBody>
              </CCard>

              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={formik.handleSubmit}
                  >
                    <h3>ENPERSONEL GİRİŞ SİSTEMİ</h3>
                    <p className="text-medium-emphasis">Hesabınıza giriş yapınız</p>
                    <div className="mb-4">
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Eposta"
                          autoComplete="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </CInputGroup>
                      {formik.errors.email && formik.touched.email ? (
                        <CFormFeedback style={{ color: 'red' }}>{formik.errors.email}</CFormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Şifre"
                          autoComplete="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </CInputGroup>
                      {formik.errors.password && formik.touched.password ? (
                        <CFormFeedback style={{ color: 'red' }}>{formik.errors.password}</CFormFeedback>
                      ) : null}
                    </div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                        >
                          Giriş
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                        >
                          Şifreni mi unuttun?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
