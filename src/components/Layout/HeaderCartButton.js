import React, { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-content";

const HeaderCartbutton = (props) => {
  const ctx = useContext(CartContext);
  console.log(ctx.items);
  const totalAmountPerItem = ctx.items.reduce((t, n) => {
    return t + n.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalAmountPerItem}</span>
    </button>
  );
};

export default HeaderCartbutton;
