import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";
import Checkoutform from "./CheckoutForm";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import ModalContext from "../../store/modal-context";

const Cart = (props) => {
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const Modalctx = useContext(ModalContext);

  const addAmountToFoodHandler = (food) => {
    ctx.addItem({ ...food, amount: 1 });
  };

  const removeAmountToFoodHandler = (id) => {
    ctx.removeItem(id);
  };

  const { error, isLoading, sendRequest: fetchUserData } = useHttp();

  const checkOutOpenedHandler = () => {
    setCheckoutOpened(true);
  };

  const hideCartHandler = ()=>{
    Modalctx.hideCart();
  }

  const fetchUsersItemsHandler = (user) => {
    const applyData = (user) => {
      console.log(user);
    };
    fetchUserData(
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
            onClick={hideCartHandler}
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
          onClosingCheckoutForm={hideCartHandler}
        />
      )}
    </>
  );

  const isSubmittingModalContent = <div className="centered" ><LoadingSpinner/></div>;

  const didSubmitModalContent = (
    <>
      <p className={classes.success}>Succesfully sent the order!!!</p>
      <div className={classes.actions}>
        <button onClick={hideCartHandler}>Close</button>
      </div>
    </>
  );

  const didSubmitModalContentWithError = <p>{error}</p>;

  return (
    <Modal>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {!isLoading && didSubmit && !error && didSubmitModalContent}
      {!isLoading && didSubmit && error && didSubmitModalContentWithError}
    </Modal>
  );
};

export default Cart;
