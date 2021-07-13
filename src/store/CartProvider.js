import CartContext from "./cart-content";

const CartProvider = (props) => {

  const addItemToCartHandler = ()=>{
    console.log('heyyy');
  }

  const removeItemFromCartHandler = ()=>{
    console.log('holaaaaa');
  }
    
  const CartContextValue = {
    items: [],
    totalAmount: 0,
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
