import React, { useEffect, useReducer, useState } from "react";

const useForm = (validate) => {
  const [error, setError] = useState(undefined);

  const defaultInputstate = {
    value: "",
    isTouched: false,
    isValid: undefined,
  };

  const inputReducer = (state, action) => {
    if (action.type === "SET_INPUT") {
      return {
        value: action.val,
        isTouched: true,
        isValid: validate(action.val),
      };
    }
    if (action.type === "BLUR_INPUT") {
      return {
        value: state.value,
        isTouched: true,
        isValid: validate(state.value),
      };
    }

    return defaultInputstate;
  };
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    defaultInputstate
  );

  const { value, isTouched, isValid } = inputState;

  const changeInputValue = (event) => {
    dispatchInput({ type: "SET_INPUT", val: event.target.value });
  };

  const blurInputValue = () => {
    dispatchInput({ type: "BLUR_INPUT" });
  };

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  useEffect(() => {
    console.log("Running");
    console.log(value, isTouched, error);
    const timeout = setTimeout(() => {
      setError(!isValid && isTouched);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isValid, isTouched]);

  return {
    value,
    isValid,
    changeInputValue,
    blurInputValue,
    error,
    reset,
  };
};

export default useForm;
