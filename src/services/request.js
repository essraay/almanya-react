import store from '../store'
import { setUser } from '../store/authSlice'
import jsonToFormData from '@ajoelp/json-to-formdata';

function parseData(data) {
  // const formData = new FormData()
  // for (let [key, value] of Object.entries(data)) {
  //   formData.append(key, value)
  // }
  // return formData

  return jsonToFormData(data)
}

function request(url, data = false, method = 'GET', type = 'FORM_DATA') {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {},
    }

    const {
      authSlice: { user },
    } = store.getState()

    if (user) {
      options.headers.Authorization = `Bearer ${user.token}`
    }

    if (data && method === 'POST') {
      if (type === 'JSON') options.headers['Content-Type'] = 'application/json'
      options.body = type === 'JSON' ? JSON.stringify(data) : parseData(data)

      console.log('options.body :>> ', options.body)
    }

    fetch(import.meta.env.VITE_API_URL + url, options)
      .then(async (response) => {
        const result = await response.json()
        if (response.ok) {
          resolve(result)
        } else {
          if (response.status === 401 || response.status === 403) {
            store.dispatch(setUser(false))
          }
          reject(result)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const post = (url, data) => request(url, data, 'POST')
export const postJSON = (url, data) => request(url, data, 'POST', 'JSON')
export const get = (url) => request(url)
