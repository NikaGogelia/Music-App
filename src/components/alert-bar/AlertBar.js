import "./alert-bar.css";
import { useAlertBarContext } from "../../context/AlertBarContextProvider";
import Snackbar from "@mui/material/Snackbar";

function AlertBar() {
  const { openAlert, handleCloseAlert, alertMessage } = useAlertBarContext();

  return (
    <Snackbar
      className="alert-bar"
      open={openAlert}
      onClose={handleCloseAlert}
      message={alertMessage}
      autoHideDuration={1500} 
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
}

export default AlertBar;
