import { get } from './request'

export const getAll = () => get(`Provinces/getall`)
export const getById = (id) => get(`Provinces/getbyid?id=${id}`)
