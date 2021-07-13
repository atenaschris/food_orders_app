import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountRef = useRef();
  const [amountError, setAmounterror] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmounterror(true);
      return;
    }
    setAmounterror(false);
    props.onAddToCart(enteredAmountNumber);
  };



  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "0",
          max: "7",
          step: "1",
          defaultValue: "0",
        }}
      />
      <button>+ Add</button>
      {amountError && <p>Please enter a value between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
