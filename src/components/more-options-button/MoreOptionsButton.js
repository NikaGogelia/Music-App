import "./more-options-button.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import { useAlertBarContext } from "../../context/AlertBarContextProvider";
import { useLikeContext } from "../../context/LikeContextProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

function MoreOptionsButton({ content, track, playlist, album }) {
  const [liked, setLiked] = useState(false);
  const [trackText, setTrackText] = useState("");
  const [playlistText, setPlaylistText] = useState("");
  const [albumText, setAlbumText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { accessToken, baseApi, user, userPlaylist, fetchData } =
    useRootContext();
  const trackPassedData = useLikeContext();
  const { handleOpenAlert } = useAlertBarContext();

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
  const { data: checkTrackSaved, refetch: refetchTrack } = useQuery(
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

  // GET Check Playlist Is Saved Into The Library Or Not
  const { data: checkPlaylistSaved, refetch: refetchPlaylist } = useQuery(
    ["check-saved-playlist", playlist?.name],
    () =>
      fetchData(
        `${baseApi}/playlists/${playlist.id}/followers/contains?ids=${user.id}`
      ),
    {
      enabled:
        (content === "playlist" || content === "owner-playlist") &&
        !!accessToken,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  // PUT Add Playlist To Library
  const likePlaylist = useMutation(["like-playlist", playlist?.name], (id) =>
    fetchData(`${baseApi}/playlists/${id}/followers`, {
      method: "put",
    })
  );

  // DELETE Remove Playlist From Library
  const unlikePlaylist = useMutation(
    ["unlike-playlist", playlist?.name],
    (id) =>
      fetchData(`${baseApi}/playlists/${id}/followers`, {
        method: "delete",
      })
  );

  // GET Check Album Is Saved Into The Library Or Not
  const { data: checkAlbumSaved, refetch: refetchAlbum } = useQuery(
    ["check-saved-album", album?.name],
    () => fetchData(`${baseApi}/me/albums/contains?ids=${album?.id}`),
    {
      enabled: content === "album" && !!accessToken,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  // PUT Add Album To Library
  const likeAlbum = useMutation(["like-album", album?.name], (id) =>
    fetchData(`${baseApi}/me/albums?ids=${id}`, {
      method: "put",
    })
  );

  // DELETE Remove Album From Library
  const unlikeAlbum = useMutation(["unlike-album", album?.name], (id) =>
    fetchData(`${baseApi}/me/albums?ids=${id}`, {
      method: "delete",
    })
  );

  // Set Like State To True Or False
  useEffect(() => {
    switch (content) {
      case "track-playlist":
      case "track-album":
      case "track-artist":
      case "track":
        if (checkTrackSaved?.length && checkTrackSaved[0] === true) {
          setTrackText("Remove From Your Liked Songs");
          setLiked(true);
        } else {
          setTrackText("Save To Your Liked Songs");
          setLiked(false);
        }
        break;
      case "playlist":
        if (checkPlaylistSaved?.length && checkPlaylistSaved[0] === true) {
          setPlaylistText("Remove From Your Library");
          setLiked(true);
        } else {
          setPlaylistText("Save To Your Library");
          setLiked(false);
        }
        break;
      case "album":
        if (checkAlbumSaved?.length && checkAlbumSaved[0] === true) {
          setAlbumText("Remove From Your Library");
          setLiked(true);
        } else {
          setAlbumText("Save To Your Library");
          setLiked(false);
        }
        break;
      case "owner-playlist":
        if (checkPlaylistSaved?.length && checkPlaylistSaved[0] === true) {
          setLiked(true);
        }
        break;
      default:
        setTrackText("");
        setPlaylistText("");
        setAlbumText("");
        setLiked(false);
        break;
    }
  }, [content, checkTrackSaved, checkPlaylistSaved, checkAlbumSaved]);

  const handleSaveTrack = () => {
    if (liked) {
      unlikeTrack.mutate(track?.id, {
        onSuccess: () =>
          setTimeout(() => {
            trackPassedData?.refetch();
            refetchTrack();
          }, 1200),
      });
    } else {
      likeTrack.mutate(track?.id, {
        onSuccess: () =>
          setTimeout(() => {
            trackPassedData?.refetch();
            refetchTrack();
          }, 1200),
      });
    }
  };

  const handleSavePlaylist = () => {
    if (liked) {
      unlikePlaylist.mutate(playlist?.id, {
        onSuccess: () =>
          setTimeout(() => {
            refetchPlaylist();
          }, 1200),
      });
    } else {
      likePlaylist.mutate(playlist?.id, {
        onSuccess: () =>
          setTimeout(() => {
            refetchPlaylist();
          }, 1200),
      });
    }
  };

  const handleSaveAlbum = () => {
    if (liked) {
      unlikeAlbum.mutate(album?.id, {
        onSuccess: () =>
          setTimeout(() => {
            refetchAlbum();
          }, 1200),
      });
    } else {
      likeAlbum.mutate(album?.id, {
        onSuccess: () =>
          setTimeout(() => {
            refetchAlbum();
          }, 1200),
      });
    }
  };

  const renderMenuSwitch = (type) => {
    switch (type) {
      case "track-album":
      case "track-artist":
      case "track-playlist":
      case "track":
        return (
          <span className="track-options">
            <MenuItem
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  handleSaveTrack();
                  handleOpenAlert("liked-track", !liked);
                }, 1500);
              }}
            >
              {trackText}
            </MenuItem>
            <MenuItem className="playlist-menu">
              <List sx={{ width: "100%" }} disablePadding>
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
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 250,
                    }}
                  >
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
      case "playlist":
        return (
          <span className="options">
            <MenuItem
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  handleSavePlaylist();
                  handleOpenAlert("liked-playlist", !liked);
                }, 1500);
              }}
            >
              {playlistText}
            </MenuItem>
          </span>
        );
      case "album":
        return (
          <span className="options">
            <MenuItem
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  handleSaveAlbum();
                  handleOpenAlert("liked-album", !liked);
                }, 1500);
              }}
            >
              {albumText}
            </MenuItem>
          </span>
        );

      case "owner-playlist":
        return (
          <span className="current-user-playlist-options">
            <MenuItem
              onClick={() => {
                handleClose();
                handleSavePlaylist();
                handleOpenAlert("delete-owner-playlist");
                setTimeout(() => {
                  navigate("/player/library");
                }, 1500);
              }}
            >
              Delete Playlist
            </MenuItem>
            <MenuItem onClick={handleClose}>Edit Playlist</MenuItem>
            <MenuItem onClick={handleClose}>Make Private</MenuItem>
          </span>
        );
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
