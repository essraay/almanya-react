import { get, post, postJSON } from "./request"

// export const getAll = (params) => get([`ApplicationForms/getall`, {params}.keys(params).map(key => key + '=' + params[key]).join('&')].join('?'))
export const getAll = () => get(`ApplicationForms/getall`)
export const getById = (id) => get(`ApplicationForms/getbyid?id=${id}`)
export const createApplication = (data) => post('ApplicationForms/add', data)
