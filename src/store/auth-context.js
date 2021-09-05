import React, { useEffect, useState } from "react";
import { useCallback } from "react";

const authContext = React.createContext({
  token: "",
  isLoggedIn: false,
  loginHandler: (idToken) => {},
  logoutHandler: () => {},
});

let DoneManuallyLogout;

const calculateRemainingExpirationTime = (expiresData) => {
  console.log(expiresData);
  const actualDateToMilliSeconds = new Date().getTime();

  const expiresDataConvertedToMilliSeconds = new Date(expiresData).getTime();

  console.log(expiresDataConvertedToMilliSeconds);

  const remainingTimeToMilliSeconds =
    expiresDataConvertedToMilliSeconds - actualDateToMilliSeconds;

  return remainingTimeToMilliSeconds;
};

const retrieveInitialTokenAndRemainingDurationIfValid = () => {
  const initialToken = localStorage.getItem("Token");
  const expirationToken = localStorage.getItem("ExpirationDate");

  console.log(expirationToken);

  const remainingDuration = calculateRemainingExpirationTime(expirationToken);

  console.log(remainingDuration);

  if (remainingDuration <= 60000) {
    localStorage.removeItem("Token");
    localStorage.removeItem("ExpirationDate");
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
  let initialToken;
  if (initialTokenAndDuration) {
    initialToken = initialTokenAndDuration.initialToken;
  }

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
    console.log(initialTokenAndDuration);
    if (initialTokenAndDuration) {
      console.log("heyy");
      DoneManuallyLogout = setTimeout(
        logoutHandler,
        initialTokenAndDuration.remainingDuration
      );
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
