import CartContext from "./cart-content";
import React, { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (food) => food.id === action.item.id
    );
    console.log(existingCartItemIndex);

    const existingCartItem = state.items[existingCartItemIndex];

    console.log(existingCartItem);

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    console.log(updatedItems);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const FoodToRemoveIndex = state.items.findIndex(
      (food) => food.id === action.id
    );
    console.log(FoodToRemoveIndex);
    const FoodToRemove = state.items[FoodToRemoveIndex];
    console.log(FoodToRemove);
    const UpdatedFoodToRemove = {
      ...FoodToRemove,
      amount: FoodToRemove.amount - 1,
    };
    console.log(UpdatedFoodToRemove);
    const updatedItems = [...state.items];
    console.log(updatedItems);
    updatedItems[FoodToRemoveIndex] = UpdatedFoodToRemove;
    console.log(updatedItems);
    const totalAmount = state.totalAmount - UpdatedFoodToRemove.price;
    if (UpdatedFoodToRemove.amount <= 0) {
      const filteredItems = updatedItems.filter(
        (food) => food.id !== UpdatedFoodToRemove.id
      );
      console.log(filteredItems);

      return {
        items: filteredItems,
        totalAmount: totalAmount,
      };
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const CartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={CartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
