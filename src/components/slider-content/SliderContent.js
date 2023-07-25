import "./slider-content.css";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

function SliderContent({ data, error, content, name }) {
  const { headerName, renderMusicCardSwitch } = useRootContext();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [perView, setPerView] = useState(5);

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
    }
    if (windowWidth <= 1400) {
      setPerView(3);
    }
    if (windowWidth <= 1100) {
      setPerView(2);
    }
    if (windowWidth < 900) {
      setPerView(1);
    }

    return () => {
      setPerView(5);
    };
  }, [windowWidth]);

  if (error)
    return (
      <div className={`${name} slider-content animate__fadeInLeft error-case`}>
        <h3>{headerName(name)}</h3>
        <h5>An Error Ocurred!</h5>
      </div>
    );

  if (data?.length === 0 || data === undefined)
    return (
      <div
        className={`${name} slider-content animate__fadeInLeft warning-case d-none`}
      ></div>
    );

  return (
    <div className={`${name} slider-content animate__fadeInLeft`}>
      <div className="d-flex justify-content-between">
        <h3>{headerName(name)}</h3>
        <Link
          to={`/player/show-all/${name}`}
          state={{
            data: data,
            pageName: name,
            content: content,
          }}
        >
          Show All
        </Link>
      </div>
      <Swiper
        slidesPerView={perView}
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper animate__fadeIn"
      >
        {data?.slice(0, 10)?.map((item, index) => {
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
            <SwiperSlide key={index}>
              {renderMusicCardSwitch(passedData, content)}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SliderContent;
