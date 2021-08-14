import React, { useEffect } from "react";

import Input from "../UI/Input";

import useForm from "../../hooks/use-form";

import Card from "../UI/Card";

import classes from "./CheckoutForm.module.css";
import ErrorInput from "../UI/ErrorInput";

const Checkoutform = (props) => {

  const isNotEmptyAndLessThan30Carachters = (value) => {
    return value.trim() !== "" && value.trim().length < 30;
  };

  const postalCodeIsNotGreaterThan5Digits = (value) => {
    return value.trim() !== "" && value.trim().length === 5;
  };

  const {
    value: nameValue,
    isValid: nameisValid,
    changeInputValue: changeNameValue,
    blurInputValue: blurNameValue,
    error: nameHasError,
    reset: resetName,
  } = useForm((value) => isNotEmptyAndLessThan30Carachters(value));

  const {
    value: streetValue,
    isValid: streetisValid,
    changeInputValue: changeStreetValue,
    blurInputValue: blurStreetValue,
    error: streetHasError,
    reset: resetStreet,
  } = useForm((value) => isNotEmptyAndLessThan30Carachters(value));

  const {
    value: postalCodeValue,
    isValid: postalCodeisValid,
    changeInputValue: changePostalCodeValue,
    blurInputValue: blurPostalCodeValue,
    error: postalCodeHasError,
    reset: resetPostalCode,
  } = useForm((value) => postalCodeIsNotGreaterThan5Digits(value));
  const {
    value: cityCodeValue,
    isValid: cityCodeisValid,
    changeInputValue: changeCityCodeValue,
    blurInputValue: blurCityCodeValue,
    error: cityCodeHasError,
    reset: resetCityCode,
  } = useForm((value) => isNotEmptyAndLessThan30Carachters(value));

  let formIsValid = false;

  if (nameisValid && streetisValid && postalCodeisValid && cityCodeisValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    props.onAddUserData({
      name: nameValue,
      street: streetValue,
      postalcode: postalCodeValue,
      citycode: cityCodeValue,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCityCode();
    
  };

  const errorMessage =
    "Please neter a valid value( non-empty and < than 30 carachters)";
  const postalCodeErrorMessage =
    "Please neter a valid value ( non-empty and the number of digits should be at least 5 )";

  return (
    <Card className={classes["checkout-form"]}>
      <form onSubmit={submitHandler}>
        <Input
          className={classes.input}
          label="Name"
          isValid={nameHasError}
          input={{
            id: `Name_${Math.random().toString()}`,
            type: "text",
            value: nameValue,
            onChange: changeNameValue,
            onBlur: blurNameValue,
          }}
        />

        {nameHasError && <ErrorInput message={errorMessage} />}

        <Input
          className={classes.input}
          label="Street"
          isValid={streetHasError}
          input={{
            id: `Street_${Math.random().toString()}`,
            type: "text",
            value: streetValue,
            onChange: changeStreetValue,
            onBlur: blurStreetValue,
          }}
        />

        {streetHasError && <ErrorInput message={errorMessage} />}

        <Input
          className={classes.input}
          label="Postal Code"
          isValid={postalCodeHasError}
          input={{
            id: `Postalcode_${Math.random().toString()}`,
            type: "text",
            value: postalCodeValue,
            onChange: changePostalCodeValue,
            onBlur: blurPostalCodeValue,
          }}
        />

        {postalCodeHasError && <ErrorInput message={postalCodeErrorMessage} />}

        <Input
          className={classes.input}
          label="City Code"
          isValid={cityCodeHasError}
          input={{
            id: `City_${Math.random().toString()}`,
            type: "text",
            value: cityCodeValue,
            onChange: changeCityCodeValue,
            onBlur: blurCityCodeValue,
          }}
        />

        {cityCodeHasError && <ErrorInput message={errorMessage} />}
        <div className={classes["checkout-buttons"]}>
          <button className={classes["button-send"]} disabled={!formIsValid}>
            {props.error ? "Try again" : "Send Data"}
          </button>
          <button
            onClick={props.onClosingCheckoutForm}
            className={classes.button}
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Checkoutform;
