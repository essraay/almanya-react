import {get, post } from "./request"

export const getAll = () => get(`Genders/getall`)
export const getById = (id) => post(`Genders/getbyid?id=${id}`)
