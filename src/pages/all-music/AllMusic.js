import "./all-music.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import MusicCard from "../../components/music-card/MusicCard";

function AllMusic() {
  const { fetchData } = useGlobalContext();

  const params = useLocation();
  const { api, pageName, dataKey } = params?.state;

  const [data, setData] = useState([]);

  const headerName = pageName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    fetchData(api).then((item) => {
      const keyParts = dataKey.split(".");
      const keyData = keyParts.reduce((acc, curr) => acc[curr], item);
      setData(keyData);
    });
  }, [api, fetchData, dataKey]);

  return (
    <div className="all-music">
      <h1>{headerName}</h1>
      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {data?.map((item, index) => {
          let passedData = [];
          switch (pageName) {
            case "popular-new-releases":
              passedData = item;
              break;
            case "recommends-for-you":
              passedData = item?.album;
              break;
            default:
              break;
          }
          return <MusicCard {...passedData} key={index} />;
        })}
      </div>
    </div>
  );
}

export default AllMusic;
