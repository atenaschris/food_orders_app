import React, { useEffect, useReducer, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountError, setAmounterror] = useState(false);

  const defaultAmountState = {
    amount: 0,
    error: undefined,
    isTouched: undefined,
  };

  const amountReducer = (state, action) => {
    if (action.type === "SET_AMOUNT") {
      return {
        amount: action.val,
        error:
          action.val.trim() === "" ||
          +action.val.trim() <= 0 ||
          +action.val.trim() > 5,
        isTouched: true,
      };
    }

    if (action.type === "BLUR_AMOUNT") {
      return {
        amount: state.amount,
        error:
          state.amount.trim() === "" ||
          +state.amount <= 0 ||
          state.amount.trim() > 5,
        isTouched: true,
      };
    }

    return defaultAmountState;
  };

  const [amountState, dispatchAmountState] = useReducer(
    amountReducer,
    defaultAmountState
  );

  const { amount, error, isTouched } = amountState;

  let formIsValid = false;
  if (!error && amount !== 0) {
    formIsValid = true;
  }

  

  const changeAmountHandler = (event) => {
    dispatchAmountState({ type: "SET_AMOUNT", val: event.target.value });
  };

  const blurAmountHandler = () => {
    dispatchAmountState({ type: "BLUR_AMOUNT" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddToCart(+amount);
  };

  useEffect(() => {
    console.log("running");
    const timeout = setTimeout(() => {
      setAmounterror(error && isTouched);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [error, isTouched]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
      className = {classes.input}
      isValid = {amountError}
        label="Amount"
        input={{
          value: amount,
          id: "amount_" + props.id,
          type: "number",
          onChange: changeAmountHandler,
          onBlur: blurAmountHandler,
          min:0,
        }}
      />

      {amountError && (
        <div>
          <p className={classes.error}>Please enter a value between 1 and 5</p>
        </div>
      )}

      <button disabled={!formIsValid}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
