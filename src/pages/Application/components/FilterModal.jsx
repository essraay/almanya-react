import { CButton, CFormCheck, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react"
import { useEffect, useState } from "react"
import { ProvinceService } from "../../../services"

const FilterModal = ({ visible = false, onClose }) => {

    const [provinceList, setProvinceList] = useState([])

    useEffect(() => {
        ProvinceService.getAll().then((response) => {
            setProvinceList(response.data)
        })
        // formRef.current.querySelector('input').focus()
    }, [])

    return (
        <CModal
            className="show "
            keyboard={false}
            alignment="center"
            visible={visible}
            onClose={onClose}
            style={{backgroundColor:'#DEFCFF'}}
        >
            <CModalHeader className="fw-bold">Filtrele</CModalHeader>
            <CModalBody>
                <div className="d-flex flex-column gap-3">
                    <div className="row mx-2">
                        <label className="form-label fw-bold">Yaş</label>
                        <CFormCheck className="col-4" label="18-25" />
                        <CFormCheck className="col-4" label="26-45" />
                        <CFormCheck className="col-4" label="45-55" />
                    </div>
                    <div className="row mx-2">
                        <label className="form-label fw-bold">Cinsiyet</label>
                        <CFormCheck className="col-4" label="Kadın" />
                        <CFormCheck className="col-4" label="Erkek" />
                    </div>
                    <div className="row mx-2">
                        <label className="form-label fw-bold">Almanca Dil Seviyesi Durumu</label>
                        <CFormCheck className="col-12" label="Bilmiyorum" />
                        <CFormCheck className="col-4" label="A1" />
                        <CFormCheck className="col-4" label="A2" />
                        <CFormCheck className="col-4" label="B1" />
                        <CFormCheck className="col-4" label="B2" />
                        <CFormCheck className="col-4" label="C1" />
                    </div>
                    <div className="row mx-2">
                        <label className="form-label fw-bold">Uyruk</label>
                        <CFormCheck className="col-4" label="T.C." />
                        <CFormCheck className="col-4" label="A.B." />
                        <CFormCheck className="col-4" label="Diğer" />
                    </div>
                    <div className="fw-bold">
                        <CFormSelect
                            label="İl"
                            aria-label="Default select example"
                            name="provincesId"
                            // onChange={handleChange}
                            options={[{
                                label: "Seçiniz",
                                value: '-1',
                                disabled: true,
                            }, ...provinceList.map((province) => ({
                                label: province.name,
                                value: province.id,
                            }))]}
                        />
                    </div>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton
                    color="secondary"
                    onClick={onClose}
                >
                    Tamam
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export default FilterModal