import "./modal-box.css";
import { useState } from "react";
import { useRootContext } from "../../context/RootContextProvider";
import { useMutation } from "react-query";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Checkbox, TextField, FormControlLabel } from "@mui/material";

function ModalBox({ open, onClose, refetch, crudOperation }) {
  const [name, setName] = useState("");
  const [nonValidateName, setNonValidateName] = useState("");
  const [description, setDescription] = useState("");
  const [publicContent, setPublicContent] = useState(false);
  const [img, setImg] = useState("");

  const { baseApi, fetchData, user } = useRootContext();

  const handleSetName = (val) => setName(val);

  const handleSetDescription = (val) => setDescription(val);

  const handleSetPublic = (val) => setPublicContent(val);

  const createPlaylist = useMutation(["create-playlist", name], (playlist) =>
    fetchData(`${baseApi}/users/${user.id}/playlists`, {
      method: "post",
      data: playlist,
    })
  );

  const handleSave = (value) => {
    createPlaylist.mutate(value);
    setTimeout(() => {
      refetch();
      onClose();
    }, 1000);
  };

  const renderModalBoxSwitch = () => {
    switch (crudOperation) {
      case "add":
        return (
          <>
            <h1>Create Playlist</h1>
            <div className="create-playlist-form d-flex flex-column">
              <TextField
                error={nonValidateName.length > 0 ? true : false}
                className="input-name"
                label="Name"
                variant="outlined"
                helperText={nonValidateName.length > 0 ? nonValidateName : ""}
                value={name}
                onChange={(e) => handleSetName(e.target.value)}
                autoComplete="off"
              />
              <TextField
                className="input-description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => handleSetDescription(e.target.value)}
                autoComplete="off"
              />
              <FormControlLabel
                className="checkbox-public"
                control={
                  <Checkbox
                    checked={publicContent}
                    onChange={(e) => handleSetPublic(e.target.checked)}
                  />
                }
                label="Public"
              />
              <div className="create-playlist-form-button">
                <button
                  className="button"
                  type="submit"
                  onClick={() => {
                    const value = { name, description, public: publicContent };
                    if (name.length === 0) {
                      setNonValidateName("Input Name");
                    } else {
                      setNonValidateName("");
                      handleSave(value);
                    }
                  }}
                >
                  save
                </button>
              </div>
            </div>
          </>
        );
      case "edit":
        return (
          <>
            <h1>edit</h1>
          </>
        );

      default:
        break;
    }
  };

  return (
    <Modal className="modal-box" open={open} onClose={() => onClose()}>
      <Box className="box">
        <div
          className="modal-box-close-button d-flex justify-content-center align-items-center"
          onClick={() => onClose()}
        >
          <img src="/assets/icons/close.svg" alt="close-icon" />
        </div>
        <div className="modal-box-content">{renderModalBoxSwitch()}</div>
      </Box>
    </Modal>
  );
}

export default ModalBox;
