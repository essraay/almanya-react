import { get } from './request'

export const getAll = () => get(`Genders/getall`)
export const getById = (id) => get(`Genders/getbyid?id=${id}`)
