import { createContext, useContext, useState, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MusicCard from "../components/card/MusicCard";
import ArtistCard from "../components/card/ArtistCard";

const RootContext = createContext();
function RootContextProvider({ children }) {
  // Variables
  const auth_url = "https://accounts.spotify.com/authorize";
  const token_url = "https://accounts.spotify.com/api/token";
  const client_id = "ca0efd4ec8794d6bbfa93dee3cc6485a";
  const client_secret = "fe359fdbaada44d8a4b1a47ad80d2a68";
  const redirect_uri = "http://localhost:3000/player/home";
  const scopes = [
    "ugc-image-upload",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];

  // Base URl
  const baseApi = "https://api.spotify.com/v1";

  // Global State
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("access-token-key") === null
      ? ""
      : sessionStorage.getItem("access-token-key")
  );
  const [authCode, setAuthCode] = useState(
    sessionStorage.getItem("auth-code") === null
      ? ""
      : sessionStorage.getItem("auth-code")
  );

  // ================= Functions ================= //
  // Authenticate In Spotify
  const handleAuth = () => {
    const state = generateRandomString(16);
    const scopeString = encodeURIComponent(scopes.join(" "));
    const url = `${auth_url}?response_type=code&client_id=${client_id}&scope=${scopeString}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&state=${state}`;

    window.location.href = url;
  };

  const generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  // GET Access Token
  const getSpotifyAccessToken = useCallback(async () => {
    const basicAuth = btoa(`${client_id}:${client_secret}`);
    try {
      const response = await axios(token_url, {
        method: "post",
        data: {
          grant_type: "authorization_code",
          code: authCode.toString(),
          redirect_uri: redirect_uri,
        },
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }, [authCode]);

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
    const genreString = filteredArr[randomNumber]?.genres[0];
    return genreString.replace(/\s/g, "-");
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
        setAuthCode,
        setAccessToken,
        handleAuth,
        getSpotifyAccessToken,
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
