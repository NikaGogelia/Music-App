import "./not-found.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-not-found d-flex flex-column justify-content-center align-items-center">
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
        <div className="page-not-found-info d-flex flex-column justify-content-center align-items-center">
          <img src="/assets/icons/brand-logo.svg" alt="brand-logo" />
          <h1>404 Page Not Found</h1>
        </div>
        <Link to="/player/home" className="page-not-found-button button">
          Return To Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
