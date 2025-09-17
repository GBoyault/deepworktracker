import { RouterProvider } from "react-router";
import { router } from "./router";
import SettingsContextProvider from "./contexts/SettingsContext";

const App = () => {
  return (
    <SettingsContextProvider>
      <RouterProvider router={router} />
    </SettingsContextProvider>
  );
};

export default App;
