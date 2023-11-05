import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
// import { useState, useEffect } from "react";
export default function Home() {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="home-h">
        <h2 className="home-header">Mystic Meditation</h2>
      </div>
      <div className="welcome-home">Welcome, {user.username}</div>
      <div className="lastMed">
        <ul className="lastMedList">
          <li>
            <h3 className="lastMedHeader">
              <strong>Last Meditation</strong>
            </h3>
          </li>
          <li>
            <p>Date</p>
          </li>
          <li>
            <p>Title</p>
          </li>
          <li>
            <p>Duration</p>
          </li>
          <li>
            <p>Rating</p>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
