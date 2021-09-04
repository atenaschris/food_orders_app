import React from "react";

import classes from "./AuthPage.module.css";

import AuthForm from "./AuthForm";

const AuthPage = () => {
  return (
    <div className={classes.auth}>
      <h2>Welcome to the SignIn/SignUp page!!!!</h2>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
