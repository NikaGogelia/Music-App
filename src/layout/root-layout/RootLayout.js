import "./root-layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/player/Player";

function RootLayout() {
  return (
    <div className="root-layout animate__fadeIn">
      <main className="d-flex">
        <aside>
          <Navbar />
        </aside>
        <Outlet />
      </main>
      <footer>
        <Player />
      </footer>
    </div>
  );
}

export default RootLayout;
