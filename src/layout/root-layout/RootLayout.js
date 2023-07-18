import "./root-layout.css";
import { Outlet } from "react-router-dom";
import AlertBarContextProvider from "../../context/AlertBarContextProvider";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";
import AlertBar from "../../components/alert-bar/AlertBar";

function RootLayout() {
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
