import "./library.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SliderContent from "../../components/slider-content/SliderContent";
import MusicCard from "../../components/card/MusicCard";

function Library() {
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [selectType, setSelectType] = useState("playlist");

  const { baseApi, accessToken, fetchData } = useRootContext();

  // Loading
  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  // GET Current User Playlists
  const {
    data: currentUserPlaylists,
    isError: currentPlaylistError,
    refetch: refetchPlaylist,
  } = useQuery(
    "current-user-playlists",
    () => fetchData(`${baseApi}/me/playlists?offset=0&limit=50`),
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: true,
      staleTime: 3000000,
      select: (res) => res.items,
    }
  );

  // GET Current User Albums
  const {
    data: currentUserAlbums,
    isError: currentAlbumError,
    refetch: refetchAlbum,
  } = useQuery(
    "current-user-albums",
    () =>
      fetchData(
        `${baseApi}/me/albums?offset=0&limit=50&locale=en-US,en;q=0.6&market=GE`
      ),
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: true,
      staleTime: 3000000,
      select: (res) => res.items.map((item) => item.album),
    }
  );

  useEffect(() => {
    return () => {
      if (accessToken) {
        refetchPlaylist();
        refetchAlbum();
      }
    };
  }, [accessToken, refetchAlbum, refetchPlaylist]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectType = (event) => {
    setSelectType(event.target.value);
  };

  if (loader) return <Loader />;
  return (
    <div className="library">
      <div className="library-header d-flex justify-content-between align-items-center">
        <h1>Library</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div className="library-search-bar">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM1.13461e-07 6C-0.00012039 5.0557 0.222642 4.12471 0.650171 3.28274C1.0777 2.44077 1.69792 1.7116 2.4604 1.15453C3.22287 0.597453 4.10606 0.228212 5.03815 0.0768326C5.97023 -0.0745466 6.92488 -0.00378925 7.82446 0.28335C8.72404 0.570489 9.54315 1.0659 10.2152 1.7293C10.8872 2.39269 11.3931 3.20533 11.6919 4.10113C11.9906 4.99693 12.0737 5.95059 11.9343 6.88455C11.795 7.81851 11.4372 8.7064 10.89 9.476L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8802 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.99 14.4816 15.8892 14.293 15.707L9.477 10.891C8.57936 11.5293 7.52335 11.9082 6.42468 11.9861C5.326 12.0641 4.22707 11.8381 3.2483 11.333C2.26953 10.8278 1.44869 10.063 0.875723 9.12235C0.30276 8.18167 -0.000214051 7.10143 1.13461e-07 6Z"
              />
            </svg>
            <input
              className="search-bar"
              type="text"
              name="search"
              autoComplete="off"
              spellCheck="false"
              onChange={handleSearchChange}
              placeholder="Search In Your Library"
              value={search}
            />
          </div>
          <Select
            className="library-search-menu"
            value={selectType}
            onChange={handleSelectType}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="playlist">Playlist</MenuItem>
            <MenuItem value="album">Album</MenuItem>
          </Select>
        </div>
      </div>
      {search.length > 0 ? (
        <div className="searched-content d-flex flex-wrap justify-content-center">
          {selectType === "playlist"
            ? currentUserPlaylists
                .filter(
                  (currentUserPlaylist) =>
                    currentUserPlaylist.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    currentUserPlaylist.owner.display_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((currentUserPlaylist) => (
                  <MusicCard
                    data={currentUserPlaylist}
                    content="playlist"
                    key={currentUserPlaylist.id}
                  />
                ))
            : currentUserAlbums
                .filter(
                  (currentUserAlbums) =>
                    currentUserAlbums.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    currentUserAlbums.artists
                      .find((artist) =>
                        artist.name.toLowerCase().includes(search.toLowerCase())
                      )
                      ?.name.toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((currentUserAlbum) => (
                  <MusicCard
                    data={currentUserAlbum}
                    content="album"
                    key={currentUserAlbum.id}
                  />
                ))}
        </div>
      ) : (
        <div className="library-list">
          <SliderContent
            data={currentUserPlaylists?.sort((a, b) =>
              a.name === b.name ? 0 : a.name < b.name ? -1 : 1
            )}
            error={currentPlaylistError}
            content="playlist"
            name="Your Saved Playlists"
          />
          <SliderContent
            data={currentUserAlbums?.sort((a, b) =>
              a.name === b.name ? 0 : a.name < b.name ? -1 : 1
            )}
            error={currentAlbumError}
            content="album"
            name="Your Saved Albums"
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Library;
