import React from "react";
import classes from "./ErrorInput.module.css";
const ErrorInput = (props) => {
    
    return (
        <p className={classes.error}>{props.message}</p>
    )
  
};

export default ErrorInput;
