import { useContext, createContext, useState } from "react";

export const ContextData = createContext();
export function useContextProvider() {
  return useContext(ContextData);
}

function Provider({ children }) {
  // A piece of state that will be passed to other files

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    native_language: "",
  });
  return (
    <ContextData.Provider value={{ user, setUser }}>
      {children}
    </ContextData.Provider>
  );
}

export default Provider;
