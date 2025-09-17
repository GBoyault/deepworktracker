import { createTheme, ThemeProvider } from "@mui/material/styles";
import { type PropsWithChildren } from "react";

const purpleTheme = createTheme({
  palette: {
    secondary: {
      main: "#9e6cff",
    },
  },
});

const PurpleThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={purpleTheme}>{children}</ThemeProvider>;
};

export default PurpleThemeProvider;
