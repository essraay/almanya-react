import { CButtonGroup, CCard, CCardBody, CContainer, CRow, CTable } from '@coreui/react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService } from '../../services'
import { getPath } from '../../utils'
import FilterSearchBox from './components/FilterSearchBox'

const AllApplicationPage = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  const [searchParams, setSearchParams] = useSearchParams({})

  const [filter, setFilter] = useState(() => {
    return Object.fromEntries(Array.from(searchParams.entries()))
  })

  const columns = [
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
      key: 'balance',
      label: 'Denklik',
      _props: { scope: 'col' },
    },
    {
      key: 'buttons',
      label: '',
      _props: { scope: 'col' },
    },
  ]

  useEffect(() => {
    fetchData()
    setSearchParams(filter)
  }, [filter])

  const fetchData = () => {
    ApplicationFormService.getAll(filter)
      .then((res) => {
        const newItems = res.data.map((item) => ({
          // tc: `${item.tc} `,
          name: `${item.name} `,
          surname: `${item.surname} `,
          gender: `${item.gender.id == 3 ? ' ' : item.gender.name} `,
          ageRange: `${item.ageRange.id == 4 ? ' ' : item.ageRange.range} `,
          category: `${item.category.categoryName} `,
          germanLevel: `${item.germanLevel.id == 7 ? ' ' : item.germanLevel.level} `,
          nationality: `${item.nationality.id == 4 ? ' ' : item.nationality.name} `,
          provinces: `${item.provinces.name} `,
          phone: `${item.phone} `,
          balance: `${item?.balance?.name == null ? ' ' : item?.balance?.name} `,
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
  }

  return (
    <>
      <CContainer>
        <CRow>
          <CCard className="mx-auto my-3 col-xl-12 shadow">
            <CCardBody>
              {!loading ? (
                <>
                  <FilterSearchBox
                    onChange={(value) => setFilter(value)}
                    filterValue={filter}
                  />
                  <CTable
                    key={items.id}
                    className="text-center"
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
    </>
  )
}
export default AllApplicationPage
