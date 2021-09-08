import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React, { useState, useContext } from "react";
import CartProvider from "./store/CartProvider";

import { Switch, Redirect, Route } from "react-router-dom";

import authContext from "./store/auth-context";

import AuthPage from "./pages/AuthPage";
import UserProfile from "./pages/UserProfile";

function App() {
  const [cartIsShown, setCardIsShown] = useState(false);
  const Authctx = useContext(authContext);

  const { isLoggedIn } = Authctx;
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
          <main>
            <Meals />
          </main>
        </CartProvider>
      </Route>

      <Route path="/auth">
        <AuthPage />
      </Route>

      <Route path="/profile">
        {isLoggedIn && <UserProfile />}
        {!isLoggedIn && <Redirect to="/auth" />}
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
