import {BASE_URL, PER_PAGE} from '../constants'

export async function wpDataTypeFetch(type: string, page: number) {
  const url = `${BASE_URL}/${type}?page=${page}&per_page=${PER_PAGE}`
  
  const response = await fetch(url)

  const data = await response.json()
  return data
}