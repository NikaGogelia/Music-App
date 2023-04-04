import "./slider-content.css";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { useGlobalContext } from "../../context/GlobalContext";
import MusicCard from "../card/MusicCard";
import ArtistCard from "../card/ArtistCard";
import CategoryCard from "../card/CategoryCard";

function SliderContent({ content, name, path, allPath, dataKey }) {
  const { baseApi, fetchData, accessToken, headerName, handleDataKey } =
    useGlobalContext();

  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [perView, setPerView] = useState(5);
  const [space, setSpace] = useState(20);

  // Set Window Width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set Slider Per View Items Depend On Window Width
  useEffect(() => {
    if (windowWidth <= 1700) {
      setPerView(4);
      setSpace(15);
    }
    if (windowWidth <= 1400) {
      setPerView(3);
      setSpace(10);
    }
    if (windowWidth <= 1100) {
      setPerView(2);
      setSpace(3);
    }
    if (windowWidth < 900) {
      setPerView(1);
      setSpace(2);
    }

    return () => {
      setPerView(5);
      setSpace(20);
    };
  }, [windowWidth]);

  // Fetch Data From Api
  useEffect(() => {
    if (accessToken !== "") {
      fetchData(`${baseApi}${path}`).then((res) =>
        setData(handleDataKey(dataKey, res))
      );
    }
  }, [baseApi, path, dataKey, fetchData, accessToken, handleDataKey]);

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

  return (
    <div className={`${name} slider-content animate__fadeInLeft`}>
      <div className="d-flex justify-content-between">
        <h3>{headerName(name)}</h3>
        <Link
          to={`/player/all/${name}`}
          state={{
            api: `${baseApi}${allPath}`,
            pageName: name,
            dataKey: dataKey,
            content: content,
          }}
        >
          Show All
        </Link>
      </div>
      <Swiper
        slidesPerView={perView}
        spaceBetween={space}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper animate__fadeIn"
      >
        {data?.map((item, index) => {
          let passedData = [];
          switch (name) {
            case "recommends-for-you":
              passedData = item?.album;
              break;
            default:
              passedData = item;
              break;
          }

          return (
            <SwiperSlide key={index}>{renderSwitch(passedData)}</SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SliderContent;
