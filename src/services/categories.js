import { get } from './request'

export const getAll = () => get(`Categories/getall`)
export const getById = (id) => get(`Categories/getbyid?id=${id}`)
