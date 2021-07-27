import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";
import Checkoutform from "./CheckoutForm";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  /* const [isSubmitting, setIsSubmitting] = useState(false); */
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const addAmountToFoodHandler = (food) => {
    ctx.addItem({ ...food, amount: 1 });
  };
  const removeAmountToFoodHandler = (id) => {
    ctx.removeItem(id);
  };

  const { error, isLoading, sendRequest: fetchData } = useHttp();

  const checkOutOpenedHandler = () => {
    setCheckoutOpened(true);
  };

  const fetchUsersItemsHandler = async (user) => {
    /* setIsSubmitting(true); */
    const applyData = (user) => {
      console.log(user);
    };
    fetchData(
      {
        url: "https://http-food-orders-app-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: user,
          meals: ctx.items,
        },
      },
      applyData
    );

   /*  setIsSubmitting(false); */
    setDidSubmit(true);
    ctx.clear();
  };

  let cartItems = (
    <p className={classes["alert-message"]}>Please select at least one food</p>
  );

  if (hasItems) {
    cartItems = (
      <>
        <ul className={classes["cart-items"]}>
          {ctx.items.map((food) => (
            <CartItem
              key={food.id}
              name={food.name}
              price={food.price}
              amount={food.amount}
              onAdd={addAmountToFoodHandler.bind(null, food)}
              onRemove={removeAmountToFoodHandler.bind(null, food.id)}
            />
          ))}
        </ul>

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </>
    );
  }

  const cartModalContent = (
    <>
      {cartItems}

      {!checkoutOpened && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onHideCartHandler}
          >
            Close
          </button>
          {hasItems && (
            <>
              <button
                onClick={checkOutOpenedHandler}
                className={classes.button}
              >
                Order
              </button>
            </>
          )}
        </div>
      )}
      {checkoutOpened && (
        <Checkoutform
          error={error}
          onAddUserData={fetchUsersItemsHandler}
          onClosingCheckoutForm={props.onHideCartHandler}
        />
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent =<>
  <p>Succesfully sent the order!!!</p>
  <div  className={classes.actions}>
  <button onClick={props.onHideCartHandler} >Close</button>
  </div>
 
   </> 

  return <Modal onHideCartHandler={props.onHideCartHandler}>
    {!isLoading && !didSubmit && cartModalContent}
    {isLoading && isSubmittingModalContent}
    { !isLoading && didSubmit && didSubmitModalContent }
  </Modal>;
};

export default Cart;
