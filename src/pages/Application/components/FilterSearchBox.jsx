import { CButton, CFormSelect, CRow } from "@coreui/react"
import { useEffect } from "react"
import { useState } from "react"
import {
    AgeRangeService,
    CategoryService,
    GenderService,
    GermanLanguageLevelService,
    NationalitieService,
    ProvinceService
} from "../../../services"

const FilterSearchBox = ({ onChange, filterValue = {} }) => {
    const [filter, setFilter] = useState(filterValue)
    useEffect(() => onChange?.(filter), [filter])

    useEffect(() => {
        GenderService.getAll().then((response) => {
            setGenderList(response.data)
        })
        NationalitieService.getAll().then((response) => {
            setNationalityList(response.data)
        })
        AgeRangeService.getAll().then((response) => {
            setAgeRangeList(response.data)
        })
        GermanLanguageLevelService.getAll().then((response) => {
            setGermanLevelList(response.data)
        })
        CategoryService.getAll().then((response) => {
            setCategoryList(response.data)
        })
        ProvinceService.getAll().then((response) => {
            setProvinceList(response.data)
        })
    }, [])

    const [genderList, setGenderList] = useState([])
    const [nationalityList, setNationalityList] = useState([])
    const [ageRangeList, setAgeRangeList] = useState([])
    const [germanLevelList, setGermanLevelList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [provinceList, setProvinceList] = useState([])

    return (
        <div className="d-flex flex-row gap-3">
            <CRow className="flex-grow-1">
                <div
                    className="form-group col-md-2"
                    style={{ color: '#6D4D4D', margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="gender"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, gender: e.target.value }))
                        }}
                        value={filter?.gender || '-1'}
                        options={[{
                            label: "Cinsiyet",
                            value: '-1',
                            disabled: true,
                        }, ...genderList.map((gender) => ({
                            label: gender.name,
                            value: gender.id,
                        }))]}
                    />
                </div>
                <div
                    className="form-group col-md-2"
                    style={{ margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="ageRange"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, ageRange: e.target.value }))
                        }}
                        value={filter?.ageRange || '-1'}
                        options={[{
                            label: "Ya?? Aral??????",
                            value: '-1',
                            disabled: true,
                        }, ...ageRangeList.map((ageRange) => ({
                            label: ageRange.range,
                            value: ageRange.id,
                        }))]}
                    />
                </div>
                <div
                    className="form-group col-md-2"
                    style={{ margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="category"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, category: e.target.value }))
                        }}
                        value={filter?.category || '-1'}
                        options={[{
                            label: "Ba??vurulan Meslek",
                            value: '-1',
                            disabled: true,
                        }, ...categoryList.map((category) => ({
                            label: category.categoryName,
                            value: category.id,
                        }))]}
                    />

                </div>
                <div
                    className="form-group col-md-2"
                    style={{ margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="germanLevel"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, germanLevel: e.target.value }))
                        }}
                        value={filter?.germanLevel || '-1'}
                        options={[{
                            label: "Almanca Dil Seviyesi",
                            value: '-1',
                            disabled: true,
                        }, ...germanLevelList.map((germanLevel) => ({
                            label: germanLevel.level,
                            value: germanLevel.id,
                        }))]}
                    />
                </div>
                <div
                    className="form-group col-md-2"
                    style={{ margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="nationality"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, nationality: e.target.value }))
                        }}
                        value={filter?.nationality || '-1'}
                        options={[{
                            label: "Uyruk",
                            value: '-1',
                            disabled: true,
                        }, ...nationalityList.map((nationality) => ({
                            label: nationality.name,
                            value: nationality.id,
                        }))]}
                    />
                </div>
                <div
                    className="form-group col-md-2"
                    style={{ margin: '1% 0' }}
                >
                    <CFormSelect
                        style={{ borderColor: 'blue' }}
                        type="text"
                        name="province"
                        onChange={(e) => {
                            setFilter(x => ({ ...x, province: e.target.value }))
                        }}
                        value={filter?.province || '-1'}
                        options={[{
                            label: "??l",
                            value: '-1',
                            disabled: true,
                        }, ...provinceList.map((province) => ({
                            label: province.name,
                            value: province.id,
                        }))]}
                    />
                </div>
            </CRow>
            <div className="d-grid" style={{ placeItems: 'center' }}>
                <CButton onClick={() => setFilter({})}>Temizle</CButton>
            </div>
        </div>
    )
}
export default FilterSearchBox