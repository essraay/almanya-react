import { get } from './request'

export const getAll = () => get(`Balances/getall`)
export const getById = (id) => get(`Balances/getbyid?id=${id}`)
