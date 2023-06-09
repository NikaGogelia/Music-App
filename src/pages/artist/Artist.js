import "./artist.css";
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

function Artist() {
  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, baseApi, fetchData, numberWithCommas } =
    useRootContext();

  const requestConfig = {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  };

  // GET Artist's Detailed Data
  const { data: artistData, isLoading } = useQuery(
    ["artist-details", propsData.name],
    () => fetchData(propsData.href),
    {
      enabled: !!accessToken,
      ...requestConfig,
    }
  );

  // GET Artists Popular Tracks
  const { data: popularTracksData, isError: popularTracksError } = useQuery(
    ["popular-tracks", propsData.name],
    () => fetchData(`${baseApi}/artists/${artistData.id}/top-tracks?market=GE`),
    {
      enabled: !!accessToken && !!artistData,
      ...requestConfig,
    }
  );

  // GET Artist's Discography
  const { data: discographyData, isError: discographyError } = useQuery(
    ["discography", propsData.name],
    () =>
      fetchData(
        `${baseApi}/artists/${artistData.id}/albums?include_groups=album,single&market=GE&limit=20`
      ),
    {
      enabled: !!accessToken && !!artistData,
      ...requestConfig,
    }
  );

  // GET Albums Where Artist Appears On
  const { data: appearsOnData, isError: appearsOnError } = useQuery(
    ["appears-on", propsData.name],
    () =>
      fetchData(
        `${baseApi}/artists/${artistData.id}/albums?include_groups=appears_on&market=GE&limit=20`
      ),
    {
      enabled: !!accessToken && !!artistData,
      ...requestConfig,
    }
  );

  // GET Artist's Related Artists
  const { data: relatedArtistsData, isError: relatedArtistsError } = useQuery(
    ["related-artists", propsData.name],
    () => fetchData(`${baseApi}/artists/${artistData.id}/related-artists`),
    {
      enabled: !!accessToken && !!artistData,
      ...requestConfig,
    }
  );
  console.log(relatedArtistsData);

  if (isLoading) return <Loader />;

  const { followers, images, name } = artistData;

  return (
    <div className="artist">
      <div className="artist-details-container d-flex">
        <LazyLoadImage
          className="artist-image"
          effect="blur"
          src={images[0].url}
          alt="artist-img"
        />
        <div className="artist-details d-flex flex-column justify-content-end align-items-start">
          <h6 className="d-flex align-items-center">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM11.707 6.707C11.8892 6.5184 11.99 6.2658 11.9877 6.0036C11.9854 5.7414 11.8802 5.49059 11.6948 5.30518C11.5094 5.11977 11.2586 5.0146 10.9964 5.01233C10.7342 5.01005 10.4816 5.11084 10.293 5.293L7 8.586L5.707 7.293C5.5184 7.11084 5.2658 7.01005 5.0036 7.01233C4.7414 7.0146 4.49059 7.11977 4.30518 7.30518C4.11977 7.49059 4.0146 7.7414 4.01233 8.0036C4.01005 8.2658 4.11084 8.5184 4.293 8.707L6.293 10.707C6.48053 10.8945 6.73484 10.9998 7 10.9998C7.26516 10.9998 7.51947 10.8945 7.707 10.707L11.707 6.707Z"
                fill="#00ffff"
              />
            </svg>
            &nbsp; Verified Artist
          </h6>
          <h1>{name}</h1>
          <div className="artist-info d-flex align-items-center">
            <span>{numberWithCommas(followers?.total)} monthly listeners</span>
          </div>
        </div>
      </div>
      <DetailPageOptions content={content} />
      <MusicTable data={popularTracksData} content={content} />
      <div className="artist-discography">
        <SliderContent
          content="album"
          name="discography"
          data={discographyData?.items}
          error={discographyError}
        />
      </div>
      <div className="artist-fans-also-like">
        <SliderContent
          content="artist"
          name="fans-also-like"
          data={relatedArtistsData?.artists}
          error={relatedArtistsError}
        />
      </div>
      <div className="artist-appears-on">
        <SliderContent
          content="album"
          name="appears-on"
          data={appearsOnData?.items}
          error={appearsOnError}
        />
      </div>
    </div>
  );
}

export default Artist;
