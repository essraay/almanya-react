import { CButton, CCard, CContainer } from '@coreui/react'
import { useEffect, useState } from 'react'
import { CategoryService } from '../../services'
import { getPath } from '../../utils'

const Form = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(false)

  useEffect(() => {
    CategoryService.getAll().then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <CContainer className="justify-content-center my-3">
      {loading ? (
        <h1>Yükleniyor..</h1>
      ) : (
        <>
          <div className="row">
            {items.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <div className="p-1 col-12 col-md-6 col-lg-4 col-xl-3">
                <CCard
                  key={item.id}
                  className="shadow"
                >
                  <div className="ratio ratio-16x9">
                    <img
                      className="card-img-top img-fluid"
                      src={item.imagePath}
                      style={{ objectFit: 'cover' }}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body text-center">
                    <p className="card-text">
                      <b>{item.categoryName} Başvuru Formu</b>
                    </p>
                    <CButton
                      href={getPath('forms.applicationForms', { id: item.id })}
                      type="button"
                      color="success"
                      style={{ color: 'white' }}
                    >
                      Başvur
                    </CButton>
                  </div>
                </CCard>
              </div>
            ))}
          </div>
        </>
      )}
    </CContainer>
  )
}

export default Form
