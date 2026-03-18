// src/App.tsx
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { router } from '@/router'
import { AppProvider } from './components/AppProvider'

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AppProvider>
    </HelmetProvider>
  )
}