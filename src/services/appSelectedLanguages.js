import { get } from './request'

export const getAll = () => get(`AppSelectedLanguages/getall`)
export const getById = (id) => get(`AppSelectedLanguages/getbyid?id=${id}`)
