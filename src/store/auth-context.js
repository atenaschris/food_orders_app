import React,{useState} from 'react';

const authContext = React.createContext({
    token:'',
    isLoggedIn : false,
    login : idToken =>{},
    logout : ()=>{}
});



export const AuthContextProvider = props =>{

    const [token,setToken] = useState(null);

    const isLoggedIn = !!token;

    const loginHandler = (idToken) =>{
        setToken(idToken);

    }

    const logoutHandler = ()=>{
        setToken(null);
    }


     const authContextValue = {
        token,
        isLoggedIn,
        loginHandler,
        logoutHandler

    }

   return <authContext.Provider value={authContextValue}>

        {props.children}

   </authContext.Provider>




  

};



export default authContext;