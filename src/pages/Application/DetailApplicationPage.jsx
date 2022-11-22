import { CCard, CCardBody, CContainer, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService, CategoryService } from '../../services'

const DetailApplicationPage = () => {

  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(false)

  useEffect(() => {
    CategoryService.getById(id)
      .then((res) => {
        setItems(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const userArea = (
    <>
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Başvuru Bilgileri</CListGroupItem>
        <CListGroupItem>Adı: {items.applicationForms.name} </CListGroupItem>
        <CListGroupItem>Soyadı: {items.applicationForms.surname} </CListGroupItem>
        <CListGroupItem>TC : {items.applicationForms.tc} </CListGroupItem>
        <CListGroupItem>Doğum Yeri : {items?.applicationForms.birthPlace}</CListGroupItem>
        <CListGroupItem>Doğum Tarihi: {items.applicationForms.birthday} </CListGroupItem>
        <CListGroupItem>Adres: {items.applicationForms.adress} </CListGroupItem>
        <CListGroupItem>Telefon : {items.applicationForms.phone} </CListGroupItem>
        <CListGroupItem>Email : {items.applicationForms.email} </CListGroupItem>
        <CListGroupItem>İl : {items.provinces.name} </CListGroupItem>
        <CListGroupItem>İlçe : {items.district.name} </CListGroupItem>
        <CListGroupItem>Uyruk : {items.nationality.name} </CListGroupItem>
        <CListGroupItem>Çifte Vatandaşlık : {items.applicationForms.dualNationality} </CListGroupItem>
        <CListGroupItem>Cinsiyet : {items.gender.name} </CListGroupItem>
        <CListGroupItem>Yaş Aralığı : {items.ageRange.range} </CListGroupItem>
        <CListGroupItem>Mezuniyet Durumu : {items.applicationForms.provinces} </CListGroupItem>
        <CListGroupItem>Almanca Dil Seviyesi Durumu: {items.applicationForms.provinces} </CListGroupItem>
        <CListGroupItem>Diğer Yabancı Dil: {items.applicationForms.provinces} </CListGroupItem>
        <CListGroupItem>Ehliyet : {items.applicationForms.provinces} </CListGroupItem>
        <CListGroupItem>Pasaport : {items.applicationForms.provinces} </CListGroupItem>
        <CListGroupItem>Boy : {items.applicationForms?.provinces} </CListGroupItem>
        <CListGroupItem>Kilonuz : {items.applicationForms?.provinces} </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Acil Durumda İrtibata Geçilecek Kişi</CListGroupItem>
        <CListGroupItem>Adı Soyadı : {items.applicationForms?.provinces} </CListGroupItem>
        <CListGroupItem>Cep Telefonu : {items.applicationForms?.provinces} </CListGroupItem>
        <CListGroupItem>E-Posta Adresi : {items.applicationForms?.provinces} </CListGroupItem>
        <CListGroupItem>Yakınlık Derecesi : {items.applicationForms?.provinces} </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>Başvuru Dosyaları</CListGroupItem>
        <CListGroupItem>Başvuru Formu : <a href="#">İndir</a></CListGroupItem>
        <CListGroupItem>CV : <a href="#">İndir</a></CListGroupItem>
        <CListGroupItem>Ek Belge  : <a href="#">İndir</a></CListGroupItem>
      </CListGroup>
    </>
  )

  return (
    <CContainer>
      <CRow>
        <CCard className="mx-auto my-3 col-xl-10 shadow">
          <CCardBody>{!loading ? items && userArea : <LoadingSpinner />}</CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default DetailApplicationPage