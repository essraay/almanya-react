import {
    CCard,
    CCardBody,
    CContainer,
    CRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DashboardService } from '../../services'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState(false)

    useEffect(() => {
        DashboardService.getAll().then((res) => {
            setItems(res)
            setLoading(false)
        })
    }, [])

    return (
        <CContainer className="justify-content-center my-5">
            <CRow className='justify-content-center'>
                {loading ? (
                    <h1>Yükleniyor..</h1>
                ) : (
                    <>
                        <div className="d-grid col-md-6 mx-auto">
                            <CCard
                                className="w-full shadow"
                                style={{ backgroundColor: '#26A0F2', color: 'white', margin: '3% 0' }}
                            >
                                <CCardBody className='text-center'>
                                    <p className="card-text">
                                        <b>
                                            {items.applicationFormCount}
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
                                            {items.categoryCount}
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
                                            {items.categoryCount}
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
                                            {items.userCount}
                                            <br />
                                            Toplam Kullanıcı Sayısı
                                        </b>
                                    </p>

                                </CCardBody>
                            </CCard>
                        </div>
                    </>
                )}
            </CRow>
        </CContainer >
    )
}

export default Home