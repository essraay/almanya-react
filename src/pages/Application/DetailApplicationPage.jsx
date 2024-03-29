import { CCard, CCardBody, CContainer, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService } from '../../services'
import { dateFormat } from '../../utils'

const DetailApplicationPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(false)

  useEffect(() => {
    ApplicationFormService.getById(id)
      .then((res) => {
        // console.log(items)
        setItems(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const userArea = items && (
    <>
      <CListGroup>
        <CListGroupItem>
          <b>Başvuru Tarihi : {dateFormat(items.createdAt)}</b>
        </CListGroupItem>
        <br />
        <CListGroupItem
          disabled
          style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}
        >
          <b>Başvurulan Sektör / Meslek</b>
        </CListGroupItem>
        <CListGroupItem>
          {items.subCategory.name} / {items.category.categoryName}
        </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem
          disabled
          style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}
        >
          <b>Başvuru Bilgileri</b>
        </CListGroupItem>
        <CListGroupItem>
          <b>Adı: </b>
          {items?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Soyadı: </b>
          {items?.surname}
        </CListGroupItem>
        <CListGroupItem>
          <b>Doğum Yeri : </b>
          {items?.birthPlace}
        </CListGroupItem>
        <CListGroupItem>
          <b>Doğum Tarihi: </b>
          {dateFormat(items?.birthday)}
        </CListGroupItem>
        <CListGroupItem>
          <b>Telefon : </b>
          {items?.phone}
        </CListGroupItem>
        <CListGroupItem>
          <b>Email : </b>
          {items?.email}
        </CListGroupItem>
        <CListGroupItem>
          <b>İl : </b>
          {items?.provinces?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>İlçe : </b> {items?.district?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Uyruk : </b> {items?.nationality?.name == 'Boş' ? ' ' : items?.nationality?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Çifte Vatandaşlık : </b> {items?.dualNationality ? 'Var' : 'Yok'}
        </CListGroupItem>
        <CListGroupItem>
          <b>Cinsiyet : </b> {items?.gender?.name == 'Boş' ? ' ' : items?.gender?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Yaş Aralığı : </b> {items?.ageRange?.range}
        </CListGroupItem>
        <CListGroupItem>
          <b>Mezuniyet Durumu : </b> {items?.graduation?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Almanca Dil Seviyesi Durumu: </b> {items?.germanLevel?.level}
        </CListGroupItem>
        <CListGroupItem>
          <b>Diğer Bilinen Diller: </b>
          {items?.appSelectedLanguages?.map((x) => x.otherLanguage.name).join(', ')}
        </CListGroupItem>
        <CListGroupItem>
          <b>Ehliyet : </b> {items?.drivingLicense ? 'Var' : 'Yok'}
        </CListGroupItem>
        <CListGroupItem>
          <b>Pasaport : </b>
          {items.passport ? 'Var' : 'Yok'}
        </CListGroupItem>
        <CListGroupItem>
          <b>Tam Denklik : </b> {items?.balance?.name}
        </CListGroupItem>
        <CListGroupItem>
          <b>Ehliyet : </b> {items?.drivingLicense ? 'Var' : 'Yok'}
        </CListGroupItem>
        <CListGroupItem>
          <b>Boy : </b> {items?.length}
        </CListGroupItem>
        <CListGroupItem>
          <b>Kilo : </b> {items?.weight}
        </CListGroupItem>
      </CListGroup>

      <br />
      <CListGroup>
        <CListGroupItem
          disabled
          style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}
        >
          <b>Özel Not </b>
        </CListGroupItem>
        <CListGroupItem>{items?.note}</CListGroupItem>
      </CListGroup>

      <br />

      <CListGroup>
        <CListGroupItem
          disabled
          style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}
        >
          <b>Acil Durumda İrtibata Geçilecek Kişi</b>
        </CListGroupItem>
        <CListGroupItem>
          <b>Adı Soyadı : </b> {items?.emergencyPersonFullName}
        </CListGroupItem>
        <CListGroupItem>
          <b>Cep Telefonu : </b> {items?.emergencyPersonPhone}
        </CListGroupItem>
        <CListGroupItem>
          <b>E-Posta Adresi : </b> {items?.emergencyPersonEmail}
        </CListGroupItem>
        <CListGroupItem>
          <b>Yakınlık Derecesi : </b> {items?.emergencyPersonDegreeOfProximity}
        </CListGroupItem>
      </CListGroup>
      <br />
      <CListGroup>
        <CListGroupItem
          disabled
          style={{ backgroundColor: '#B1DDFF', color: '#425F8A', fontWeight: 'bold' }}
        >
          Başvuru Dosyaları
        </CListGroupItem>
        <CListGroupItem>
          <b>CV : </b>
          <a href={items?.cvFile}> İndir</a>
        </CListGroupItem>
        <CListGroupItem>
          <b>Sözleşme : </b>
          <a href={items?.contractFile}> İndir</a>
        </CListGroupItem>
        <CListGroupItem>
          <b>Ek Belge : </b>
          <a href={items?.otherFile}> İndir</a>
        </CListGroupItem>
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
