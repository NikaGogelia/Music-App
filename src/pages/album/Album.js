import "./album.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import MusicTable from "../../components/music-table/MusicTable";
import SliderContent from "../../components/slider-content/SliderContent";
import ArtistsName from "../../components/artists-name/ArtistsName";

function Album() {
  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, baseApi, fetchData, formatDate } = useRootContext();

  const requestConfig = {
    refetchOnWindowFocus: false,
    staleTime: 3000000,
  };

  // GET Album Data
  const { data: albumData, isLoading } = useQuery(
    ["music-album", propsData.name],
    () => fetchData(propsData.href),
    {
      enabled: !!accessToken,
      ...requestConfig,
    }
  );

  // GET More By Artist Data
  const { data: moreByArtistData, isError: moreByArtistsError } = useQuery(
    ["more-by-artist", albumData?.artists[0].name],
    () =>
      fetchData(
        `${baseApi}/artists/${albumData?.artists[0].id}/albums?include_groups=album,single&limit=20`
      ),
    {
      enabled: !!accessToken && !!albumData,
      ...requestConfig,
    }
  );

  if (isLoading) return <Loader />;

  const {
    tracks,
    images,
    name,
    artists,
    album_type,
    release_date,
    total_tracks,
    copyrights,
  } = albumData;

  return (
    <div className="album">
      <div className="album-details-container d-flex">
        {images[0]?.url === undefined ? (
          <div className="no-image d-flex justify-content-center align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              width={24}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M18 3.00001C17.9999 2.85212 17.967 2.70609 17.9037 2.57244C17.8404 2.43879 17.7482 2.32085 17.6338 2.22711C17.5194 2.13338 17.3856 2.06619 17.2422 2.03037C17.0987 1.99456 16.949 1.99102 16.804 2.02001L6.804 4.02001C6.57739 4.0653 6.37346 4.18768 6.22689 4.36634C6.08031 4.545 6.00014 4.76891 6 5.00001V14.114C5.67217 14.0376 5.33661 13.9994 5 14C3.343 14 2 14.895 2 16C2 17.105 3.343 18 5 18C6.657 18 8 17.105 8 16V7.82001L16 6.22001V12.114C15.6722 12.0376 15.3366 11.9994 15 12C13.343 12 12 12.895 12 14C12 15.105 13.343 16 15 16C16.657 16 18 15.105 18 14V3.00001Z" />
            </svg>
          </div>
        ) : (
          <LazyLoadImage
            className="album-image"
            effect="blur"
            src={images[0]?.url}
            alt="album-img"
          />
        )}
        <div className="album-details d-flex flex-column justify-content-end align-items-start">
          <h6>{album_type}</h6>
          <h1>{name}</h1>
          <div className="album-info d-flex align-items-center">
            <span>
              <ArtistsName artists={artists} />
            </span>
            <span title={formatDate(release_date)}>
              {release_date.slice(0, 4)}
            </span>
            <span>{total_tracks} songs</span>
          </div>
        </div>
      </div>
      <DetailPageOptions content={content} />
      <MusicTable data={tracks} content={content} />
      <div className="copyrights d-flex flex-column justify-content-center">
        <p>{formatDate(release_date)}</p>
        {copyrights.map((copyright, index) => (
          <p key={copyright.text + index}>{copyright.text}</p>
        ))}
      </div>
      <div className="more-by-artist">
        <SliderContent
          content={content}
          name={`More By ${artists[0].name}`}
          data={moreByArtistData?.items.filter((item) => item.name !== name)}
          error={moreByArtistsError}
        />
      </div>
    </div>
  );
}

export default Album;
