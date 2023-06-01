import "./root-layout.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";

function RootLayout() {
  const { ACCESS_TOKEN_KEY, setAccessToken } = useGlobalContext();

  // Set Access Token
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");

    if (token) {
      setAccessToken(token);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      window.location.hash = "";
    } else {
      const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, [ACCESS_TOKEN_KEY, setAccessToken]);

  return (
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
  );
}

export default RootLayout;
