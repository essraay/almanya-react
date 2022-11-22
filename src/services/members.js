import { get, post, postJSON } from './request'

export const getUsersDetail = (id) => get(`Users/getbyid?id=${id}`)
export const authenticate = (data) => post('Users/authenticate', data)
export const userUpdate = (data) => postJSON('Users/update', data)