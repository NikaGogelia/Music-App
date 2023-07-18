import { createContext, useContext, useState } from "react";

const AlertBarContext = createContext();

function AlertBarContextProvider({ children }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenAlert = (type, open) => {
    setOpenAlert(true);
    switch (type) {
      case "liked":
        if (open === true) {
          setAlertMessage("Added To Your Liked Songs");
        } else {
          setAlertMessage("Removed From Your Liked Songs");
        }
        break;
      default:
        setAlertMessage("");
        break;
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setAlertMessage("");
  };

  return (
    <AlertBarContext.Provider
      value={{ openAlert, handleOpenAlert, handleCloseAlert, alertMessage }}
    >
      {children}
    </AlertBarContext.Provider>
  );
}

export default AlertBarContextProvider;
export const useAlertBarContext = () => {
  return useContext(AlertBarContext);
};
