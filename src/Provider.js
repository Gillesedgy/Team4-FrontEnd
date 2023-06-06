import { useContext, createContext, useState, useEffect } from "react";

export const ContextData = createContext();
export function useContextProvider() {
  return useContext(ContextData);
}

function Provider({ children }) {
  // A piece of state that will be passed to other files
  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    address: "",
    native_language: "",
  });
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem('user_info'))
      setUser(user);
    } else {
      setUser({
        id: null,
        username: "",
        email: "",
        password: "",
        address: "",
        native_language: "",
      });
    }
  }, []);

  return (
    <ContextData.Provider value={{ user, setUser }}>
      {children}
    </ContextData.Provider>
  );
}

export default Provider;
