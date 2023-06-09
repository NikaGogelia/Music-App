import "./home.css";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import SliderContent from "../../components/slider-content/SliderContent";
import Loader from "../../components/loader/Loader";
import { useQuery } from "react-query";

function Home() {
  const { baseApi, accessToken, loader, setLoader, fetchData, randomGenre } =
    useGlobalContext();

  const [greet, setGreet] = useState("");

  const date = new Date();
  const hours = date.getHours();

  // Loader
  useEffect(() => {
    setLoader(true);
    setTimeout(() => setLoader(false), 2000);
  }, [setLoader]);

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
    () => fetchData(`${baseApi}/v1/me/top/artists?limit=50`),
    {
      select: (data) => randomGenre(data?.items),
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  if (loader) return <Loader />;
  return (
    <div className="home">
      <h1>Good {greet}</h1>
      <SliderContent
        content="album"
        name="popular-new-releases"
        dataKey="albums.items"
        path="/v1/browse/new-releases?limit=10"
        allPath="/v1/browse/new-releases?limit=30"
      />
      <SliderContent
        content="album"
        name="recommends-for-you"
        dataKey="tracks"
        path={`/v1/recommendations?seed_genres=${favGenres}&limit=10`}
        allPath={`/v1/recommendations?seed_genres=${favGenres}&limit=30`}
      />
      <SliderContent
        content="artist"
        name="your-Favorite-artists"
        dataKey="items"
        path="/v1/me/top/artists?limit=10&time_range=short_term"
        allPath="/v1/me/top/artists?time_range=short_term"
      />
      <SliderContent
        content="track"
        name="your-Favorite-tracks"
        dataKey="items"
        path="/v1/me/top/tracks?limit=10&time_range=short_term"
        allPath="/v1/me/top/tracks?time_range=short_term"
      />
      <SliderContent
        content="category"
        name="browse-all"
        dataKey="categories.items"
        path="/v1/browse/categories?limit=10&locale=GE"
        allPath="/v1/browse/categories?limit=30&locale=GE"
      />
    </div>
  );
}

export default Home;
