import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import SettingsContextProvider from './contexts/SettingsContext'

const App = () => {
  return (
    <SettingsContextProvider>
      <RouterProvider router={router} />
    </SettingsContextProvider>
  )
}

export default App
