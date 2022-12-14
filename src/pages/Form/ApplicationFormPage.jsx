import {
  CContainer,
  CRow,
  CFormInput,
  CCard,
  CCardBody,
  CFormSelect,
  CButton,
  CFormCheck,
  CForm,
} from '@coreui/react'
import { useFormik } from 'formik'
import { useCallback } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApplicationFormService, ProvinceService } from '../../services'
import { ApplicationFormSchema } from '../../validations/ApplicationFormSchema'
import ApplicationFormTwo from './ApplicationFormTwo'
import SuccessModal from './SuccessModal'

const ApplicationFormPage = () => {
  const { id: categoryId } = useParams()

  const [informationFormData, setInformationFormData] = useState(false)
  const [fileFormData, setFileFormData] = useState({
    cvFile: undefined,
    contractFile: undefined,
    otherFile: undefined,
  })

  const [successModalVisibility, setSuccessModalVisibility] = useState(false)

  const formik = useFormik({
    initialValues: {
      tc: '',
      name: '',
      surname: '',
      birthday: '',
      birthPlace: '',
      adress: '',
      provincesId: '-1',
      districtId: '-1',
      nationalityId: '',
      dualNationality: false,
      genderId: '',
      ageRangeId: '',
      phone: '',
      email: '',
      graduationId: '',
      germanLevelId: '',
      speakEnglish: false,
      speakFrench: false,
      drivingLicense: false,
      passport: false,
      length: '',
      weight: '',
      disabilityStatus: '',
      chronicDisease: '',
      emergencyPersonFullName: '',
      emergencyPersonPhone: '',
      emergencyPersonEmail: '',
      emergencyPersonDegreeOfProximity: '',
    },
    validationSchema: ApplicationFormSchema,
    onSubmit: (values) => {
      setInformationFormData(values)
      setState('fileForm')
    },
  })

  const submit = () => {
    setLoading(true)
    console.log('fileFormData :>> ', fileFormData)
    ApplicationFormService.createApplication({
      ...informationFormData,
      ...fileFormData,
      categoryId,
    })
      .then((response) => {
        console.log('response :>> ', response)

        setState('informationForm')

        setProvinceId(1)
        setFileFormData({
          cvFile: undefined,
          contractFile: undefined,
          otherFile: undefined,
        })
        setInformationFormData(false)
        formik.resetForm()

        setSuccessModalVisibility(true)

        formRef.current.querySelector('input').focus()
      })
      .catch((error) => {
        console.error(error)
        formRef.current.querySelector('input').select()
        formRef.current.querySelector('input').focus()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  console.log(formik.errors)

  const errorMessage = useCallback(
    (key) => {
      return (
        <>
          {formik.touched?.[key] && formik.errors?.[key] && (
            <div className="text-xs text-center text-danger">{formik.errors?.[key]}</div>
          )}
        </>
      )
    },
    [formik]
  )

  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [provinceList, setProvinceList] = useState([])
  const [provinceId, setProvinceId] = useState(1)
  const activeProvince = useMemo(() => {
    return formik.values.provincesId > 0 && provinceList.length > 0
      ? provinceList.find((province) => province.id == formik.values.provincesId)
      : undefined
  }, [provinceList, formik.values.provincesId])

  const [state, setState] = useState('informationForm') // informationForm, fileForm

  useEffect(() => {
    ProvinceService.getAll().then((response) => {
      setProvinceList(response.data)
    })
    formRef.current.querySelector('input').focus()
  }, [])

  if (state === 'fileForm')
    return (
      <>
        {/* <CButton onClick={() => { setState('informationForm') }}>Degi??tir</CButton> */}
        <ApplicationFormTwo
          onChange={setFileFormData}
          onSubmit={submit}
          loading={loading}
        />
      </>
    )

  return (
    <>
      <SuccessModal
        visible={successModalVisibility}
        onClose={() => setSuccessModalVisibility(false)}
      />
      {/* <CButton onClick={() => { setState('fileForm') }}>Degi??tir</CButton> */}
      <CContainer>
        <CRow>
          {loading ? (
            <div>Y??kleniyor..</div>
          ) : (
            <>
              <h4
                className="text-center my-3 p-3 col-xl-10 rounded mx-auto shadow"
                style={{ color: '#500000', backgroundColor: 'white' }}
              >
                Ba??vuru Formu
              </h4>
              <CCard
                className="mx-auto col-xl-10 shadow"
              // style={{ height: '100px;', width: '100%' }}
              >
                <CCardBody
                  className="card-body"
                  style={{ margin: '1% 0', color: '#425F8A' }}
                >
                  <CForm
                    onSubmit={formik.handleSubmit}
                    ref={formRef}
                  >
                    <CRow>
                      <div className="form-group col-md-6">
                        <div className="form-block-title">
                          <h5 style={{ color: '#5C4040' }}>Ki??isel Bilgiler</h5>
                        </div>
                      </div>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D' }}
                      >
                        <CFormInput
                          type="text"
                          name="tc"
                          label="TC"
                          maxLength={11}
                          feedback={formik.errors.tc}
                          value={formik.values.tc}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('tc')}
                      </div>
                    </CRow>
                    <CRow>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CFormInput
                          type="text"
                          name="name"
                          label="Ad??n??z"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('name')}
                      </div>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CFormInput
                          type="text"
                          name="surname"
                          label="Soyad??n??z"
                          value={formik.values.surname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('surname')}
                      </div>
                    </CRow>
                    <CRow>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CFormInput
                          type="date"
                          name="birthday"
                          label="Do??um Tarihi"
                          value={formik.values.birthday}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('birthday')}
                      </div>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CFormInput
                          type="text"
                          name="birthPlace"
                          label="Do??um Yeri"
                          value={formik.values.birthPlace}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('birthPlace')}
                      </div>
                    </CRow>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <label htmlFor="adres">Adres</label>
                          <textarea
                            name="adress"
                            cols="30"
                            rows="5"
                            className="form-control"
                            value={formik.values.adress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></textarea>
                          {errorMessage('adress')}
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormSelect
                            label="??l"
                            aria-label="Default select example"
                            name="provincesId"
                            onChange={formik.handleChange}
                            value={formik.values.provincesId}
                            options={[{
                              label: "Se??iniz",
                              value: '-1',
                              disabled: true,


                            }, ...provinceList.map((province) => ({
                              label: province.name,
                              value: province.id,
                            }))]}
                          />
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormSelect
                            label="??l??e"
                            aria-label="Default select example"
                            name="districtId"
                            onChange={formik.handleChange}
                            value={formik.values.districtId}
                            options={[{
                              label: "Se??iniz",
                              value: '-1',
                              disabled: true,
                            },
                            ...(activeProvince?.districts?.map((district) => ({
                              label: district.name,
                              value: district.id,
                            })) || [])]}
                          />
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <CRow>
                            <label className="col-sm-4">Uyru??unuz nedir ?</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="radio"
                                name="nationalityId"
                                value="1"
                                label="T.C."
                                checked={formik.values.nationalityId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="nationalityId"
                                value="2"
                                label="A.B."
                                checked={formik.values.nationalityId === '2'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="nationalityId"
                                value="3"
                                label="Di??er"
                                checked={formik.values.nationalityId === '3'}
                                onChange={formik.handleChange}
                              />
                            </div>
                            {errorMessage('nationalityId')}
                          </CRow>
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <CRow>
                            <label className="col-sm-4">??ifte vatanda??l??????n??z var m?? ?</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="checkbox"
                                name="dualNationality"
                                label="(Varsa i??aretleyin)"
                                checked={formik.values.dualNationality}
                                onChange={formik.handleChange}
                              />
                            </div>
                            {errorMessage('dualNationality')}
                          </CRow>
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <CRow>
                            <label className="col-sm-4">Cinsiyetiniz</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="radio"
                                name="genderId"
                                value="1"
                                label="Kad??n"
                                checked={formik.values.genderId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="genderId"
                                value="2"
                                label="Erkek"
                                checked={formik.values.genderId === '2'}
                                onChange={formik.handleChange}
                              />
                            </div>
                            {errorMessage('genderId')}
                          </CRow>
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <div className="row">
                            <label className="col-sm-4">Ya?? Aral??????n??z</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="radio"
                                name="ageRangeId"
                                value="1"
                                label="18-25"
                                checked={formik.values.ageRangeId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="ageRangeId"
                                value="2"
                                label="26-45"
                                checked={formik.values.ageRangeId === '2'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="ageRangeId"
                                value="3"
                                label="45-55"
                                checked={formik.values.ageRangeId === '3'}
                                onChange={formik.handleChange}
                              />
                            </div>
                            {errorMessage('ageRangeId')}
                          </div>
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="phone"
                            label="Cep Telefonu Numaran??z"
                            maxLength={11}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Ba??vuru takibinizi yapabilmeniz i??in do??ru telefon giriniz.
                          </div>
                          {errorMessage('phone')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="email"
                            name="email"
                            label="E-Posta Adresiniz"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Aktif kulland??????n??z e-posta adresiniz l??tfen.
                          </div>
                          {errorMessage('email')}
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <div
                        className="form-group"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CRow>
                          <label className="col-sm-4">Mezuniyet Durumu </label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="1"
                              label="??lkokul"
                              checked={formik.values.graduationId === '1'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="2"
                              label="Ortaokul"
                              checked={formik.values.graduationId === '2'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="3"
                              label="Lise"
                              checked={formik.values.graduationId === '3'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="4"
                              label="??nlisans"
                              checked={formik.values.graduationId === '4'}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="5"
                              label="Lisans"
                              checked={formik.values.graduationId === '5'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="6"
                              label="Y??ksek Lisans"
                              checked={formik.values.graduationId === '6'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="graduationId"
                              value="7"
                              label="Doktora"
                              checked={formik.values.graduationId === '7'}
                              onChange={formik.handleChange}
                            />
                            {errorMessage('graduationId')}
                          </div>
                        </CRow>
                      </div>
                    </div>
                    <div className="form-block">
                      <div
                        className="form-group"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CRow>
                          <label className="col-sm-4">Almanca Dil Seviyesi Durumu</label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="1"
                              label="Bilmiyorum"
                              checked={formik.values.germanLevelId === '1'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="2"
                              label="A1"
                              checked={formik.values.germanLevelId === '2'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="3"
                              label="A2"
                              checked={formik.values.germanLevelId === '3'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="4"
                              label="B1"
                              checked={formik.values.germanLevelId === '4'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="5"
                              label="B2"
                              checked={formik.values.germanLevelId === '5'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="germanLevelId"
                              value="6"
                              label="C1"
                              checked={formik.values.germanLevelId === '6'}
                              onChange={formik.handleChange}
                            />
                            {errorMessage('germanLevelId')}
                          </div>
                        </CRow>
                      </div>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormCheck
                            type="checkbox"
                            name="speakEnglish"
                            label="??ngilizce biliyorum."
                            checked={formik.values.speakEnglish}
                            onChange={formik.handleChange}
                          />
                          {errorMessage('speakEnglish')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormCheck
                            inline
                            type="checkbox"
                            name="speakFrench"
                            label="Frans??zca biliyorum."
                            checked={formik.values.speakFrench}
                            onChange={formik.handleChange}
                          />
                          {errorMessage('speakFrench')}
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <div
                        className="form-group"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CRow>
                          <label className="col-sm-4">Ehliyetiniz var m???</label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="checkbox"
                              name="drivingLicense"
                              label="(Varsa i??aretleyin)"
                              checked={formik.values.drivingLicense}
                              onChange={formik.handleChange}
                            />
                            {errorMessage('drivingLicense')}
                          </div>
                        </CRow>
                      </div>
                    </div>
                    <div className="form-block">
                      <div
                        className="form-group"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CRow>
                          <label className="col-sm-4">Pasaportunuz var m???</label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="checkbox"
                              name="passport"
                              label="(Varsa i??aretleyin)"
                              checked={formik.values.passport}
                              onChange={formik.handleChange}
                            />
                            {errorMessage('passport')}
                          </div>
                        </CRow>
                      </div>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="length"
                            label="Boy"
                            value={formik.values.length}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Sadece rakam l??tfen. ??rnek:<b> 65</b>
                          </div>
                          {errorMessage('length')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="weight"
                            label="Kilonuz"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Sadece rakam l??tfen. ??rnek:<b> 65</b>
                          </div>
                          {errorMessage('weight')}
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="disabilityStatus"
                            label="Engellilik Durumu"
                            value={formik.values.disabilityStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Var ise belirtiniz l??tfen.
                          </div>
                          {errorMessage('disabilityStatus')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="chronicDisease"
                            label="Kal??c?? kronik bir hastal??????n??z var m???"
                            value={formik.values.chronicDisease}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Var ise belirtiniz l??tfen.
                          </div>
                          {errorMessage('chronicDisease')}
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="form-group col-md-6"
                      style={{ margin: '5% 0' }}
                    >
                      <div className="form-block-title">
                        <h5 style={{ color: '#6D4D4D', margin: '1% 0' }}>
                          Acil Durumda ??rtibata Ge??ilecek Ki??i
                        </h5>
                      </div>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="emergencyPersonFullName"
                            label="Ad ve Soyad"
                            value={formik.values.emergencyPersonFullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {errorMessage('emergencyPersonFullName')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="emergencyPersonPhone"
                            label="Cep Telefonu"
                            maxLength={11}
                            value={formik.values.emergencyPersonPhone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {errorMessage('emergencyPersonPhone')}
                        </div>
                      </CRow>
                    </div>
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="email"
                            name="emergencyPersonEmail"
                            label="E-Posta Adresi"
                            value={formik.values.emergencyPersonEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {errorMessage('emergencyPersonEmail')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="emergencyPersonDegreeOfProximity"
                            label="Yak??nl??k Derecesi"
                            value={formik.values.emergencyPersonDegreeOfProximity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {errorMessage('emergencyPersonDegreeOfProximity')}
                        </div>
                      </CRow>
                    </div>
                    <div
                      className="d-flex justify-content-center"
                      style={{ margin: '3% 0' }}
                    >
                      <CButton
                        type="submit"
                      // href={getPath('forms.applicationFormsTwo', { id: item.id })}
                      // href={getPath('forms.applicationFormsTwo')}
                      >
                        Devam et
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </>
          )}
        </CRow>
      </CContainer>
    </>
  )
}
export default ApplicationFormPage