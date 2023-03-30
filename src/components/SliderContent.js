import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { useGlobalContext } from "../context/GlobalContext";
import MusicCard from "./music-card/MusicCard";

function SliderContent({ name, apiParams, all, dataKey }) {
  const { baseApi, fetchData, accessToken } = useGlobalContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accessToken !== "") {
      setTimeout(() => {
        fetchData(`${baseApi}${apiParams}`).then((item) => {
          const keyParts = dataKey.split(".");
          const keyData = keyParts?.reduce((acc, curr) => acc[curr], item);
          setData(keyData);
        });
      }, 1000);
    }
  }, [baseApi, apiParams, dataKey, fetchData, accessToken]);

  const headerName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className={name}>
      <div className="d-flex justify-content-between">
        <h3>{headerName}</h3>
        <Link
          to={`/player/all/${name}`}
          state={{
            api: `${baseApi}${all}`,
            pageName: name,
            dataKey: dataKey,
          }}
        >
          Show All
        </Link>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper"
      >
        {data?.map((item, index) => {
          let passedData = [];
          switch (name) {
            case "popular-new-releases":
              passedData = item;
              break;
            case "recommends-for-you":
              passedData = item?.album;
              break;
            default:
              break;
          }

          return (
            <SwiperSlide key={index}>
              <MusicCard {...passedData} key={passedData.id} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SliderContent;
