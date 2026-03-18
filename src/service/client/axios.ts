import axios, { type AxiosInstance } from 'axios'
import appDefaults from '@/settings'

const { apiBaseUrl } = appDefaults

const createHttpClient = (): AxiosInstance => {
  return axios.create({
    baseURL: apiBaseUrl || '/api',
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const httpClient = createHttpClient()