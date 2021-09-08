import React from "react";
import Header from "../components/Layout/Header";
import { ModalContextProvider } from "../store/modal-context";
import CartProvider from "../store/CartProvider";

const Layout = (props) => {
  return (
    <>
      <CartProvider>
        <ModalContextProvider>
          <Header />
          <main>{props.children}</main>
        </ModalContextProvider>
      </CartProvider>
    </>
  );
};

export default Layout;
