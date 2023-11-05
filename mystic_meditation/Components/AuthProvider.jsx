import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { getUserData } from "../API/auth";

// import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const login = async ({ username, password }) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (token) {
          const userData = await getUserData(token);
          localStorage.setItem("token", token);
          setUser(userData);
          setUsername(userData.username);
          setEmail(userData.email);
          setLoggedIn(true);
          console.log("Login Successful");
        } else {
          console.log("Login failed");
        }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token", token);
    const response = await fetch("api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setUser({});
    setLoggedIn(false);

    console.log("Logout Successful");

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        email,
        loggedIn,
        setLoggedIn,
        setToken,
        setUser,
        setUsername,
        setEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
