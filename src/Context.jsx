import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [value, setValue] = useState(0)
  return (
    <Context.Provider
      value={{value,setValue}}>
      {children}
    </Context.Provider>
  );
};

export default Context;
