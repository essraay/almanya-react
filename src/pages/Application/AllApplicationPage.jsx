import { CButtonGroup, CCard, CCardBody, CContainer, CFormSelect, CRow, CTable } from "@coreui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import {
  AgeRangeService,
  ApplicationFormService,
  CategoryService,
  GenderService,
  GermanLanguageLevelService,
  NationalitieService,
  ProvinceService
} from "../../services"
import { getPath } from '../../utils'

const AllApplicationPage = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  const columns = [
    {
      key: 'tc',
      label: 'TC',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Adı',
      _props: { scope: 'col' },
    },
    {
      key: 'surname',
      label: 'Soyadı',
      _props: { scope: 'col' },
    },
    {
      key: 'gender',
      label: 'Cinsiyet',
      _props: { scope: 'col' },
    },
    {
      key: 'ageRange',
      label: 'Yaş Aralığı',
      _props: { scope: 'col' },
    },
    {
      key: 'category',
      label: 'Başvurulan Meslek',
      _props: { scope: 'col' },
    },
    {
      key: 'germanLevel',
      label: 'Almanca Dil Seviyesi',
      _props: { scope: 'col' },
    },
    {
      key: 'nationality',
      label: 'Uyruk',
      _props: { scope: 'col' },
    },
    {
      key: 'provinces',
      label: 'İl',
      _props: { scope: 'col' },
    },
    {
      key: 'phone',
      label: 'Telefon Numarası',
      _props: { scope: 'col' },
    },
    {
      key: 'buttons',
      label: '',
      _props: { scope: 'col' },
    },
  ]

  useEffect(() => {
    ApplicationFormService.getAll()
      .then((res) => {
        const newItems = res.data.map((item) => ({
          tc: `${item.tc} `,
          name: `${item.name} `,
          surname: `${item.surname} `,
          gender: `${item.gender.name} `,
          ageRange: `${item.ageRange.range} `,
          category: `${item.category.categoryName} `,
          germanLevel: `${item.germanLevel.level} `,
          nationality: `${item.nationality.name} `,
          provinces: `${item.provinces.name} `,
          phone: `${item.phone} `,
          buttons: (
            <CButtonGroup>
              <div className="d-flex gap-2">
                <Link
                  to={getPath('applications.detail', { id: item.id })}
                  className="btn btn-primary btn-sm"
                >
                  Detay
                </Link>
              </div>
            </CButtonGroup>
          ),
          _cellProps: { id: { scope: 'row' }, keyCode: { style: { width: '100%' } } },
        }))
        setItems(newItems)
      })
      .finally(() => setLoading(false))
  }, [])

  // const [filterModalVisibility, setFilterModalVisibility] = useState(false)
  const [genderList, setGenderList] = useState([])
  useEffect(() => {
    GenderService.getAll().then((response) => {
      setGenderList(response.data)
    })
  }, [])
  const [nationalityList, setNationalityList] = useState([])
  useEffect(() => {
    NationalitieService.getAll().then((response) => {
      setNationalityList(response.data)
    })
  }, [])
  const [ageRangeList, setAgeRangeList] = useState([])
  useEffect(() => {
    AgeRangeService.getAll().then((response) => {
      setAgeRangeList(response.data)
    })
  }, [])
  const [germanLevelList, setGermanLevelList] = useState([])
  useEffect(() => {
    GermanLanguageLevelService.getAll().then((response) => {
      setGermanLevelList(response.data)
    })
  }, [])
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    CategoryService.getAll().then((response) => {
      setCategoryList(response.data)
    })
  }, [])
  const [provinceList, setProvinceList] = useState([])
  useEffect(() => {
    ProvinceService.getAll().then((response) => {
      setProvinceList(response.data)
    })
  }, [])

  return (
    <>
      <CContainer>
        <CRow>
          <CCard className='mx-auto my-3 col-xl-12 shadow'>
            <CCardBody>
              {!loading ? (
                <>
                  {/* <CButton onClick={() => setFilterModalVisibility(true)}>
                    Filtrele
                    <FaFilter />
                  </CButton> */}
                  <CRow>
                    <div
                      className="form-group col-md-2"
                      style={{ color: '#6D4D4D', margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="gender"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...genderList.map((gender) => ({
                          label: gender.name,
                          value: gender.id,
                        }))]}
                      />
                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{ margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="ageRange"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...ageRangeList.map((ageRange) => ({
                          label: ageRange.range,
                          value: ageRange.id,
                        }))]}
                      />
                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{ margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="category"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...categoryList.map((category) => ({
                          label: category.categoryName,
                          value: category.id,
                        }))]}
                      />

                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{ margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="germanLevel"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...germanLevelList.map((germanLevel) => ({
                          label: germanLevel.level,
                          value: germanLevel.id,
                        }))]}
                      />
                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{ margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="nationality"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...nationalityList.map((nationality) => ({
                          label: nationality.name,
                          value: nationality.id,
                        }))]}
                      />
                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{ margin: '1% 0' }}
                    >
                      <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="province"
                        options={[{
                          label: "Seçiniz",
                          value: '-1',
                          disabled: true,
                        }, ...provinceList.map((province) => ({
                          label: province.name,
                          value: province.id,
                        }))]}
                      />
                    </div>
                  </CRow>

                  <CTable
                    className='text-center'
                    columns={columns}
                    items={items}
                    responsive
                  />
                </>
              ) : (
                <LoadingSpinner />
              )}
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
      {/* <FilterModal visible={filterModalVisibility} onClose={() => setFilterModalVisibility(false)} /> */}
    </>
  )
}
export default AllApplicationPage