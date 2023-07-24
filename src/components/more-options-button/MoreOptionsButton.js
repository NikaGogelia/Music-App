import "./more-options-button.css";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import { useLikeContext } from "../../context/LikeContextProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

function MoreOptionsButton({ content, track }) {
  const [trackText, setTrackText] = useState("");
  const [trackLiked, setTrackLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const open = Boolean(anchorEl);

  const { accessToken, baseApi, user, userPlaylist, fetchData } =
    useRootContext();
  const trackPassedData = useLikeContext();

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCollapse(false);
  };

  // GET Check Track Is Saved Into The Liked Songs Or Not
  const { data: checkSaved, refetch } = useQuery(
    ["check-saved-track", track?.name],
    () => fetchData(`${baseApi}/me/tracks/contains?ids=${track?.id}`),
    {
      enabled:
        (content === "track-playlist" ||
          content === "track-album" ||
          content === "track-artist" ||
          content === "track") &&
        !!accessToken,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  // PUT Add Track To Liked Songs
  const likeTrack = useMutation(["like-track", track?.name], (id) =>
    fetchData(`${baseApi}/me/tracks?ids=${id}`, { method: "put" })
  );

  // DELETE Remove Track From Liked Songs
  const unlikeTrack = useMutation(["unlike-track", track?.name], (id) =>
    fetchData(`${baseApi}/me/tracks?ids=${id}`, { method: "delete" })
  );

  // Set Like State To True Or False
  useEffect(() => {
    if (
      checkSaved?.length !== 0 &&
      (content === "track-playlist" ||
        content === "track-album" ||
        content === "track-artist" ||
        content === "track")
    ) {
      if (checkSaved?.length && checkSaved[0] === true) {
        setTrackText("Remove From Your Liked Songs");
        setTrackLiked(true);
      } else {
        setTrackText("Save To Your Liked Songs");
        setTrackLiked(false);
      }
    } else {
      setTrackText("");
      setTrackLiked(false);
    }
  }, [checkSaved, content]);

  const renderMenuSwitch = (type) => {
    switch (type) {
      case "track-album":
      case "track-artist":
      case "track-playlist":
      case "track":
        return (
          <span className="album-track-options">
            <MenuItem
              onClick={() => {
                handleClose();
                if (trackLiked) {
                  unlikeTrack.mutate(track?.id, {
                    onSuccess: () =>
                      setTimeout(() => {
                        trackPassedData?.refetch();
                        refetch();
                      }, 1200),
                  });
                } else {
                  likeTrack.mutate(track?.id, {
                    onSuccess: () =>
                      setTimeout(() => {
                        trackPassedData?.refetch();
                        refetch();
                      }, 1200),
                  });
                }
              }}
            >
              {trackText}
            </MenuItem>
            <MenuItem>
              <List sx={{ width: "100%" }}>
                <ListItemButton
                  onClick={handleCollapse}
                  className="d-flex align-items-center justify-content-between"
                >
                  <span>Add To Your Playlist</span>
                  <span>
                    <svg
                      style={
                        collapse
                          ? { transform: "rotate(180deg)", transition: "0.3s" }
                          : { transform: "rotate(0deg)", transition: "0.3s" }
                      }
                      width={16}
                      height={9}
                      viewBox="0 0 16 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 1L8 8L1 1"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </ListItemButton>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {userPlaylist?.items
                      .filter(
                        (item) => item.owner.display_name === user.display_name
                      )
                      .map((item) => (
                        <ListItemButton
                          key={item.id}
                          sx={{ pl: 3 }}
                          onClick={handleClose}
                        >
                          {item.name}
                        </ListItemButton>
                      ))}
                  </List>
                </Collapse>
              </List>
            </MenuItem>
          </span>
        );
      case "album":
      case "playlist":
        return <MenuItem onClick={handleClose}>Add To Your Library</MenuItem>;
      default:
        break;
    }
  };

  return (
    <div className="more-options-button">
      <button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          width={18}
          height={4}
          viewBox="0 0 18 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H2.01M9 2H9.01M16 2H16.01M3 2C3 2.26522 2.89464 2.51957 2.70711 2.70711C2.51957 2.89464 2.26522 3 2 3C1.73478 3 1.48043 2.89464 1.29289 2.70711C1.10536 2.51957 1 2.26522 1 2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1C2.26522 1 2.51957 1.10536 2.70711 1.29289C2.89464 1.48043 3 1.73478 3 2ZM10 2C10 2.26522 9.89464 2.51957 9.70711 2.70711C9.51957 2.89464 9.26522 3 9 3C8.73478 3 8.48043 2.89464 8.29289 2.70711C8.10536 2.51957 8 2.26522 8 2C8 1.73478 8.10536 1.48043 8.29289 1.29289C8.48043 1.10536 8.73478 1 9 1C9.26522 1 9.51957 1.10536 9.70711 1.29289C9.89464 1.48043 10 1.73478 10 2ZM17 2C17 2.26522 16.8946 2.51957 16.7071 2.70711C16.5196 2.89464 16.2652 3 16 3C15.7348 3 15.4804 2.89464 15.2929 2.70711C15.1054 2.51957 15 2.26522 15 2C15 1.73478 15.1054 1.48043 15.2929 1.29289C15.4804 1.10536 15.7348 1 16 1C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2Z"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Menu
        className="more-options-menu"
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {renderMenuSwitch(content)}
      </Menu>
    </div>
  );
}

export default MoreOptionsButton;
