import { postJSON } from './request'

export const addDocumentFiles = (data) => postJSON('DocumentFiles/add', data)