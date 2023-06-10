import "./home.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import SliderContent from "../../components/slider-content/SliderContent";
import Loader from "../../components/loader/Loader";
import { useMusicQuery } from "../../hooks/useMusic";

function Home() {
  const { baseApi, accessToken, fetchData, randomGenre } =
    useRootContext();

  const [greet, setGreet] = useState("");

  const date = new Date();
  const hours = date.getHours();

  // Set Greet Message
  useEffect(() => {
    if (hours >= 5 && hours <= 12) {
      setGreet("Morning");
    } else if (hours > 12 && hours <= 17) {
      setGreet("Afternoon");
    } else if (hours > 17 && hours <= 20) {
      setGreet("Evening");
    } else {
      setGreet("Night");
    }
  }, [hours]);

  // GET Favorite Genres From My Listening Taste
  const { data: favGenres } = useQuery(
    "favorite-genres",
    () => fetchData(`${baseApi}/me/top/artists?limit=50`),
    {
      select: (data) => randomGenre(data?.items),
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  // Options For Fetching And Passing Data
  const option = {
    newReleaseData: {
      content: "album",
      name: "popular-new-releases",
      dataKey: "albums.items",
      apiPath: "/browse/new-releases?limit=30",
    },
    recommendsData: {
      content: "album",
      name: "recommends-for-you",
      dataKey: "tracks",
      apiPath: `/recommendations?seed_genres=${favGenres}&limit=30`,
    },
    favArtistsData: {
      content: "artist",
      name: "your-Favorite-artists",
      dataKey: "items",
      apiPath: "/me/top/artists?limit=30&time_range=short_term",
    },
    favTracksData: {
      content: "track",
      name: "your-Favorite-tracks",
      dataKey: "items",
      apiPath: "/me/top/tracks?time_range=short_term",
    },
    browseAllData: {
      content: "category",
      name: "browse-all",
      dataKey: "categories.items",
      apiPath: "/browse/categories?limit=30&locale=GE",
    },
  };

  // GET Popular New Releases Items
  const {
    data: newRelease,
    isError: newReleasesError,
    isLoading: newReleaseLoading,
  } = useMusicQuery(
    "music-items",
    option.newReleaseData.name,
    option.newReleaseData.apiPath,
    option.newReleaseData.dataKey
  );

  // GET Recommended Music List For User
  const {
    data: recommends,
    isError: recommendsError,
    isLoading: recommendsLoading,
  } = useMusicQuery(
    "music-items",
    option.recommendsData.name,
    option.recommendsData.apiPath,
    option.recommendsData.dataKey,
  );

  // GET Favorite Artists List of User
  const {
    data: favArtists,
    isError: favArtistsError,
    isLoading: favArtistsLoading,
  } = useMusicQuery(
    "music-items",
    option.favArtistsData.name,
    option.favArtistsData.apiPath,
    option.favArtistsData.dataKey
  );

  // GET Favorite Tracks List of User
  const {
    data: favTracks,
    isError: favTracksError,
    isLoading: favTracksLoading,
  } = useMusicQuery(
    "music-items",
    option.favTracksData.name,
    option.favTracksData.apiPath,
    option.favTracksData.dataKey
  );

  // GET Music Categories List For User
  const {
    data: browseAll,
    isError: browseAllError,
    isLoading: browseAllLoading,
  } = useMusicQuery(
    "music-items",
    option.browseAllData.name,
    option.browseAllData.apiPath,
    option.browseAllData.dataKey
  );

  if (
    newReleaseLoading ||
    recommendsLoading ||
    favArtistsLoading ||
    favTracksLoading ||
    browseAllLoading
  )
    return <Loader />;

  return (
    <div className="home">
      <h1>Good {greet}</h1>
      <SliderContent
        content={option.newReleaseData.content}
        name={option.newReleaseData.name}
        data={newRelease}
        error={newReleasesError}
      />
      <SliderContent
        content={option.recommendsData.content}
        name={option.recommendsData.name}
        data={recommends}
        error={recommendsError}
      />
      <SliderContent
        content={option.favArtistsData.content}
        name={option.favArtistsData.name}
        data={favArtists}
        error={favArtistsError}
      />
      <SliderContent
        content={option.favTracksData.content}
        name={option.favTracksData.name}
        data={favTracks}
        error={favTracksError}
      />
      <SliderContent
        content={option.browseAllData.content}
        name={option.browseAllData.name}
        data={browseAll}
        error={browseAllError}
      />
    </div>
  );
}

export default Home;
