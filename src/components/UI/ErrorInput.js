import React from "react";
import classes from "./ErrorInput.module.css";
const ErrorInput = (props) => {

    const styles = `${props.className} ${classes.error}`;
    
    return (
        
        <p className={styles}>{props.message}</p>
    )
  
};

export default ErrorInput;
