import React, { useState } from "react";

const authContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (idToken) => {},
  logout: () => {},
});

let DoneManuallyLogout;

const calculateRemainingExpirationTime = (expiresData) => {
  const actualDateToMilliSeconds = new Date().getTime();

  const expiresDataConvertedToMilliSeconds = new Date(expiresData).getTime();

  const remainingTimeToMilliSeconds =
    actualDateToMilliSeconds + expiresDataConvertedToMilliSeconds;

  return remainingTimeToMilliSeconds;
};

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const isLoggedIn = !!token;

  const loginHandler = (idToken, expiresData) => {
    setToken(idToken);
    localStorage.setItem("Token", idToken);
    localStorage.setItem("ExpirationDate", expiresData);

    const expirationTime = calculateRemainingExpirationTime(expiresData);

    DoneManuallyLogout = setTimeout(
      logoutHandler, expirationTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("ExpirationDate");
    if (DoneManuallyLogout) {
      clearTimeout(DoneManuallyLogout);
    }
  };

  const authContextValue = {
    token,
    isLoggedIn,
    loginHandler,
    logoutHandler,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
