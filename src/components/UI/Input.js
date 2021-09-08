import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {

  const styles = `${props.className} ${classes.input} ${props.hasError ? classes.invalid : ""}`;
  return (
    <div className={styles}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
