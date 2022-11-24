import {
  CButtonGroup,
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CTable,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService, CategoryService } from '../../services'
import { getPath } from '../../utils'

const ListApplicationPage = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
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

  // { category: id }

  useEffect(() => {
    CategoryService.getById(id)
      .then((res) => {
        // console.log('res.data.applicationForms :>> ', res.data);
        const newItems = res.data.applicationForms.map((item) => ({
          id: item.id,
          tc: `${item.tc} `,
          name: `${item.name} `,
          surname: `${item.surname} `,
          ageRange: `${item.ageRange.range} `,
          category: `${res.data.categoryName} `,
          germanLevel: `${item.germanLevel.level} `,
          nationality: `${item.nationality.name} `,
          provinces: `${item.provinces.name} `,
          phone: `${item.phone} `,
          buttons: (
            <CButtonGroup>
              <div className="d-flex gap-2">
                <Link
                  to={getPath('applications.detail', { id: item.id } )}
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

  return (
    <>
      <CContainer>
        <CRow>
          <CCard className='mx-auto my-3 col-xl-12 shadow'>
            <CCardBody>
              {!loading ? (
                <CTable
                  className='text-center'
                  columns={columns}
                  items={items}
                  responsive
                />
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

export default ListApplicationPage