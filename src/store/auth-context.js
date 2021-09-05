import React, { useEffect, useState } from "react";
import { useCallback } from "react";

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

const retrieveInitialTokenAndRemainingDurationIfValid = () => {
  const initialToken = localStorage.getItem("Token");
  const expirationToken = localStorage.getItem("ExpirationDate");

  const remainingDuration = calculateRemainingExpirationTime(expirationToken);

  if (remainingDuration <= 60000) {
    return null;
  }

  return {
    initialToken,
    remainingDuration,
  };
};

export const AuthContextProvider = (props) => {
  const initialTokenAndDuration =
    retrieveInitialTokenAndRemainingDurationIfValid();

  const { initialToken } = initialTokenAndDuration;

  const { remainingDuration } = initialTokenAndDuration;

  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const loginHandler = (idToken, expiresData) => {
    setToken(idToken);
    localStorage.setItem("Token", idToken);
    localStorage.setItem("ExpirationDate", expiresData);

    const expirationTime = calculateRemainingExpirationTime(expiresData);

    DoneManuallyLogout = setTimeout(logoutHandler, expirationTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("ExpirationDate");
    if (DoneManuallyLogout) {
      clearTimeout(DoneManuallyLogout);
    }
  }, []);

  useEffect(() => {
    if (initialTokenAndDuration) {
        console.log(remainingDuration);
      setTimeout(logoutHandler, remainingDuration);
    }
  }, [initialTokenAndDuration, logoutHandler]);

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
