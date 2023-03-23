import { get } from './request'

export const getAll = () => get(`GermanLanguageLevels/getall`)
export const getById = (id) => get(`GermanLanguageLevels/getbyid?id=${id}`)
