// src/App.tsx
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { router } from '@/router'
import { AppProvider } from './components/AppProvider'
import { AudioProvider } from './components/AudioProvider'

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AudioProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AudioProvider>
      </AppProvider>
    </HelmetProvider>
  )
}