import { get, post } from './request'

export const getAll = (filter) => {
  let path = 'ApplicationForms/getall'

  if (filter && Object.keys(filter).length > 0) {
    const searchQuery = Object.entries(filter)
      .map(([key, value]) => key.concat('=', value))
      .join('&')

    path += '?' + searchQuery
  }

  return get(path)
}

export const exportExcel = (filter) => {
  let path = 'ApplicationForms/export'

  if (filter && Object.keys(filter).length > 0) {
    const searchQuery = Object.entries(filter)
      .map(([key, value]) => key.concat('=', value))
      .join('&')

    path += '?' + searchQuery
  }

  return get(path)
}

export const getById = (id) => get(`ApplicationForms/getbyid?id=${id}`)
export const createApplication = (data) => post('ApplicationForms/add', data)
