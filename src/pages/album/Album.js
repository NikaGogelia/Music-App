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
        {copyrights.map((copyright) => (
          <p key={copyright.text}>{copyright.text}</p>
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
