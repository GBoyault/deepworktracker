import { createBrowserRouter } from 'react-router-dom'
import { RootView, TrackerView, AboutView, ErrorView } from '../views'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    children: [
      { path: '', element: <TrackerView /> },
      { path: 'about', element: <AboutView /> }
    ],
    errorElement: <ErrorView />
  }
]
)
