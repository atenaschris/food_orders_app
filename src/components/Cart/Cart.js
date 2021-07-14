import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const addAmountToFoodHandler = food =>{
    
  }
  const removeAmountToFoodHandler = id =>{

  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((food) => (
       <CartItem
       key={food.id}
       name={food.name}
       price={food.price}
       amount={food.amount}
       onAdd={addAmountToFoodHandler.bind(null,food)}
       onRemove={removeAmountToFoodHandler.bind(null,food.id)}
       />
      ))}
    </ul>
  );

  return (
    <Modal onHideCartHandler={props.onHideCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onHideCartHandler}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button> }
        
      </div>
    </Modal>
  );
};

export default Cart;
