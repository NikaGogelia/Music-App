import "./playlist.css";
import { useLocation } from "react-router-dom";

function Playlist() {
  const params = useLocation();
  const { data, content } = params?.state;
  const {name} = data;
  console.log(data);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default Playlist;
