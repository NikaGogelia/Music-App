import "./introduction.css";
import { useGlobalContext } from "../../context/GlobalContext";

function Introduction() {
  const { handleAuth } = useGlobalContext();

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
          <h2>Feel The Beat</h2>
          <h2>Energize Your Day With Our App</h2>
          <img src="/assets/icons/brand-logo.svg" alt="brand-logo" />
          <h1>Music App</h1>
        </div>
        <button onClick={handleAuth} className="introduction-button button">
          Start Listening
        </button>
      </div>
    </div>
  );
}

export default Introduction;
