import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const authContext = createContext({
  user: null,
  loading: false,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const value = {
    user,
    loading,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
