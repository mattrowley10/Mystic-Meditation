import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (response.status === 200) {
        console.log("registration successful");
        nav("/home");
      } else {
        console.log("registration failed");
      }
    } catch (error) {
      console.error("Error During Registration", error);
    }
  };

  return (
    <div className="register">
      <h2 className="register-header">Register</h2>
      <form>
        <div className="register-input">
          <label>Email:</label>
          <input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-input">
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
        <div className="register-input">
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
        <button className="register-button" onClick={handleRegister}>
          Submit
        </button>
      </form>
    </div>
  );
}
