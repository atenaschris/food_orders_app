import "./App.css";
import Header from "./components/Layout/Header";

import React, { useState, useContext } from "react";

import { Switch, Redirect, Route } from "react-router-dom";

import authContext from "./store/auth-context";

import AuthPage from "./pages/AuthPage";
import UserProfile from "./pages/UserProfile";
import Welcome from "./pages/Welcome";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";

function App() {
  const Authctx = useContext(authContext);

  const { isLoggedIn } = Authctx;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>

        <Route path="/auth">
          <AuthPage />
        </Route>

        <Route path="/profile">
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
