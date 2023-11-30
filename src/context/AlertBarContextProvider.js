import { createContext, useContext, useState } from "react";

const AlertBarContext = createContext();

function AlertBarContextProvider({ children }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenAlert = (type, liked) => {
    setOpenAlert(true);
    switch (type) {
      case "liked-track":
        if (liked === true) {
          setAlertMessage("Added To Your Liked Songs");
        } else {
          setAlertMessage("Removed From Your Liked Songs");
        }
        break;
      case "liked-album":
      case "liked-playlist":
        if (liked === true) {
          setAlertMessage("Saved To Your Library");
        } else {
          setAlertMessage("Removed From Your Library");
        }
        break;
      case "delete-owner-playlist":
        setAlertMessage("Playlist Deleted");
        break;
      default:
        setAlertMessage("No Data");
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
