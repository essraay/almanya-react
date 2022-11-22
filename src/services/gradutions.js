import {get, post } from "./request"

export const getAll = () => get(`Gradutions/getall`)
export const getById = (id) => post(`Gradutions/getbyid?id=${id}`)
