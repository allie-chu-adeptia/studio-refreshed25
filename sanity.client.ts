import { createClient } from '@sanity/client'

export default createClient({
  projectId: '5ujtwa6a',
  dataset: 'production',
  useCdn: false, // set to `true` for production
  apiVersion: '2025-01-16', // use current date in YYYY-MM-DD format
})