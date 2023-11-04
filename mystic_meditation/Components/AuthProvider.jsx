import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { getUserData } from "../API/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchMe() {
      if (token) {
        try {
          const userData = await getUserData(token);
          console.log(userData.user);
          setUser(userData.user);
          setLoggedIn(true);
        } catch (error) {
          setLoggedIn(false);
        }
      }
    }
    fetchMe();
  }, [loggedIn, setUser, token]);
  return (
    <AuthContext.Provider value={{ user, loggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
