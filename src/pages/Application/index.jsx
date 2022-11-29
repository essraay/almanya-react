import { CButton, CCard, CCardBody, CCardFooter, CContainer } from "@coreui/react"
import { useEffect, useState } from "react"
import { CategoryService } from "../../services"
import { getPath } from "../../utils"

const Basvuru = () => {
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
          <div className="justify-content-center mx-auto">
            <CCard className="w-full shadow">
              <CCardBody className='text-center'>
                <p className="card-text">
                  <b>
                    Tüm Başvurular
                  </b>
                </p>
                {/* <CCardFooter className="text-medium-emphasis">
                  <p>1211 başvuru</p>
                </CCardFooter> */}
                {/* <br /> */}
                <CButton href={getPath('applications.allapplications')} color="danger" variant="outline">
                  Başvuruları Görüntüle
                </CButton>
              </CCardBody>
            </CCard>
          </div>
          <br />
          <div className="d-grid gap-3 mx-auto" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {items.map((item) => (
              <CCard key={item.id} className="w-full shadow">
                <CCardBody className='text-center'>
                  <p className="card-text">
                    <b>
                      {item.categoryName} Başvuruları
                    </b>
                  </p>
                  {/* <CCardFooter className="text-medium-emphasis">
                    <p>11 başvuru</p>
                  </CCardFooter> */}
                  {/* <br /> */}
                  <CButton href={getPath('applications.list', { id: item.id })} color="info" variant="outline">
                    Başvuruları Görüntüle
                  </CButton>
                </CCardBody>
              </CCard>
            ))}
          </div>
        </>
      )}
    </CContainer>
  )
}
export default Basvuru