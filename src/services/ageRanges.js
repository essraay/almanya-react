import { get } from './request'

export const getAll = () => get(`AgeRanges/getall`)
export const getById = (id) => get(`AgeRanges/getbyid?id=${id}`)
