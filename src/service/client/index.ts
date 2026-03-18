import { httpClient } from './axios'
import type { RequestConfig } from './types'

/**
 * 统一请求入口
 */
export const request = <T = any>(config: RequestConfig): Promise<T> => {
  return httpClient.request(config)
}

// 快捷方法（可选，但推荐保留）
export const get = <T = any>(url: string, config?: RequestConfig) =>
  request<T>({ method: 'GET', url, ...config })

export const post = <T = any>(url: string, data?: any, config?: RequestConfig) =>
  request<T>({ method: 'POST', url, data, ...config })

export const put = <T = any>(url: string, data?: any, config?: RequestConfig) =>
  request<T>({ method: 'PUT', url, data, ...config })

export const del = <T = any>(url: string, config?: RequestConfig) =>
  request<T>({ method: 'DELETE', url, ...config })

// 导出原始实例（用于上传等高级场景）
export { httpClient }
export type { RequestConfig }