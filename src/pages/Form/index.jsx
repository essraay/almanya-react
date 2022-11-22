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
    <CContainer className="justify-content-center my-3" >
      {loading ? (
        <h1>Yükleniyor..</h1>
      ) : (
        <>
          <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {items.map(item => (
              <CCard key={item.id} className="w-full shadow">
                <img
                  className="card-img-top img-fluid"
                  src={item.imagePath} style={{ maxHeight: '200px' }}
                  alt="Card image cap"
                />
                <div className="card-body text-center">
                  <p className="card-text">
                    <b>
                      {item.categoryName} Başvuru Formu
                    </b>
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
            ))}
          </div>
        </>
      )}
    </CContainer>
  )
}

export default Form