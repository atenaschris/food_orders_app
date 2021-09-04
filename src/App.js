import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React, { useState } from "react";
import CartProvider from "./store/CartProvider";

import { Switch, Redirect, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

function App() {
  const [cartIsShown, setCardIsShown] = useState(false);
  const showCartHandler = () => {
    setCardIsShown(true);
  };
  const hideCartHandler = () => {
    setCardIsShown(false);
  };
  return (
    <Switch>
      <Route path="/" exact>
        <CartProvider>
          {cartIsShown && <Cart onHideCartHandler={hideCartHandler} />}
          <Header onShowCartHander={showCartHandler} />
          <main className="main">
            <Meals />
          </main>
        </CartProvider>
      </Route>

      <Route path="/auth">
        <AuthPage/>
      </Route>

      

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
