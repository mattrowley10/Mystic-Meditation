import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../API/auth.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(username, password);
      if (token) {
        console.log("Login Successful");
        console.log(username);
        localStorage.setItem("token", token);
        nav("/home", { state: { username } });
      } else {
        console.log("login failed");
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
