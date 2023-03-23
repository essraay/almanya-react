import { get } from './request'

export const getAll = () => get(`Gradutions/getall`)
export const getById = (id) => get(`Gradutions/getbyid?id=${id}`)
