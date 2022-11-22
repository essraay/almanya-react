import { CCard, CCardBody, CContainer, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ApplicationFormService } from '../../services'

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

  const userArea = items && <>
    <CListGroup>
      <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>
        <b>Başvuru Bilgileri</b>
      </CListGroupItem>
      <CListGroupItem>
        <b>Adı: </b>{items?.name}
      </CListGroupItem>
      <CListGroupItem>
        <b>Soyadı: </b>{items?.surname}
      </CListGroupItem>
      <CListGroupItem>
        <b>TC : </b>{items?.tc}
      </CListGroupItem>
      <CListGroupItem>
        <b>Doğum Yeri : </b>{items?.birthPlace}
      </CListGroupItem>
      <CListGroupItem>
        <b>Doğum Tarihi: </b>{items?.birthday}
      </CListGroupItem>
      <CListGroupItem>
        <b>Adres: </b>{items?.adress}
      </CListGroupItem>
      <CListGroupItem>
        <b>Telefon : </b>{items?.phone}
      </CListGroupItem>
      <CListGroupItem>
        <b>Email : </b>{items?.email}
      </CListGroupItem>
      <CListGroupItem>
        <b>İl : </b>{items?.provinces?.name}
      </CListGroupItem>
      <CListGroupItem>
        <b>İlçe : </b> {items?.district?.name}
      </CListGroupItem>
      <CListGroupItem>
        <b>Uyruk : </b> {items?.nationality?.name}
      </CListGroupItem>
      <CListGroupItem>
        <b>Çifte Vatandaşlık : </b> {items?.dualNationality ? 'Var' : 'Yok'}
      </CListGroupItem>
      <CListGroupItem>
        <b>Cinsiyet : </b> {items?.gender?.name}
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
        <b>Diğer Yabancı Dil: </b> {items?.otherLanguage?.name}
      </CListGroupItem>
      <CListGroupItem>
        <b>Ehliyet : </b> {items?.drivingLicense ? 'Var' : 'Yok'}
      </CListGroupItem>
      <CListGroupItem>
        <b>Pasaport : </b>{items?.passport ? 'Var' : 'Yok'}
      </CListGroupItem>
      <CListGroupItem>
        <b>Boy : </b> {items?.length}
      </CListGroupItem>
      <CListGroupItem>
        <b>Kilonuz : </b> {items?.weight}
      </CListGroupItem>
    </CListGroup>

    <br />

    <CListGroup>
      <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A' }}>
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
      <CListGroupItem disabled style={{ backgroundColor: '#B1DDFF', color: '#425F8A', fontWeight:'bold'}}>
        Başvuru Dosyaları
        </CListGroupItem>
      <CListGroupItem>
        <b>Başvuru Formu : </b>
        <a href="#">İndir</a>
      </CListGroupItem>
      <CListGroupItem>
        <b>CV : </b>
        <a href="#">İndir</a>
      </CListGroupItem>
      <CListGroupItem>
        <b>Ek Belge  : </b>
        <a href="#">İndir</a>
      </CListGroupItem>
    </CListGroup>
  </>

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