import {get, post } from "./request"

export const getAll = () => get(`AgeRanges/getall`)
export const getById = (id) => post(`AgeRanges/getbyid?id=${id}`)
