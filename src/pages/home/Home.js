import "./home.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import { useMusicQuery } from "../../hooks/useMusic";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import SliderContent from "../../components/slider-content/SliderContent";

function Home() {
  const { baseApi, accessToken, fetchData, randomGenre } = useRootContext();

  const [greet, setGreet] = useState("");
  const [loader, setLoader] = useState(true);

  const date = new Date();
  const hours = date.getHours();
  const formattedDate = date.toISOString();

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

  // Loading
  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  // GET Favorite Genres From My Listening Taste
  const { data: favGenres } = useQuery(
    "favorite-genres",
    () => fetchData(`${baseApi}/me/top/artists?limit=50`),
    {
      select: (data) => randomGenre(data?.items),
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 3000000,
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
    featuredPlaylistData: {
      content: "playlist",
      name: "featured-playlists",
      dataKey: "playlists.items",
      apiPath: `/browse/featured-playlists?timestamp=${formattedDate}&country=GE&limit=20`,
    },
  };

  // GET Popular New Releases Items
  const { data: newRelease, isError: newReleasesError } = useMusicQuery(
    "music-items",
    option.newReleaseData.name,
    option.newReleaseData.apiPath,
    option.newReleaseData.dataKey
  );

  // GET Recommended Music List For User
  const { data: recommends, isError: recommendsError } = useMusicQuery(
    "music-items",
    option.recommendsData.name,
    option.recommendsData.apiPath,
    option.recommendsData.dataKey
  );

  // GET Favorite Artists List of User
  const { data: favArtists, isError: favArtistsError } = useMusicQuery(
    "music-items",
    option.favArtistsData.name,
    option.favArtistsData.apiPath,
    option.favArtistsData.dataKey
  );

  // GET Favorite Tracks List of User
  const { data: favTracks, isError: favTracksError } = useMusicQuery(
    "music-items",
    option.favTracksData.name,
    option.favTracksData.apiPath,
    option.favTracksData.dataKey
  );

  // GET Featured Playlists
  const { data: featuredPlaylists, isError: featuredPlaylistsError } =
    useMusicQuery(
      "music-items",
      option.featuredPlaylistData.name,
      option.featuredPlaylistData.apiPath,
      option.featuredPlaylistData.dataKey
    );

  if (loader) return <Loader />;
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
        content={option.featuredPlaylistData.content}
        name={option.featuredPlaylistData.name}
        data={featuredPlaylists}
        error={featuredPlaylistsError}
      />
      <Footer />
    </div>
  );
}

export default Home;
