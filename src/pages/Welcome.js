import React, { useContext } from "react";

import Cart from "../components/Cart/Cart";
import Meals from "../components/Meals/Meals";
import ModalContext from "../store/modal-context";

const Welcome = () => {
  const Modalctx = useContext(ModalContext);

  const { isVisible } = Modalctx;

  return (
    <>
      {isVisible && <Cart />}
      <main>
        <Meals />
      </main>
    </>
  );
};

export default Welcome;
