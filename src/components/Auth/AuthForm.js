import React, { useState, useRef, useCallback, useContext } from "react";

import classes from "./AuthForm.module.css";
import Card from "../UI/Card";

import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

import { useHistory } from "react-router";

import authContext from "../../store/auth-context";

const Authform = () => {
  const [login, setLogin] = useState(false);

  const Authctx = useContext(authContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { isLoading, error, sendRequest: authenticateUser } = useHttp();

  const history = useHistory();

  const switchLoginHandler = () => {
    setLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url;

    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk";
    }

    const transformData = (data) => {

      Authctx.loginHandler(data.idToken);
     
      history.replace("/");
    };

    authenticateUser(
      {
        url,
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      },
      transformData
    );
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        {error && <p>{error}</p>}
        <h2>{login ? " Login" : "Sign Up"}</h2>
        <div className={classes.control}>
          <label>Email</label>
          <input ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{login ? "Login" : "Sign Up"}</button>}
          {isLoading && <LoadingSpinner />}
          <a onClick={switchLoginHandler}>
            {login
              ? "create a new account"
              : "sign up with an existing account"}
          </a>
        </div>
      </form>
    </Card>
  );
};

export default Authform;
