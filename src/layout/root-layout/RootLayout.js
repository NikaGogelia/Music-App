import "./root-layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";

function RootLayout() {
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
