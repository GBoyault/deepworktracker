import { useContext } from "react";
import { Outlet } from "react-router";

import { SettingsContext } from "../../contexts/SettingsContext";
import Header from "../../components/Layout/Header/Header";
import classes from "./RootView.module.css";

export const RootView = () => {
  const { theme } = useContext(SettingsContext);
  const className =
    theme === "dark"
      ? classes.main
      : `${classes.main} ${classes["main--theme-light"]}`;

  return (
    <>
      <Header />
      <main className={className}>
        <Outlet />
      </main>
    </>
  );
};
