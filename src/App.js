import "./App.css";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React,{useState} from "react";

function App() {
  const[cartIsShown,setCardIsShown]= useState(false);

  const showCartHandler = ()=>{
    setCardIsShown(true);
  }

  const hideCartHandler = ()=>{
    setCardIsShown(false);
  }
  return (
    <>
      {cartIsShown && <Cart onHideCartHandler={hideCartHandler} /> }
      <Header onShowCartHander={showCartHandler} />
      <main>
        <Meals></Meals>
      </main>
    </>
  );
}

export default App;
