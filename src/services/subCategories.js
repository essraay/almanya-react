import { get } from './request'

export const getAll = () => get(`SubCategories/getall`)
export const getById = (id) => get(`SubCategories/getbyid?id=${id}`)
