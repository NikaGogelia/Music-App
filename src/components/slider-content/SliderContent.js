import "./slider-content.css";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import MusicCard from "../card/MusicCard";
import ArtistCard from "../card/ArtistCard";
import CategoryCard from "../card/CategoryCard";
import { useQuery } from "react-query";
import Loader from "../loader/Loader";

function SliderContent({ content, name, path, allPath, dataKey }) {
  const { baseApi, fetchData, accessToken, headerName, handleDataKey } =
    useGlobalContext();

  // const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [perView, setPerView] = useState(4);
  const [space, setSpace] = useState(10);

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
      setSpace(20);
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

  // GET Album Items, Tracks, Artists
  const { data, isError } = useQuery(
    ["music-items", name],
    () => fetchData(`${baseApi}${path}`),
    {
      select: (data) => handleDataKey(dataKey, data),
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  // Render Different Cards On Different Content Types
  const renderSwitch = (data) => {
    switch (content) {
      case "album":
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

  if (isError)
    return (
      <div className={`${name} slider-content animate__fadeInLeft`}>
        <h3>{headerName(name)}</h3>
        <h5 className="text-danger">An error occurred</h5>
      </div>
    );

  if (data?.length === 0)
    return (
      <div className={`${name} slider-content animate__fadeInLeft`}>
        <h3>{headerName(name)}</h3>
        <h5 className="text-warning">No Items, Refresh Page</h5>
      </div>
    );

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
              passedData = item.album;
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
