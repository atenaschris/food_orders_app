import React, { useContext, useState } from "react";

import classes from "./UserForm.module.css";
import useHttp from "../../hooks/use-http";

import useForm from "../../hooks/use-form";

import authContext from "../../store/auth-context";

import { useHistory } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import Input from "../UI/Input";
import ErrorInput from "../UI/ErrorInput";
import Card from "../UI/Card";
import { Prompt } from "react-router";
import { Link } from "react-router-dom";

const UserForm = () => {
  const history = useHistory();
  const [formIsFocused, setFormIsFocused] = useState(false);

  const { isLoading, error, sendRequest: updatePassword } = useHttp();

  const passwordValidity = (value) => {
    const regularPasswordExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return value.trim() !== "" && value.match(regularPasswordExpression);
  };

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    error: passwordHasError,
    changeInputValue: changePasswordHandler,
    blurInputValue: blurPasswordHandler,
    reset: resetPasswordHandler,
  } = useForm((value) => passwordValidity(value));

  let formIsValid = false;
  if (passwordIsValid) {
    formIsValid = true;
  }

  const Authctx = useContext(authContext);
  const { token } = Authctx;

  const transformData = () => {
    history.replace("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    updatePassword(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB4ovC7nu-9NHOfvil6ZXaxWwqzBMYLDWk",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: {
          idToken: token,
          password: passwordValue,
          returnSecureToken: false,
        },
      },
      transformData
    );

    resetPasswordHandler();
  };

  const focusFormHandler = () => {
    setFormIsFocused(true);
  };

  const finishEnteringForm = () => {
    setFormIsFocused(false);
  };

  const passwordErrorMessage =
    "the password field should not be empty and should have at least one number, one special char, one lower case and uppercase char  and the number of chars should be between 6 and 16";
  return (
    <Card>
      <Prompt
        when={formIsFocused}
        message="Are you sure you want to leave the page?? All the data will be lost!!!"
      />

      <form
        onFocus={focusFormHandler}
        onSubmit={submitHandler}
        className={classes["form-wrapper"]}
      >
        {error && <p className={classes.error}>{error}</p>}
        <Input
          label="Password"
          className={classes.control}
          isValid={passwordHasError}
          input={{
            id: `Password_${Math.random().toString()}`,
            type: "text",
            value: passwordValue,
            onChange: changePasswordHandler,
            onBlur: blurPasswordHandler,
          }}
        />
        {passwordHasError && <ErrorInput message={passwordErrorMessage} />}
        {!isLoading && (
          <button onClick={finishEnteringForm} disabled={!formIsValid}>
            Change password
          </button>
        )}
        {isLoading && <LoadingSpinner />}
      </form>
    </Card>
  );
};

export default UserForm;
