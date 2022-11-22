import {get, post } from "./request"

export const getAll = () => get(`GermanLanguageLevels/getall`)
export const getById = (id) => post(`GermanLanguageLevels/getbyid?id=${id}`)
