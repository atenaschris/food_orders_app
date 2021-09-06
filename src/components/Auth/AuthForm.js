import React, { useState, useRef, useCallback, useContext } from "react";
import salmon from "../../images/salmon.jpg";
import hamburger from "../../images/hamburger.jpg";

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

  /*  const switchLoginHandler = () => {
    setLogin((prevState) => !prevState);
  }; */

  const switchSignInSignUpHandler = () => {
    setLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url;

    if (!login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk";
    }

    const transformData = (data) => {
      console.log(data.expiresIn);

      const actualDateInMilliseconds = new Date().getTime();

      const expiresInFromSecondsToMilliseconds = +data.expiresIn * 1000;

      const expireTimestamp = new Date(
        actualDateInMilliseconds + expiresInFromSecondsToMilliseconds
      );

      const expireTimestampConvertedToString = expireTimestamp.toISOString();

      Authctx.loginHandler(data.idToken, expireTimestampConvertedToString);

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

  const containerClasses = `${classes.container} ${
    login ? classes.active : ""
  }`;

  return (
    <>
      {/* <Card>
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
      </Card> */}
      <section className={classes.section}>
        <div className={containerClasses}>
          <div className={`${classes.user} ${classes.signinBx}`}>
            <div className={classes.imgBx}>
              <img src={salmon} />
            </div>
            <div className={classes.formBx}>
              {error && <p>{error}</p>}
              <form>
                <h2>Sign In</h2>
                <input type="text" placeholder="UserName" ref={emailRef} />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
                {!isLoading && <button onClick={submitHandler}> Login </button>}
                {isLoading && <LoadingSpinner />}

                <p className={classes.signup}>
                  Don't have an account ?{" "}
                  <a onClick={switchSignInSignUpHandler}>Sign up</a>
                </p>
              </form>
            </div>
          </div>
          <div className={`${classes.user} ${classes.signupBx}`}>
            
            <div className={classes.formBx}>
              <form>
                <h2>Create an account</h2>
                <input
                  type="text"
                  name=""
                  placeholder="UserName"
                  ref={emailRef}
                />
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  ref={passwordRef}
                />
                {!isLoading && (
                  <button onClick={submitHandler}> SignUp </button>
                )}
                {isLoading && <LoadingSpinner />}

                <p className={classes.signup}>
                  Already have an account ?{" "}
                  <a onClick={switchSignInSignUpHandler}>Sign In</a>
                </p>
              </form>
            </div>
            <div className={classes.imgBx}>
              <img src={hamburger} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Authform;
