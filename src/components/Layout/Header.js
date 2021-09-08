import React, { useContext } from "react";
import mealsImage from "../../assets/asparagus.jpg";
import HeaderCartbutton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import authContext from "../../store/auth-context";

const Header = (props) => {
  const Authctx = useContext(authContext);

  const { isLoggedIn } = useContext(authContext);

  const logoutHandler = () => {
    Authctx.logoutHandler();
  };

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/Auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a
                className={classes["logout-anchor-tag"]}
                onClick={logoutHandler}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
        <HeaderCartbutton />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
