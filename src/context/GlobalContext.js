import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const baseApi = "https://api.spotify.com";

  const fetchData = useCallback(
    async (url, config) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  // Get Access Token
  useEffect(() => {
    const clientId = "b33e56ed8b4b4ca7b00c653c09f823c0";
    const clientSecret = "a7c6f649cbe0402fa7f8a703c526ce0d";
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((data) => data.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ loader, setLoader, baseApi, fetchData, accessToken }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
