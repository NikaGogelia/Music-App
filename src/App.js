import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "animate.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
