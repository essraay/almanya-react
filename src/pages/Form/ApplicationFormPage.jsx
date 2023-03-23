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
import { MultiSelect } from 'react-multi-select-component'
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
      applicationForm: {
        name: '',
        surname: '',
        birthday: '',
        birthPlace: '',
        provincesId: '-1',
        districtId: '-1',
        nationalityId: '4',
        dualNationality: false,
        genderId: '3',
        ageRangeId: '4',
        phone: '',
        email: '',
        graduationId: '8',
        germanLevelId: '7',
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
        appSelectedLanguages: [],
        categoryId,
      },
    },
    validationSchema: ApplicationFormSchema,
    onSubmit: (values) => {
      // const otherLanguage = values.otherLanguage.length > 0 ? values.otherLanguages : ['14']
      console.log(values.applicationForm.appSelectedLanguages)
      setInformationFormData({ ...values })
      setState('fileForm')
    },
  })

  const submit = () => {
    setLoading(true)
    console.log('fileFormData :>> ', fileFormData)
    ApplicationFormService.createApplication({
      ...informationFormData,
      ...fileFormData,
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

  // console.log(formik.errors)

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
  // eslint-disable-next-line no-unused-vars
  const [provinceId, setProvinceId] = useState(1)
  const activeProvince = useMemo(() => {
    return formik.values.applicationForm.provincesId > 0 && provinceList.length > 0
      ? provinceList.find((province) => province.id == formik.values.applicationForm.provincesId)
      : undefined
  }, [provinceList, formik.values.applicationForm.provincesId])

  const [state, setState] = useState('informationForm') // informationForm, fileForm

  useEffect(() => {
    ProvinceService.getAll().then((response) => {
      setProvinceList(response.data)
    })
    formRef.current.querySelector('input').focus()
  }, [])

  const options = [
    { label: 'Almanca', value: '1' },
    { label: 'İngilizce', value: '2' },
    { label: 'Fransızca', value: '3' },
    { label: 'Azerice', value: '4' },
    { label: 'Yunanca', value: '5' },
    { label: 'Ermenice', value: '6' },
    { label: 'İbranice', value: '7' },
    { label: 'Gürcüce', value: '8' },
    { label: 'Azerice', value: '9' },
    { label: 'Hırvatça', value: '10' },
    { label: 'Kazakça', value: '11' },
    { label: 'Özbekçe', value: '12' },
    { label: 'Fince', value: '13' },
  ]

  const [selected, setSelected] = useState([])

  useEffect(() => {
    formik.setFieldValue(
      'applicationForm.appSelectedLanguages',
      selected?.map((x) => ({
        OtherLanguageId: x.value,
      }))
    )
  }, [selected])

  if (state === 'fileForm')
    return (
      <>
        {/* <CButton onClick={() => { setState('informationForm') }}>Degiştir</CButton> */}
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
      {/* <CButton onClick={() => { setState('fileForm') }}>Degiştir</CButton> */}
      <CContainer>
        <CRow>
          {loading ? (
            <div>Yükleniyor..</div>
          ) : (
            <>
              <h4
                className="text-center my-3 p-3 col-xl-10 rounded mx-auto shadow"
                style={{ color: '#500000', backgroundColor: 'white' }}
              >
                Başvuru Formu
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
                          <h5 style={{ color: '#5C4040' }}>Kişisel Bilgiler</h5>
                        </div>
                      </div>
                      {/* <div
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
                      </div> */}
                    </CRow>
                    <CRow>
                      <div
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CFormInput
                          type="text"
                          name="applicationForm.name"
                          label="Adınız*"
                          value={formik.values.applicationForm.name}
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
                          name="applicationForm.surname"
                          label="Soyadınız*"
                          value={formik.values.applicationForm.surname}
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
                          name="applicationForm.birthday"
                          label="Doğum Tarihi*"
                          value={formik.values.applicationForm.birthday}
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
                          name="applicationForm.birthPlace"
                          label="Doğum Yeri"
                          value={formik.values.applicationForm.birthPlace}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {errorMessage('birthPlace')}
                      </div>
                    </CRow>
                    {/* <div
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
                    </div> */}
                    <div className="form-block">
                      <CRow>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormSelect
                            label="İl*"
                            aria-label="Default select example"
                            name="applicationForm.provincesId"
                            onChange={formik.handleChange}
                            value={formik.values.applicationForm.provincesId}
                            options={[
                              {
                                label: 'Seçiniz',
                                value: '-1',
                                disabled: true,
                              },
                              ...provinceList.map((province) => ({
                                label: province.name,
                                value: province.id,
                              })),
                            ]}
                          />
                        </div>
                        {errorMessage('provincesId')}
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormSelect
                            label="İlçe*"
                            aria-label="Default select example"
                            name="applicationForm.districtId"
                            onChange={formik.handleChange}
                            value={formik.values.applicationForm.districtId}
                            options={[
                              {
                                label: 'Seçiniz',
                                value: '-1',
                                disabled: true,
                              },
                              ...(activeProvince?.districts?.map((district) => ({
                                label: district.name,
                                value: district.id,
                              })) || []),
                            ]}
                          />
                        </div>
                        {errorMessage('districtId')}
                      </CRow>
                    </div>
                    <div
                      className="form-block"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CRow>
                        <div className="form-group col-12">
                          <CRow>
                            <label className="col-sm-4">Uyruğunuz nedir ?</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.nationalityId"
                                value="1"
                                label="T.C."
                                checked={formik.values.applicationForm.nationalityId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.nationalityId"
                                value="2"
                                label="A.B."
                                checked={formik.values.applicationForm.nationalityId === '2'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.nationalityId"
                                value="3"
                                label="Diğer"
                                checked={formik.values.applicationForm.nationalityId === '3'}
                                onChange={formik.handleChange}
                              />
                            </div>
                            {errorMessage('applicationForm.nationalityId')}
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
                            <label className="col-sm-4">Çifte vatandaşlığınız var mı ?</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="checkbox"
                                name="applicationForm.dualNationality"
                                label="(Varsa işaretleyin)"
                                checked={formik.values.applicationForm.dualNationality}
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
                                name="applicationForm.genderId"
                                value="1"
                                label="Kadın"
                                checked={formik.values.applicationForm.genderId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.genderId"
                                value="2"
                                label="Erkek"
                                checked={formik.values.applicationForm.genderId === '2'}
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
                            <label className="col-sm-4">Yaş Aralığınız</label>
                            <div className="col-sm-8">
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.ageRangeId"
                                value="1"
                                label="18-25"
                                checked={formik.values.applicationForm.ageRangeId === '1'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.ageRangeId"
                                value="2"
                                label="26-45"
                                checked={formik.values.applicationForm.ageRangeId === '2'}
                                onChange={formik.handleChange}
                              />
                              <CFormCheck
                                inline
                                type="radio"
                                name="applicationForm.ageRangeId"
                                value="3"
                                label="45-55"
                                checked={formik.values.applicationForm.ageRangeId === '3'}
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
                            name="applicationForm.phone"
                            label="Cep Telefonu Numaranız*"
                            maxLength={11}
                            value={formik.values.applicationForm.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Başvuru takibinizi yapabilmeniz için doğru telefon giriniz.
                          </div>
                          {errorMessage('phone')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="email"
                            name="applicationForm.email"
                            label="E-Posta Adresiniz*"
                            value={formik.values.applicationForm.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Aktif kullandığınız e-posta adresiniz lütfen.
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
                              name="applicationForm.graduationId"
                              value="1"
                              label="İlkokul"
                              checked={formik.values.applicationForm.graduationId === '1'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="2"
                              label="Ortaokul"
                              checked={formik.values.applicationForm.graduationId === '2'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="3"
                              label="Lise"
                              checked={formik.values.applicationForm.graduationId === '3'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="4"
                              label="Önlisans"
                              checked={formik.values.applicationForm.graduationId === '4'}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="5"
                              label="Lisans"
                              checked={formik.values.applicationForm.graduationId === '5'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="6"
                              label="Yüksek Lisans"
                              checked={formik.values.applicationForm.graduationId === '6'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.graduationId"
                              value="7"
                              label="Doktora"
                              checked={formik.values.applicationForm.graduationId === '7'}
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
                              name="applicationForm.germanLevelId"
                              value="1"
                              label="Bilmiyorum"
                              checked={formik.values.applicationForm.germanLevelId === '1'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.germanLevelId"
                              value="2"
                              label="A1"
                              checked={formik.values.applicationForm.germanLevelId === '2'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.germanLevelId"
                              value="3"
                              label="A2"
                              checked={formik.values.applicationForm.germanLevelId === '3'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.germanLevelId"
                              value="4"
                              label="B1"
                              checked={formik.values.applicationForm.germanLevelId === '4'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.germanLevelId"
                              value="5"
                              label="B2"
                              checked={formik.values.applicationForm.germanLevelId === '5'}
                              onChange={formik.handleChange}
                            />
                            <CFormCheck
                              inline
                              type="radio"
                              name="applicationForm.germanLevelId"
                              value="6"
                              label="C1"
                              checked={formik.values.applicationForm.germanLevelId === '6'}
                              onChange={formik.handleChange}
                            />
                            {errorMessage('germanLevelId')}
                          </div>
                        </CRow>
                      </div>
                    </div>
                    <div
                      className="form-block"
                      style={{ margin: '2% 0', color: '#425F8A' }}
                    >
                      <p
                        className="form-group col-md-6"
                        style={{ color: '#6D4D4D' }}
                      >
                        Bildiğiniz diğer dilleri işaretleyin
                      </p>

                      <MultiSelect
                        className="form-group col-md-6 align-items-end"
                        name="applicationForm.appSelectedLanguages"
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        label="Bildiğiniz diğer dilleri işaretleyin."
                        checked={formik.values.applicationForm.appSelectedLanguages}
                      />
                    </div>
                    <div className="form-block">
                      <div
                        className="form-group"
                        style={{ color: '#6D4D4D', margin: '1% 0' }}
                      >
                        <CRow>
                          <label className="col-sm-4">Ehliyetiniz var mı?</label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="checkbox"
                              name="applicationForm.drivingLicense"
                              label="(Varsa işaretleyin)"
                              checked={formik.values.applicationForm.drivingLicense}
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
                          <label className="col-sm-4">Pasaportunuz var mı?</label>
                          <div className="col-sm-8">
                            <CFormCheck
                              inline
                              type="checkbox"
                              name="applicationForm.passport"
                              label="(Varsa işaretleyin)"
                              checked={formik.values.applicationForm.passport}
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
                            name="applicationForm.length"
                            label="Boy"
                            value={formik.values.applicationForm.length}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Sadece rakam lütfen. Örnek:<b> 65</b>
                          </div>
                          {errorMessage('length')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="applicationForm.weight"
                            label="Kilonuz"
                            value={formik.values.applicationForm.weight}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Sadece rakam lütfen. Örnek:<b> 65</b>
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
                            name="applicationForm.disabilityStatus"
                            label="Engellilik Durumu"
                            value={formik.values.applicationForm.disabilityStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Var ise belirtiniz lütfen.
                          </div>
                          {errorMessage('disabilityStatus')}
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ color: '#6D4D4D', margin: '1% 0' }}
                        >
                          <CFormInput
                            type="text"
                            name="applicationForm.chronicDisease"
                            label="Kalıcı kronik bir hastalığınız var mı?"
                            value={formik.values.applicationForm.chronicDisease}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div
                            className="form-text"
                            style={{ color: 'blue' }}
                          >
                            Var ise belirtiniz lütfen.
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
                          Acil Durumda İrtibata Geçilecek Kişi
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
                            name="applicationForm.emergencyPersonFullName"
                            label="Ad ve Soyad"
                            value={formik.values.applicationForm.emergencyPersonFullName}
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
                            name="applicationForm.emergencyPersonPhone"
                            label="Cep Telefonu"
                            maxLength={11}
                            value={formik.values.applicationForm.emergencyPersonPhone}
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
                            name="applicationForm.emergencyPersonEmail"
                            label="E-Posta Adresi"
                            value={formik.values.applicationForm.emergencyPersonEmail}
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
                            name="applicationForm.emergencyPersonDegreeOfProximity"
                            label="Yakınlık Derecesi"
                            value={formik.values.applicationForm.emergencyPersonDegreeOfProximity}
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
