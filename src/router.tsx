// src/router.tsx
import { createBrowserRouter } from 'react-router'
import MainLayout from '@/components/layout/MainLayout'
import Home from '@/pages/Home'
import Biography from '@/pages/Biography'
import Discography from '@/pages/Discography'
import Concerts from '@/pages/Concerts'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import appDefaults from './settings'

/**
 * 应用路由配置
 * - 所有页面共享 MainLayout（含 Header / Footer）
 * - URL 语义化设计，利于 SEO
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'biography',
        element: <Biography />,
      },
      {
        path: 'music',
        element: <Discography />,
      },
      {
        path: 'concerts',
        element: <Concerts />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
], {
  basename: appDefaults.buildDir,
})