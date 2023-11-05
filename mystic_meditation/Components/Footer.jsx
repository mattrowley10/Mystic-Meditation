import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function Footer() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const navigateToProfile = () => {
    nav(`/profile`);
  };

  const renderHome = () => {
    if (location.pathname !== "/home") {
      return (
        <li className="footer-item">
          <a onClick={() => nav("/home")}>Home</a>
        </li>
      );
    }
    return null;
  };

  const handleLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <footer className="footer">
      <div className="footer-div">
        <ul className="footer-list">
          {renderHome()}
          <li className="footer-item">
            <a onClick={() => nav("/meditations")}>Meditations</a>
          </li>
          <li className="footer-item">
            <a onClick={navigateToProfile}>Profile</a>
          </li>
          <li className="footer-item">
            <a onClick={() => nav("/community")}>Community</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
