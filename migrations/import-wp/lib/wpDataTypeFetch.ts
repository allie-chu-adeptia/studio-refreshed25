import {BASE_URL, PER_PAGE} from '../constants'
import type {WordPressDataType, WordPressDataTypeResponses} from '../types'

// export async function wpDataTypeFetch<T extends WordPressDataType>(
//   type: T,
//   page: number
// ): Promise<WordPressDataTypeResponses[T]> {
//   const wpApiUrl = new URL(`${BASE_URL}/${type}`)
//   wpApiUrl.searchParams.set('page', page.toString())
//   wpApiUrl.searchParams.set('per_page', PER_PAGE.toString())

//   // console.log('Fetching from URL:', wpApiUrl.toString())

//   return fetch(wpApiUrl).then((res) => (res.ok ? res.json() : null))
// }

export async function wpDataTypeFetch(type: string, page: number) {
  const url = `${BASE_URL}/${type}?page=${page}&per_page=${PER_PAGE}`
  console.log(`Fetching from: ${url}`)
  
  const response = await fetch(url)
  
  // Debug headers
  console.log('Total WP Items:', response.headers.get('X-WP-Total'))
  console.log('Total WP Pages:', response.headers.get('X-WP-TotalPages'))
  
  const data = await response.json()
  return data
}