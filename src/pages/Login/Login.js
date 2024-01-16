import "./login.css";
import { useRootContext } from "../../context/RootContextProvider";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { handleAuth, setAuthCode, setAccessToken } = useRootContext();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.removeItem("countdown");
      sessionStorage.removeItem("auth-code");
      setAuthCode("");
      sessionStorage.removeItem("access-token-key");
      setAccessToken("");
    }
  }, [location.pathname, setAccessToken, setAuthCode]);

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
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
        <div className="login-info d-flex flex-column justify-content-center align-items-center">
          <h2>Feel The Beat</h2>
          <h2>Energize Your Day With Our App</h2>
          <img src="/assets/icons/brand-logo.svg" alt="brand-logo" />
          <h1>Music App</h1>
        </div>
        <button onClick={handleAuth} className="login-button button">
          Start Listening
        </button>
      </div>
    </div>
  );
}

export default Login;
