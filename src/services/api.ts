import axios from 'axios'
import { getCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    withCredentials: true,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use((config) => {
  const token = getCookie('encontreduca_user_auth')

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }
  }

  return config
})
