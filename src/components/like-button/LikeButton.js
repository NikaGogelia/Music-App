import "./like-button.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import { useAlertBarContext } from "../../context/AlertBarContextProvider";
import { useLikeContext } from "../../context/LikeContextProvider";
import { Howl } from "howler";

function LikeButton({ content, track, playlist, album }) {
  const [like, setLike] = useState(false);

  const { baseApi, accessToken, fetchData, user } = useRootContext();
  const { handleOpenAlert } = useAlertBarContext();
  const likePassedData = useLikeContext();

  const sound = new Howl({
    src: ["/assets/sounds/ting.mp3"],
  });

  // GET Check Track Is Saved Into The Liked Songs Or Not
  const { data: checkTrackSaved } = useQuery(
    ["check-saved-track", track?.name],
    () => fetchData(`${baseApi}/me/tracks/contains?ids=${track?.id}`),
    {
      enabled: content === "track" && !!accessToken,
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
  const { data: checkPlaylistSaved } = useQuery(
    ["check-saved-playlist", playlist?.name],
    () =>
      fetchData(
        `${baseApi}/playlists/${playlist?.id}/followers/contains?ids=${user?.id}`
      ),
    {
      enabled: content === "playlist" && !!accessToken,
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
  const { data: checkAlbumSaved } = useQuery(
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
      case "track":
        if (checkTrackSaved?.length && checkTrackSaved[0] === true) {
          setLike(true);
        } else {
          setLike(false);
        }
        break;
      case "playlist":
        if (checkPlaylistSaved?.length && checkPlaylistSaved[0] === true) {
          setLike(true);
        } else {
          setLike(false);
        }
        break;
      case "album":
        if (checkAlbumSaved?.length && checkAlbumSaved[0] === true) {
          setLike(true);
        } else {
          setLike(false);
        }
        break;
      default:
        setLike(false);
        break;
    }
  }, [content, checkTrackSaved, checkPlaylistSaved, checkAlbumSaved]);

  const handleSave = () => {
    switch (content) {
      case "track":
        if (like) {
          unlikeTrack.mutate(track?.id, {
            onSuccess: () => setTimeout(() => likePassedData?.refetch(), 1200),
          });
        } else {
          likeTrack.mutate(track?.id, {
            onSuccess: () => setTimeout(() => likePassedData?.refetch(), 1200),
          });
        }
        break;
      case "playlist":
        if (like) {
          unlikePlaylist.mutate(playlist?.id);
        } else {
          likePlaylist.mutate(playlist?.id);
        }
        break;
      case "album":
        if (like) {
          unlikeAlbum.mutate(album?.id);
        } else {
          likeAlbum.mutate(album?.id);
        }
        break;
      default:
        break;
    }
  };

  return (
    <button
      className={`like-button ${like ? "like-button-active" : ""}`}
      onClick={() => {
        handleSave();
        sound.play();
        setTimeout(() => {
          setLike(!like);
          handleOpenAlert(`liked-${content}`, !like);
        }, 1500);
      }}
      title={`${like ? "Remove From" : "Save To"} ${
        content === "track" ? "Liked Songs" : "Your Library"
      }`}
    >
      <svg
        width={21}
        height={19}
        viewBox="0 0 21 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.60678 4.60201C1.84235 4.03329 2.18764 3.51655 2.62292 3.08127C3.05819 2.64599 3.57494 2.30071 4.14366 2.06513C4.71238 1.82956 5.32193 1.70831 5.9375 1.70831C6.55308 1.70831 7.16263 1.82956 7.73134 2.06513C8.30006 2.30071 8.81681 2.64599 9.25209 3.08127L10.625 4.45419L11.9979 3.08127C12.877 2.20219 14.0693 1.70832 15.3125 1.70832C16.5557 1.70832 17.748 2.20219 18.6271 3.08127C19.5062 3.96035 20 5.15264 20 6.39585C20 7.63906 19.5062 8.83136 18.6271 9.71044L10.625 17.7125L2.62292 9.71044C2.18764 9.27516 1.84235 8.75841 1.60678 8.1897C1.37121 7.62098 1.24996 7.01143 1.24996 6.39585C1.24996 5.78028 1.37121 5.17073 1.60678 4.60201Z"
          stroke="#f9feff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default LikeButton;
