import { useNavigate } from "react-router-dom";

export default function LaunchPage() {
  const nav = useNavigate();

  return (
    <div className="launch">
      <h2 className="launch-header">Mystic Meditation</h2>
      <button className="launch-button" onClick={() => nav("/login")}>
        Login
      </button>
      <button
        className="launch-button"
        onClick={() => {
          nav("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}
