import { NavLink } from "react-router";
import Header from "../../components/Layout/Header/Header";
import classes from "./ErrorView.module.css";

export const ErrorView = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <div className={classes["error-view"]}>
          <h2>Erreur 404</h2>
          <p>La page que vous recherchez ne semble pas exister.</p>
          <NavLink to="/">→ Retourner au tracker</NavLink>
        </div>
      </main>
    </>
  );
};
