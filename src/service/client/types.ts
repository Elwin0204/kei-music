import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// 扩展请求配置（用于携带元信息）
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示全局 loading（可选） */
  showLoading?: boolean
  /** 是否自动弹出错误提示（默认 true） */
  showError?: boolean
  /** 是否跳过 token 验证（如登录接口） */
  skipAuth?: boolean
}

// 拦截器内部使用
export interface InternalRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
  skipAuth?: boolean
}

// 后端通用响应格式（根据你实际 API 调整！）
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}