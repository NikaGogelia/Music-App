import "./all-music.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import Loader from "../../components/loader/Loader";
import MusicCard from "../../components/card/MusicCard";
import ArtistCard from "../../components/card/ArtistCard";
import CategoryCard from "../../components/card/CategoryCard";

function AllMusic() {
  const {
    fetchData,
    accessToken,
    loader,
    setLoader,
    headerName,
    handleDataKey,
  } = useGlobalContext();

  const params = useLocation();
  const { api, pageName, dataKey, content } = params?.state;

  const [data, setData] = useState([]);

  // Loader
  useEffect(() => {
    setLoader(true);
    setTimeout(() => setLoader(false), 2000);
  }, [setLoader]);

  // Render Different Cards On Different Content Types
  const renderSwitch = (data) => {
    switch (content) {
      case "album":
        return <MusicCard {...data} key={data.id} content={content} />;
      case "track":
        return <MusicCard {...data} key={data.id} content={content} />;
      case "artist":
        return <ArtistCard {...data} key={data.id} content={content} />;
      case "category":
        return <CategoryCard {...data} key={data.id} content={content} />;
      default:
        break;
    }
  };

  // Fetch Data From Api
  useEffect(() => {
    if (accessToken !== "") {
      fetchData(api).then((res) => setData(handleDataKey(dataKey, res)));
    }
  }, [api, fetchData, accessToken, dataKey, handleDataKey]);

  if (loader) return <Loader />;
  return (
    <div className="all-music">
      <h1>{headerName(pageName)}</h1>
      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {data?.map((item, index) => {
          let passedData = [];
          switch (pageName) {
            case "recommends-for-you":
              passedData = item?.album;
              break;
            default:
              passedData = item;
              break;
          }
          return renderSwitch(passedData);
        })}
      </div>
    </div>
  );
}

export default AllMusic;
