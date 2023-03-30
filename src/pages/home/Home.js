import "./home.css";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import SliderContent from "../../components/SliderContent";

function Home() {
  const { baseApi, fetchData, accessToken } = useGlobalContext();
  const [greet, setGreet] = useState("");
  const [genres, setGenres] = useState([]);

  const greeting = new Date();
  const hours = greeting.getHours();

  // Set Greet
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

  // Get Only Few Of Genres Randomly
  function randomGenre(arr, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }
    return result;
  }

  // Get Music Genres For Recommended Component
  useEffect(() => {
    if (accessToken !== "") {
      fetchData(`${baseApi}/v1/recommendations/available-genre-seeds`).then(
        (res) => setGenres(randomGenre(res?.genres, 4))
      );
    }
  }, [baseApi, fetchData, accessToken]);

  return (
    <div className="home">
      <h1>Good {greet}</h1>
      <SliderContent
        name="popular-new-releases"
        apiParams="/v1/browse/new-releases?limit=10"
        all="/v1/browse/new-releases?limit=30"
        dataKey="albums.items"
      />
      <SliderContent
        name="recommends-for-you"
        apiParams={`/v1/recommendations?seed_genres=${genres.join(
          ","
        )}&limit=10`}
        dataKey="tracks"
        all={`/v1/recommendations?seed_genres=${genres.join(",")}&limit=30`}
      />
    </div>
  );
}

export default Home;
