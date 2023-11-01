import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { getUserData } from "../API/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchMe() {
      try {
        const userData = await getUserData();
        console.log(userData.user);
        setUser(userData.user);
      } catch (error) {
        console.error("Error Fetching Me");
        throw error;
      }
    }
    fetchMe();
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
