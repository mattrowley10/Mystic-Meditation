import { useLocation } from "react-router-dom";

export default function SingleMeditation() {
  const location = useLocation();
  const meditation = location.state;

  return (
    <div className="meditation">
      <h2 className="meditation-header">{meditation.title}</h2>
      <ul className="med-list">
        <li>{meditation.description}</li>
        <li>{meditation.duration}</li>
        <li>
          <audio controls preload="auto">
            <source src="/groundingMeditation.wav" type="audio/wav" />
          </audio>
        </li>
      </ul>
    </div>
  );
}
