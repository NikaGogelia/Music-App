import "./root-layout.css";
import { useEffect, useState } from "react";
import { useRootContext } from "../../context/RootContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import AlertBarContextProvider from "../../context/AlertBarContextProvider";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";
import AlertBar from "../../components/alert-bar/AlertBar";

function RootLayout() {
  const [accessTokenTimeout, setAccessTokenTimeout] = useState(
    sessionStorage.getItem("access-token-timeout") === null ||
      sessionStorage.getItem("access-token-timeout") === undefined
      ? ""
      : sessionStorage.getItem("access-token-timeout")
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
        sessionStorage.setItem("access-token-timeout", res.expires_in);
        setAccessToken(res.access_token);
        setAccessTokenTimeout(res.expires_in.toString());
      });
    }
  }, [getSpotifyAccessToken, setAccessToken, setAuthCode]);

  useEffect(() => {
    if (accessTokenTimeout.length > 0) {
      const timeout = parseInt(accessTokenTimeout) * 1000;
      setTimeout(() => navigate("/"), timeout);
    }
  }, [navigate, accessTokenTimeout]);

  return (
    <AlertBarContextProvider>
      <div className="root-layout animate__fadeIn d-flex flex-column">
        <main className="d-inline-flex">
          <aside>
            <Navbar />
          </aside>
          <Outlet />
        </main>
        <footer className="d-inline-flex">
          <Player />
        </footer>
      </div>
      <AlertBar />
    </AlertBarContextProvider>
  );
}

export default RootLayout;
