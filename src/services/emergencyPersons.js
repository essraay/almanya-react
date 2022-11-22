import {get, post } from "./request"

export const getAll = () => get(`EmergencyPersons/getall`)
export const getById = (id) => post(`EmergencyPersons/getbyid?id=${id}`)
