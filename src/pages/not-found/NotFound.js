import "./not-found.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-not-found">
      <h1>Page Not Found</h1>
      <Link to="/player/home">Go to home page</Link>
    </div>
  );
}

export default NotFound;
