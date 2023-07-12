import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Tracker
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }

          >
            About
          </NavLink>
        </li>
        {/* <li><NavLink to="/login">Login</NavLink></li> */}
      </ul>
    </nav>
  )
};

export default MainNavigation;