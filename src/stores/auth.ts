// src/store/auth.ts
import { create } from 'zustand'

export type UserRole = 'guest' | 'user' // 可扩展：'admin', 'vip' 等

interface AuthState {
  // 当前角色（计算得出，非手动设置）
  role: UserRole
  // 是否已认证（有有效 token）
  isAuthenticated: boolean
  // 用户名（可选）
  username: string | null

  // Actions
  login: (token: string, username?: string) => void
  logout: () => void
}

const TOKEN_KEY = 'KEI_MUSIC_API_TOKEN' // 或你的项目 token key

// 从 localStorage 读取 token 并解析初始状态
const getInitialAuthState = (): { role: UserRole; isAuthenticated: boolean; username: string | null } => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    return { role: 'guest', isAuthenticated: false, username: null }
  }

  // 【可选】解析 token 获取用户名（如 JWT）
  // 如果不需要，username 可留空
  let username: string | null = null
  try {
    // 示例：假设 token 是 JWT，payload 在第二段
    const payload = JSON.parse(atob(token.split('.')[1]))
    username = payload.sub || null
  } catch (e) {
    // token 无效？当作未登录处理（或保留 guest）
    console.warn('Invalid token format')
  }

  return {
    role: 'user',
    isAuthenticated: true,
    username,
  }
}

export const useAuth = create<AuthState>((set) => {
  const initialState = getInitialAuthState()

  return {
    ...initialState,

    login: (token: string, username?: string) => {
      localStorage.setItem(TOKEN_KEY, token)
      set({
        role: 'user',
        isAuthenticated: true,
        username: username || null,
      })
    },

    logout: () => {
      localStorage.removeItem(TOKEN_KEY)
      set({
        role: 'guest',
        isAuthenticated: false,
        username: null,
      })
    },
  }
})