import React, { useState, useCallback, useContext } from "react";
import salmon from "../../images/salmon.jpg";
import hamburger from "../../images/hamburger.jpg";

import classes from "./AuthForm.module.css";

import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

import { useHistory } from "react-router";

import authContext from "../../store/auth-context";
import useForm from "../../hooks/use-form";
import ErrorInput from "../UI/ErrorInput";
import Input from "../UI/Input";

const Authform = () => {
  const [login, setLogin] = useState(false);

  const Authctx = useContext(authContext);

  const { isLoading, error, sendRequest: authenticateUser } = useHttp();

  const EmailIsValid = (value) => {
    return value.trim() !== "" && value.trim().includes("@");
  };

  const PasswordIsValid = (value) => {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return value.trim() !== "" && value.match(regularExpression);
    /*  return value.trim() !== '' && value.trim().length < 30; */
  };

  const {
    value: emailValue,
    isValid: emailIsValid,
    error: emailHasError,
    changeInputValue: changeEmailInputHandler,
    blurInputValue: blurEmailInputHandler,
    reset: resetEmailValue,
  } = useForm((value) => EmailIsValid(value));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    error: passwordHasError,
    changeInputValue: changePasswordInputHandler,
    blurInputValue: blurPasswordInputHandler,
    reset: resetPasswordValue,
  } = useForm((value) => PasswordIsValid(value));

  const history = useHistory();

  let formIsValid = false;

  const switchSignInSignUpHandler = () => {
    setLogin((prevState) => !prevState);
    resetEmailValue();
    resetPasswordValue();

    if (formIsValid) {
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

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
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true,
        },
      },
      transformData
    );

    resetEmailValue();
    resetPasswordValue();
  };

  const containerClasses = `${classes.container} ${
    login ? classes.active : ""
  }`;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const emailInputErrorMessage =
    "the email field should not be empty and should contain at least the @ symbhol";

  const passwordInputErrorMessage =
    "the password field should not be empty and should have at least one number, one special char, one lower case and uppercase char  and the number of chars should be between 6 and 16";

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

                {/*  <input
                  type="text"
                   value={emailValue}
                  onChange={changeEmailInputHandler}
                  onBlur={blurEmailInputHandler}
                /> */}
                <Input
                  label="Email"
                  isValid={emailHasError}
                  input={{
                    id: `Email_${Math.random().toString()}`,
                    value: emailValue,
                    type: "text",
                    onChange: changeEmailInputHandler,
                    onBlur: blurEmailInputHandler,
                  }}
                />

                {emailHasError && (
                  <ErrorInput message={emailInputErrorMessage} />
                )}

                {/* <input
                  type="password"
                  value={passwordValue}
                  onChange={changePasswordInputHandler}
                  onBlur={blurPasswordInputHandler}
                /> */}
                <Input
                  label="Password"
                  isValid={passwordIsValid}
                  input={{
                    id: `Password_${Math.random().toString()}`,
                    value: passwordValue,
                    type: "text",
                    onChange: changePasswordInputHandler,
                    onBlur: blurPasswordInputHandler,
                  }}
                />

                {passwordHasError && (
                  <ErrorInput message={passwordInputErrorMessage} />
                )}
                {!isLoading && (
                  <button onClick={submitHandler} disabled={!formIsValid}>
                    {" "}
                    Login{" "}
                  </button>
                )}
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
                <Input
                  label="Email"
                  isValid={emailHasError}
                  input={{
                    id: `Email_${Math.random().toString()}`,
                    value: emailValue,
                    type: "text",
                    onChange: changeEmailInputHandler,
                    onBlur: blurEmailInputHandler,
                  }}
                />

                {emailHasError && (
                  <ErrorInput message={emailInputErrorMessage} />
                )}
                <Input
                  label="Password"
                  isValid={passwordIsValid}
                  input={{
                    id: `Password_${Math.random().toString()}`,
                    value: passwordValue,
                    type: "text",
                    onChange: changePasswordInputHandler,
                    onBlur: blurPasswordInputHandler,
                  }}
                />

                {passwordHasError && (
                  <ErrorInput message={passwordInputErrorMessage} />
                )}
                {!isLoading && (
                  <button onClick={submitHandler} disabled={!formIsValid}>
                    {" "}
                    SignUp{" "}
                  </button>
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
