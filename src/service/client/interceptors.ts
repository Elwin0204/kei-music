// src/service/client/interceptors.ts
import { httpClient } from './axios'
import type { InternalRequestConfig } from './types'
import { notify } from '@/utils/toast' // ← 改为导入工具函数（非 Zustand）
import type { AxiosError, AxiosResponse } from 'axios'

// ========================
// 请求拦截器
// ========================
httpClient.interceptors.request.use(
  (config: InternalRequestConfig) => {
    // 注入 Token
    const token = localStorage.getItem('token')
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 可扩展：触发全局 loading（未来可接入 Zustand loading store）
    // if (config.showLoading) {
    //   useLoadingStore.getState().show()
    // }

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// ========================
// 响应拦截器
// ========================
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 隐藏 loading（如有）
    // useLoadingStore.getState().hide()

    // ⚠️ 关键：不在此解包 response.data，由 API 层处理
    return response
  },
  (error: AxiosError) => {
    // 隐藏 loading（如有）
    // useLoadingStore.getState().hide()

    const requestConfig = error.config as InternalRequestConfig | undefined
    const shouldShowError = requestConfig?.showError !== false

    let message = '网络异常，请稍后重试'

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 401:
          message = '未授权，请重新登录'
          localStorage.removeItem('token')
          // 使用 React Router 跳转（更优雅）
          window.location.href = '/login'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          // 尝试从后端返回的 JSON 中获取 message
          const data = error.response.data as any
          message = data?.message || '请求失败'
      }
    } else if (error.request) {
      // 请求已发出但无响应（如超时、断网）
      message = '请求超时或网络异常'
    } else {
      // 其他错误（如 URL 配置错误）
      message = error.message || '未知错误'
    }

    // ✅ 正确调用：直接使用工具函数（非 Zustand）
    if (shouldShowError) {
      notify.error(message)
    }

    return Promise.reject(error)
  }
)