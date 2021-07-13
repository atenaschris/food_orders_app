import React,{useContext} from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";


const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: 'c1', name: "sushi", amount: 2, price: 12.99 }].map((food) => (
        <li>{food.name}</li>
      ))}
    </ul>
  );
  

  return (
    <Modal onHideCartHandler={props.onHideCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCartHandler}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
