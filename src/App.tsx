import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TrackerView from './views/TrackerView/TrackerView'
import AboutView from './views/AboutView/AboutView'
import RootView from './views/RootView/RootView'
import ErrorView from './views/ErrorView.tsx/ErrorView'
import MinDurationContextProvider from './contexts/MinDurationContext'

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
    <MinDurationContextProvider>
      <RouterProvider router={router} />
    </MinDurationContextProvider>
  )
}

export default App
