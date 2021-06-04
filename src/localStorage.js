import { useState } from "react";

// useLocalStorage is advanced useState. 
// It is for save user's chat data to own localStorage, 
// so server doesn't need to keep it. It's fast and simple

// give key of data, and it's initial value
export const useLocalStorage = (key, initialValue) => {
  // can give callback for initial value of state 
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get previous storedValue from local storage by key
      const item = localStorage.getItem(key);
      // if item exists, then parse it
      return item ? JSON.parse(item) : initialValue; 
    }
    catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // save state
      setStoredValue(value);
      // save localstorage, only can save string
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue]; // return prev stored value, setValue method
}