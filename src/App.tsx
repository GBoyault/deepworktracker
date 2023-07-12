import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TrackerView from './views/TrackerView/TrackerView';
import AboutView from './views/AboutView/AboutView';
import RootView from './views/RootView/RootView';
import ErrorView from './views/ErrorView.tsx/ErrorView';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    children: [
      { path: '/', element: <TrackerView /> },
      { path: '/about', element: <AboutView /> },
    ],
    errorElement: <ErrorView />
  }
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
