import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CWidgetStatsA
} from '@coreui/react'


const Home = () => {


    return (
        <CContainer className="justify-content-center my-5">
            <CRow className='justify-content-center'>
                <div className="d-grid col-md-6 mx-auto">
                    <CCard
                        className="w-full shadow"
                        style={{ backgroundColor: '#26A0F2', color: 'white', margin: '3% 0' }}
                    >
                        <CCardBody className='text-center'>
                            <p className="card-text">
                                <b>
                                    0
                                    <br />
                                    Toplam Başvuru Sayısı
                                </b>
                            </p>

                        </CCardBody>
                    </CCard>
                </div>
                <div className="d-grid col-md-6 mx-auto">
                    <CCard
                        className="w-full shadow"
                        style={{ backgroundColor: '#FF6384', color: 'white', margin: '3% 0' }}
                    >
                        <CCardBody className='text-center'>
                            <p className="card-text">
                                <b>
                                    0
                                    <br />
                                    Toplam Kategori Sayısı
                                </b>
                            </p>

                        </CCardBody>
                    </CCard>
                </div>

                <div className="d-grid col-md-6 mx-auto">
                    <CCard
                        className="w-full shadow"
                        style={{ backgroundColor: '#FFCE56', color: 'white', margin: '3% 0' }}
                    >
                        <CCardBody className='text-center'>
                            <p className="card-text">
                                <b>
                                    0
                                    <br />
                                    Toplam Form Sayısı
                                </b>
                            </p>

                        </CCardBody>
                    </CCard>
                </div>
                <div className="d-grid col-md-6 mx-auto">
                    <CCard
                        className="w-full shadow"
                        style={{ backgroundColor: '#4BC0C0', color: 'white', margin: '3% 0' }}
                    >
                        <CCardBody className='text-center'>
                            <p className="card-text">
                                <b>
                                    0
                                    <br />
                                    Toplam Kullanıcı Sayısı
                                </b>
                            </p>

                        </CCardBody>
                    </CCard>
                </div>




            </CRow>
        </CContainer >
    )
}

export default Home