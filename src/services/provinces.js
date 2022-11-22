import {get, post } from "./request"

export const getAll = () => get(`Provinces/getall`)
export const getById = (id) => post(`Provinces/getbyid?id=${id}`)
