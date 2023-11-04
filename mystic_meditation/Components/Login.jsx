import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getToken } from "../API/auth.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
          localStorage.setItem("token", token);
          console.log("Login Successful");
          nav("/home", { state: { username } });
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

  return (
    <div className="login">
      <h2 className="login-header">Login</h2>
      <form>
        <div className="login-input">
          <label>Username: </label>
          <input
            placeholder="username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
          />
        </div>
        <br></br>
        <div className="login-input">
          <label>Password:</label>
          <input
            placeholder="password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}
