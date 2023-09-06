import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TrackerView from './views/TrackerView/TrackerView'
import AboutView from './views/AboutView/AboutView'
import RootView from './views/RootView/RootView'
import ErrorView from './views/ErrorView.tsx/ErrorView'
import SettingsContextProvider from './contexts/SettingsContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    children: [
      { path: '/', element: <TrackerView /> },
      { path: '/about', element: <AboutView /> }
    ],
    errorElement: <ErrorView />
  }
],
{ basename: '/deep-work-tracker' }
)

const App = () => {
  return (
    <SettingsContextProvider>
      <RouterProvider router={router} />
    </SettingsContextProvider>
  )
}

export default App
