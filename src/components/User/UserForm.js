import React, { useContext, useRef } from "react";

import classes from "./UserForm.module.css";
import useHttp from "../../hooks/use-http";

import authContext from "../../store/auth-context";

import { useHistory } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";

const UserForm = () => {
  const passwordRef = useRef();

  const history = useHistory();

  const { isLoading, error, sendRequest: updatePassword } = useHttp();
  const Authctx = useContext(authContext);
  const { token } = Authctx;

  const transformData = () => {
    history.replace("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordRef.current.value;

    updatePassword(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: {
          idToken: token,
          password: enteredPassword,
          returnSecureToken: false,
        },
      },
      transformData
    );
  };
  return (
    <form onSubmit={submitHandler} className={classes["form-wrapper"]}>
        {error && <p>{error}</p>}
      <div className={classes.control}>
        <label>Change Password</label>
        <input ref={passwordRef} />
      </div>
        {!isLoading && <button>Change password</button> }
        {isLoading && <LoadingSpinner/>}
      
    </form>
  );
};

export default UserForm;
