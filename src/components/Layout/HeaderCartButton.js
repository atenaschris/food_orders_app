import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-content";

const HeaderCartbutton = (props) => {
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const totalAmountPerItem = items.reduce((t, n) => {
    return t + n.amount;
  }, 0);
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);

  const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ""}`;

  useEffect(() => {
    console.log('run');
    if (items.length === 0) {
      return;
    }

    setBtnIsAnimated(true);
    const timer = setTimeout(() => {
      console.log('setting the timer')
      setBtnIsAnimated(false);
    }, 300);
    return () => {
      console.log('clear function running');
      clearTimeout(timer);
    };
  }, [items]);
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalAmountPerItem}</span>
    </button>
  );
};

export default HeaderCartbutton;
