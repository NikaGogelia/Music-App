import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import MusicCard from "../components/card/MusicCard";
import ArtistCard from "../components/card/ArtistCard";

const RootContext = createContext();
function RootContextProvider({ children }) {
  // Variables
  const ACCESS_TOKEN_KEY = "spotifyAccessToken";
  const AUTH_URL = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "ca0efd4ec8794d6bbfa93dee3cc6485a";
  const REDIRECT_URI = "http://localhost:3000/player/home";
  const SCOPES =
    "ugc-image-upload user-follow-modify playlist-modify-private playlist-modify-public user-library-modify user-read-currently-playing user-follow-read user-read-playback-position user-read-playback-state playlist-read-private user-read-recently-played user-top-read user-read-email user-library-read user-read-private app-remote-control user-modify-playback-state";

  // Base URl
  const baseApi = "https://api.spotify.com/v1";

  // Global State
  const [accessToken, setAccessToken] = useState("");

  // ================= Functions ================= //
  // Fetch Data From Api
  async function fetchData(url, config) {
    try {
      const response = await axios(url, {
        headers: { Authorization: `Bearer  ${accessToken}` },
        ...config,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  // Return Header Name For Sections
  function headerName(name) {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Return Data Key
  function handleDataKey(dataKey, res) {
    const keyParts = dataKey.split(".");
    const keyData = keyParts?.reduce((acc, curr) => acc[curr], res);
    return keyData;
  }

  // Return Genres Randomly
  function randomGenre(arr) {
    const filteredArr = arr.filter((item) => item.genres.length > 0);
    const randomNumber = Math.floor(Math.random() * filteredArr.length);
    const genreString = filteredArr[randomNumber]?.genres.join(",");
    return genreString.replace(/\s/g, "-");
  }

  // Authenticate In Spotify
  function handleAuth() {
    const params = new URLSearchParams({
      response_type: "token",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    });
    window.location = `${AUTH_URL}?${params}`;
  }

  // Convert "00-00-00" Date Type Into "month, day, year" Date Type
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  // Add Commas In Number
  function numberWithCommas(numberString) {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return formattedNumber;
  }

  // Render Different Cards On Different Content Type
  function renderMusicCardSwitch(data, content) {
    switch (content) {
      case "album":
      case "track":
      case "playlist":
        return <MusicCard data={data} key={data.id} content={content} />;
      case "artist":
        return <ArtistCard data={data} key={data.id} content={content} />;
      default:
        break;
    }
  }

  // ================= Set Global State ================= //
  // Set Access Token
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");

    if (token) {
      setAccessToken(token);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      window.location.hash = "";
    } else {
      const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, [ACCESS_TOKEN_KEY, setAccessToken]);

  // GET User's Data
  const { data: user } = useQuery(
    "current-user",
    () => fetchData(`${baseApi}/me`),
    { enabled: !!accessToken, refetchOnWindowFocus: false }
  );

  // GET User's Playlist
  const { data: userPlaylist } = useQuery(
    "playlist-data",
    () => fetchData(`${baseApi}/me/playlists`),
    { enabled: !!accessToken, refetchOnWindowFocus: false }
  );

  return (
    <RootContext.Provider
      value={{
        accessToken,
        baseApi,
        user,
        userPlaylist,
        handleAuth,
        fetchData,
        handleDataKey,
        headerName,
        randomGenre,
        formatDate,
        numberWithCommas,
        renderMusicCardSwitch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

// Global Context Custom Hook
export const useRootContext = () => {
  return useContext(RootContext);
};

export default RootContextProvider;
