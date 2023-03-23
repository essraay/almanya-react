import { get } from './request'

export const getAll = () => get(`EmergencyPersons/getall`)
export const getById = (id) => get(`EmergencyPersons/getbyid?id=${id}`)
