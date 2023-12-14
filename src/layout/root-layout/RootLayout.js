import "./root-layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import AlertBarContextProvider from "../../context/AlertBarContextProvider";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";
import AlertBar from "../../components/alert-bar/AlertBar";
import { useEffect } from "react";
import { useRootContext } from "../../context/RootContextProvider";

function RootLayout() {
  const { accessTokenTimeout } = useRootContext();
  const navigate = useNavigate();

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
