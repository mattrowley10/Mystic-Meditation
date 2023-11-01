import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
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
        </ul>
      </div>
    </footer>
  );
}
