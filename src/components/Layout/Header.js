import React, { createContext } from "react";
import mealsImage from "../../assets/asparagus.jpg";
import HeaderCartbutton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {

  const logoutHandler = ()=>{
    
  }

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <ul>
          <li>
            <Link to="/Auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
        <HeaderCartbutton onClick={props.onShowCartHander} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
