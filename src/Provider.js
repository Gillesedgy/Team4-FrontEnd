import { useContext, createContext, useState } from "react";

export const ContextData = createContext();
export function useContextProvider() {
  return useContext(ContextData);
}

function Provider({ children }) {
  // A piece of state that will be passed to other files
  return <ContextData.Provider value={{}}>{children}</ContextData.Provider>;
}

export default Provider;
