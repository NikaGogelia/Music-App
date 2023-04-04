import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const ACCESS_TOKEN_KEY = "spotifyAccessToken";
  const AUTH_URL = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "ca0efd4ec8794d6bbfa93dee3cc6485a";
  const REDIRECT_URI = "http://localhost:3000/player/home";
  const SCOPES =
    "ugc-image-upload user-follow-modify playlist-modify-private playlist-modify-public user-library-modify user-read-currently-playing user-follow-read user-read-playback-position user-read-playback-state playlist-read-private user-read-recently-played user-top-read user-read-email user-library-read user-read-private app-remote-control user-modify-playback-state";

  const baseApi = "https://api.spotify.com";

  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [favGenres, setFavGenres] = useState([]);

  // Authenticate In Spotify Functionality
  const handleAuth = () => {
    const params = new URLSearchParams({
      response_type: "token",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    });
    window.location = `${AUTH_URL}?${params}`;
  };

  // Fetch Data From Api Functionality
  const fetchData = useCallback(
    async (url, config) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
            "Content-Type": "application/json",
          },
          ...config,
        });
        if (!response.ok)
          throw new Error(
            `Error Occured In FetchData Function: ${response.status}`
          );
        const result = await response.json();
        return result;
      } catch (err) {
        console.error(err);
      }
    },
    [accessToken]
  );

  // Get Header Name For Sections Functionality
  const headerName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get Data Key Functionality
  const handleDataKey = (dataKey, res) => {
    const keyParts = dataKey.split(".");
    const keyData = keyParts?.reduce((acc, curr) => acc[curr], res);
    return keyData;
  };

  // Get Only Few Of Genres Randomly Functionality
  function randomGenre(arr, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }
    return result;
  }

  // Get User's Data
  useEffect(() => {
    if (accessToken !== "") {
      fetchData(`https://api.spotify.com/v1/me`).then((res) => setUser(res));
    }
  }, [fetchData, accessToken]);

  // Get Favorite Genres From My Listening Taste
  useEffect(() => {
    if (accessToken !== "") {
      fetchData(`${baseApi}/v1/me/top/artists`).then((res) => {
        res?.items?.map((item) =>
          setFavGenres((prev) => {
            item.genres.map((genre) => genre.replace(/ /g, "-"));
            const genres = [
              ...prev,
              ...item.genres.map((genre) => genre.replace(/ /g, "-")),
            ];
            return randomGenre([...new Set(genres)], 4);
          })
        );
      });
    }
  }, [fetchData, accessToken]);

  return (
    <GlobalContext.Provider
      value={{
        ACCESS_TOKEN_KEY,
        baseApi,
        fetchData,
        accessToken,
        setAccessToken,
        handleAuth,
        user,
        loader,
        setLoader,
        headerName,
        handleDataKey,
        favGenres,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
