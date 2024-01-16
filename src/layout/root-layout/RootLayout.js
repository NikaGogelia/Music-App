import "./root-layout.css";
import { useEffect, useState } from "react";
import { useRootContext } from "../../context/RootContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import AlertBarContextProvider from "../../context/AlertBarContextProvider";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";
import AlertBar from "../../components/alert-bar/AlertBar";

function RootLayout() {
  const [countDown, setCountdown] = useState(
    sessionStorage.getItem("countdown") === null ||
      sessionStorage.getItem("countdown") === undefined
      ? null
      : parseInt(sessionStorage.getItem("countdown"))
  );

  const { getSpotifyAccessToken, setAuthCode, setAccessToken } =
    useRootContext();
  const navigate = useNavigate();

  // GET Auth Code And Access Token
  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const code = urlObj.searchParams.get("code");
    sessionStorage.setItem("auth-code", code);
    setAuthCode(code);
    if (code?.length > 0) {
      getSpotifyAccessToken().then((res) => {
        sessionStorage.setItem("access-token-key", res.access_token);
        sessionStorage.setItem("countdown", res.expires_in.toString());
        setAccessToken(res.access_token);
        setCountdown(parseInt(res.expires_in));
      });
    }
  }, [getSpotifyAccessToken, setAccessToken, setAuthCode]);

  // Count Down Before Log Out
  useEffect(() => {
    const timer = setInterval(() => {
      sessionStorage.setItem("countdown", countDown - 1);
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countDown === 0) {
      clearInterval(timer);
      sessionStorage.removeItem("countdown");
      setCountdown(null);
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [navigate, countDown]);

  return (
    <AlertBarContextProvider>
      <div className="root-layout animate__fadeIn d-flex flex-column">
        <main className="d-inline-flex">
          <aside>
            <Navbar />
          </aside>
          <Outlet />
        </main>
        {/* <footer className="d-inline-flex">
          <Player />
        </footer> */}
      </div>
      <AlertBar />
    </AlertBarContextProvider>
  );
}

export default RootLayout;
