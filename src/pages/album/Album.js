import "./album.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import MusicTable from "../../components/music-table/MusicTable";

function Album() {
  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, fetchData } = useRootContext();

  const { data: albumData, isFetching } = useQuery(
    ["music-album", propsData.name],
    () => fetchData(propsData.href),
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );
  // console.log(albumData);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  if (isFetching) return <Loader />;

  const {
    tracks,
    images,
    name,
    artists,
    album_type,
    release_date,
    total_tracks,
  } = albumData;

  return (
    <div className="album">
      <div className="album-details-container d-flex">
        <LazyLoadImage
          className="album-image"
          effect="blur"
          src={images[0].url}
          alt="album-img"
        />
        <div className="album-details d-flex flex-column justify-content-end align-items-start">
          <h6>{album_type}</h6>
          <h1>{name}</h1>
          <div className="album-info d-flex align-items-center">
            <span>
              <Link to="">{artists.map((artist) => artist.name)}</Link>
            </span>
            <span title={formatDate(release_date)}>{release_date.slice(0, 4)}</span>
            <span>{total_tracks} songs</span>
          </div>
        </div>
      </div>
      <DetailPageOptions />
      <MusicTable data={tracks} />
    </div>
  );
}

export default Album;
