import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  const [auth, setAuth] = useLocalStorage("auth", {
    isAuthenticated: true,
    userName: "",
  });

  const setAuthenticated = (name) => {
    setAuth({
      isAuthenticated: true,
      userName: name,
    });
  };

  const setLoggedOut = () => {
    setAuth({
      isAuthenticated: false,
      userName: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuthenticated,
        setLoggedOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
