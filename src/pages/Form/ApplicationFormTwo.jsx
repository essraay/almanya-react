import { CButton, CCard, CCardBody, CContainer, CForm, CRow, CSpinner } from '@coreui/react'
import { Loading } from '../../components/Loading'
import LoadingSpinner from '../../components/LoadingSpinner'

const ApplicationFormTwo = ({ onChange, onSubmit, loading }) => {
  const submitHandle = (e) => {
    e.preventDefault()

    onSubmit()
  }

  return (
    <CContainer>
      <CRow>
        {/* {loading ? (
                    <div>Yükleniyor..</div>
                ) : ( */}
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
              className="card-body "
              style={{ margin: '1% 0', color: '#425F8A' }}
            >
              <CForm
                onSubmit={submitHandle}
                // ref={formRef}
                className="mx-auto col-xl-6"
              >
                <div
                  className="form-inline"
                  style={{ color: '#6D4D4D', margin: '2% 0' }}
                >
                  <CRow>
                    <div className="form-group">
                      <label>CV'nizi Yükleyin.</label>
                      <input
                        name="basvuruFormu1"
                        className="form-control"
                        type="file"
                        required
                        onChange={(e) => {
                          onChange((curr) => ({ ...curr, cvFile: e.target.files[0] }))
                        }}
                      />
                    </div>
                  </CRow>
                </div>

                <div
                  className="form-inline"
                  style={{ color: '#6D4D4D', margin: '2% 0' }}
                >
                  <CRow>
                    <div className="form-group">
                      <label>Sözleşmeyi yükleyin.</label>
                      <input
                        name="basvuruFormu2"
                        className="form-control"
                        type="file"
                        required
                        onChange={(e) => {
                          onChange((curr) => ({ ...curr, contractFile: e.target.files[0] }))
                        }}
                      />
                    </div>
                  </CRow>
                </div>

                <div
                  className="form-inline"
                  style={{ color: '#6D4D4D', margin: '2% 0' }}
                >
                  <CRow>
                    <div className="form-group">
                      <label>Belgeyi Yükleyin.</label>
                      <input
                        name="basvuruFormu3"
                        className="form-control"
                        type="file"
                        onChange={(e) => {
                          onChange((curr) => ({ ...curr, otherFile: e.target.files[0] }))
                        }}
                      />
                    </div>
                  </CRow>
                </div>

                <div
                  className="mx-auto bg-danger p-2 text-dark bg-opacity-50"
                  style={{ margin: '4% 0' }}
                >
                  <p
                    className="text-center"
                    style={{ color: 'black' }}
                  >
                    {"CV'nizi "}
                    <a
                      href="https://europa.eu/europass/tr/did-you-set-your-2fa-europass"
                      target={'_blank'}
                    >
                      {' '}
                      bu bağlantıdan
                    </a>{' '}
                    doldurup sistemimize yükleyiniz.
                  </p>
                </div>

                <div
                  className="d-flex justify-content-center"
                  style={{ margin: '3% 0' }}
                >
                  <CButton
                    type="submit"
                    disabled={loading}
                    className="d-flex align-items-center"
                  >
                    {loading && (
                      <CSpinner
                        size="sm"
                        className="me-3"
                      />
                    )}
                    Tamamla
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </>
        {/* )
                } */}
      </CRow>
    </CContainer>
  )
}
export default ApplicationFormTwo
