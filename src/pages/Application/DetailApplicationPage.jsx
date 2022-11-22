import { CCard, CCardBody, CContainer, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService } from '../../services'

const DetailApplicationPage = () => {

  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [appDetail, setAppDetail] = useState(false)

  useEffect(() => {
    ApplicationFormService.getAll()
      .then((res) => {
        setAppDetail(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const userArea = (
    <>
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Başvuru Bilgileri</CListGroupItem>
        <CListGroupItem>Adı: {appDetail.name} </CListGroupItem>
        <CListGroupItem>Soyadı: {appDetail.surname} </CListGroupItem>
        <CListGroupItem>TC : {appDetail.tc} </CListGroupItem>
        <CListGroupItem>Doğum Yeri : {appDetail?.birthPlace}</CListGroupItem>
        <CListGroupItem>Doğum Tarihi: {appDetail.birthday} </CListGroupItem>
        <CListGroupItem>Adres: {appDetail.adress} </CListGroupItem>
        <CListGroupItem>Telefon : {appDetail.applicationName} </CListGroupItem>
        <CListGroupItem>Email : {appDetail.name} </CListGroupItem>
        <CListGroupItem>İl : {appDetail.applicationName} </CListGroupItem>
        <CListGroupItem>İlçe : {appDetail.name} </CListGroupItem>
        <CListGroupItem>Uyruk : {appDetail.surname} </CListGroupItem>
        <CListGroupItem>Çifte Vatandaşlık : {appDetail.applicationName} </CListGroupItem>
        <CListGroupItem>Cinsiyet : {appDetail.name} </CListGroupItem>
        <CListGroupItem>Yaş Aralığı : {appDetail.surname} </CListGroupItem>
        <CListGroupItem>Mezuniyet Durumu : {appDetail.applicationName} </CListGroupItem>
        <CListGroupItem>Almanca Dil Seviyesi Durumu: {appDetail.name} </CListGroupItem>
        <CListGroupItem>Diğer Yabancı Dil: {appDetail.surname} </CListGroupItem>
        <CListGroupItem>Ehliyet : {appDetail.applicationName} </CListGroupItem>
        <CListGroupItem>Pasaport : {appDetail.name} </CListGroupItem>
        <CListGroupItem>Boy : {appDetail.name} </CListGroupItem>
        <CListGroupItem>Kilonuz : {appDetail.surname} </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Acil Durumda İrtibata Geçilecek Kişi</CListGroupItem>
        <CListGroupItem>Adı Soyadı : {appDetail?.principalInvestigator?.fullName} </CListGroupItem>
        <CListGroupItem>Cep Telefonu : {appDetail?.principalInvestigator?.phone} </CListGroupItem>
        <CListGroupItem>E-Posta Adresi : {appDetail?.principalInvestigator?.eposta} </CListGroupItem>
        <CListGroupItem>Yakınlık Derecesi : {appDetail?.principalInvestigator?.address} </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Başvuru Dosyaları</CListGroupItem>
        <CListGroupItem>Başvuru Formu : <a href="#">İndir</a></CListGroupItem>
        <CListGroupItem>CV : <a href="#">İndir</a></CListGroupItem>
        <CListGroupItem>Taahhütname  : <a href="#">İndir</a></CListGroupItem>
        <CListGroupItem>Ek Belgeler : <a href="#">İndir</a></CListGroupItem>
      </CListGroup>
    </>
  )

  return (
    <CContainer>
      <CRow>
        <CCard className="mx-auto my-3 col-xl-10 shadow">
          <CCardBody>{!loading ? appDetail && userArea : <LoadingSpinner />}</CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default DetailApplicationPage