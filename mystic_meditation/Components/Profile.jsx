import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="profile">
      <h2 className="profile-header">Profile</h2>
      <div className="user-info">
        <ul className="user-info-list">
          <li>
            <h3 className="info">Your Information</h3>
          </li>
          <br></br>
          <li>
            <p className="info">Username: {user.username} </p>
          </li>
          <li>
            <p className="info">Email: {user.email}</p>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
