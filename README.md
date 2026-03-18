
---

# 🎶 kei-music  
**陈佳（邓丽君传人）官方音乐网站**  
一个融合东方美学与现代 Web 技术的沉浸式音乐体验平台。

![React 19](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css)  
![Zustand](https://img.shields.io/badge/Zustand-5A5F72?logo=zustand&logoColor=white)

---

## 🌟 项目简介

`kei-music` 是为 **陈佳小姐**（被誉为“邓丽君传人”）打造的官方音乐网站，旨在：

- 展示其经典与原创音乐作品  
- 发布演出资讯与文化活动  
- 传承邓丽君艺术精神  
- 提供多语言支持（中文 / 英文）

项目采用 **React 19 + TypeScript + Vite + Tailwind CSS** 等现代技术栈，构建高性能、可维护、响应式的 Web 应用。

> ✅ 建议访问：[http://localhost:5173](http://localhost:5173) 查看开发环境

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **核心框架** | React 19 (含新特性) + TypeScript |
| **构建工具** | Vite 7（通过 `rolldown-vite` 优化） |
| **状态管理** | Zustand（轻量、类型安全） |
| **路由** | React Router v7 |
| **国际化** | i18next + react-i18next |
| **UI 组件** | 自定义组件 + Radix UI（无样式基础） |
| **样式系统** | Tailwind CSS + tailwind-merge + tailwind-scrollbar |
| **动画库** | GSAP（用于黑胶旋转等复杂动画） |
| **通知系统** | Sonner（优雅的 Toast） |
| **工具链** | ESLint + Prettier + TypeScript 5.9 |

---

## 📁 项目结构

```bash
kei-music/
├── public/                 # 静态资源（favicon, logo.png）
├── src/
│   ├── assets/             # 图片、音频、字体等静态资源
│   ├── components/         # 可复用 UI 组件（Button, Card, Player...）
│   │   └── layout/         # Header, Footer, MainLayout
│   ├── locales/            # 多语言翻译文件（zh-CN.json, en-US.json）
│   ├── pages/              # 页面组件（Home, Biography, Discography...）
│   ├── stores/             # Zustand 全局状态管理（如播放器状态）
│   ├── utils/              # 工具函数（日期格式化、音频处理等）
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 依赖与脚本
└── README.md               # 项目说明
```

---

## 🚀 快速启动

确保已安装 [Node.js ≥ 20](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)：

```bash
# 克隆项目
git clone https://github.com/your-org/kei-music.git
cd kei-music

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

应用将在 `http://localhost:5173` 启动，并支持热更新（HMR）。

---

## 🧪 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发模式启动 |
| `pnpm build` | 构建生产版本（输出到 `dist/`） |
| `pnpm preview` | 预览构建结果 |
| `pnpm lint` | 检查代码规范 |

> ✅ 构建流程：`tsc -b → vite build`，确保 TypeScript 编译后再打包。

---

## 🌍 国际化（i18n）

使用 `i18next + react-i18next` 实现多语言支持。

翻译文件位于 `src/locales/`，例如：

```json
// src/locales/zh-CN.json
{
  "home": "首页",
  "biography": "生平",
  "discography": "作品",
  "concerts": "演出",
  "contact": "联系"
}
```

支持动态切换语言（可通过 URL 或 UI 控件）。

---

## 🔧 状态管理（Zustand）

使用 `zustand` 管理全局状态，如播放器控制：

```ts
// src/stores/playerStore.ts
import { create } from 'zustand'

interface PlayerState {
  currentTrack: string
  isPlaying: boolean
  volume: number
}

const usePlayerStore = create<PlayerState>()(set => ({
  currentTrack: '',
  isPlaying: false,
  volume: 0.8,
}))

export default usePlayerStore
```

---

## 🎨 设计与样式

- 使用 **Tailwind CSS** 进行快速布局与样式开发  
- 自定义主题色：酒红、墨绿、金色（体现东方古典美）  
- 使用 `tailwind-scrollbar` 自定义滚动条样式  
- 使用 `tailwindcss-animate` 添加流畅动画效果  
- 所有组件遵循 `shadcn/ui` 风格（简洁、语义化）

---

## ✅ 代码质量与规范

- **ESLint**：启用 `typescript-eslint` + `@stylistic/eslint-plugin-js`，支持类型检查  
- **Prettier**：统一代码格式，集成 `prettier-plugin-tailwindcss`  
- **Git Hooks**：`.gitignore` 排除 `dist/`, `node_modules/` 等  

---

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！

请确保：
- 代码通过 `pnpm lint`
- 新增组件遵循命名规范
- 中文文案添加至 `locales/zh-CN.json`

---

## 📜 许可证

本项目为 **私有仓库**，仅供官方团队使用。  
© 2026 陈佳音乐工作室 · 保留所有权利。

---

> Built with ❤️ for timeless music and cultural heritage.  
> **邓丽君之音，陈佳承韵。**

---
