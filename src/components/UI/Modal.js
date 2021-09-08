import React, { useContext } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

import ModalContext, { ModalContextProvider } from "../../store/modal-context";

const Backdrop = (props) => {
  
  const Modalctx = useContext(ModalContext);

  const hideModalHandler = ()=>{
    Modalctx.hideCart();
  }

  return (
    <div className={classes.backdrop} onClick={hideModalHandler}></div>
  );
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(<Backdrop />, portalElement)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
