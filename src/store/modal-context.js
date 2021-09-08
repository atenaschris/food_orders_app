
import React,{useState} from "react";

const ModalContext = React.createContext({
  isVisible: false,
  showCart: ()=>{},
  hideCart: ()=>{}
});



export const ModalContextProvider = (props) => {

    const[isVisible,setIsVisible] = useState(false);


    const showCartHandler = ()=>{
        setIsVisible(true);
    }

    const hideCartHandler = ()=>{
            setIsVisible(false);
    }

    const ModalContextValue = {
        isVisible,
        showCart: showCartHandler,
        hideCart: hideCartHandler
    }


  return <ModalContext.Provider value={ModalContextValue}>
      {props.children}
      </ModalContext.Provider>;
};

export default ModalContext;
