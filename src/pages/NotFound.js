import React from "react";
import { Link } from "react-router-dom";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <h2>404</h2>
        <p>We are sorry, page not found!!!</p>
        <p>
          The page you are looking for might have been removed as its name
          changed or is temporarily unavailable.
        </p>
      </div>
      <div className={classes.actions}>
        <Link className={classes.link} to="/">
          Back to homepage
        </Link>
      </div>
      
    </>
  );
};

export default NotFound;
