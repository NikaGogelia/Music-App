import "./track-details.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import ArtistsName from "../../components/artists-name/ArtistsName";
import { useMusicTime } from "../../hooks/useMusicTime";

function TrackDetails() {
  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, fetchData, formatDate } = useRootContext();

  const requestConfig = {
    refetchOnWindowFocus: false,
    staleTime: 3000000,
  };

  // GET Track Details Data
  const { data: trackData, isLoading } = useQuery(
    ["track-details", propsData.name],
    () => fetchData(propsData.href),
    {
      enabled: !!accessToken,
      ...requestConfig,
    }
  );

  console.log(trackData);

  const { minutes, seconds } = useMusicTime(trackData?.duration_ms);

  if (isLoading) return <Loader />;

  const { album, artists, name } = trackData;

  return (
    <div className="track">
      <div className="track-details-container d-flex">
        <LazyLoadImage
          className="track-image"
          effect="blur"
          src={album?.images[0].url}
          alt="track-img"
        />
        <div className="track-details d-flex flex-column justify-content-end align-items-start">
          <h6>Song</h6>
          <h1>{name}</h1>
          <div className="track-info d-flex align-items-center">
            <span>
              <ArtistsName artists={artists} />
            </span>
            <span title={formatDate(album?.release_date)}>
              {album?.release_date.slice(0, 4)}
            </span>
            <span>
              {minutes}:{seconds.length > 1 ? seconds : 0 + seconds}
            </span>
          </div>
        </div>
      </div>
      <DetailPageOptions content={content} track={trackData} />
      <Footer />
    </div>
  );
}

export default TrackDetails;
