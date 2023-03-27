import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "animate.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import ContextProvider from "./context/ContextProvider";
import { useEffect, useState } from "react";
import Loader from "./components/loader/Loader";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoader(false), 2000);
  }, []);

  if (loader)
    return (
      <div className="loader-container d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
