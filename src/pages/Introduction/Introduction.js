import "./introduction.css";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="introduction d-flex flex-column justify-content-center align-items-center">
      <div className="animate__fadeIn d-flex flex-column justify-content-center align-items-center">
        <img
          className="shape"
          src="/assets/icons/abstract.svg"
          alt="abstract-shape"
        />
        <img
          className="shape"
          src="/assets/icons/abstract.svg"
          alt="abstract-shape"
        />
        <img
          className="liquid-shape"
          src="/assets/icons/liquid.svg"
          alt="liquid-shape"
        />
        <div className="introduction-info d-flex flex-column justify-content-center align-items-center">
          <h2>
            Enjoy Your <strong>Music</strong>
          </h2>
          <h2>
            Enjoy Your <strong>Life</strong>
          </h2>
          <img src="/assets/icons/brand-logo.svg" alt="brand-logo" />
          <h1>Music App</h1>
        </div>
        <Link className="introduction-button button" to="/player/home">
          Start Listening
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
