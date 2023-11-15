import "./playlist.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import MusicTable from "../../components/music-table/MusicTable";
import ArtistsName from "../../components/artists-name/ArtistsName";
import Pagination from "../../components/pagination/Pagination";

function Playlist() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, baseApi, fetchData, numberWithCommas, user } =
    useRootContext();

  const requestConfig = {
    refetchOnWindowFocus: false,
    staleTime: 3000000,
  };

  // GET Playlist Data
  const { data: playlistData, isLoading } = useQuery(
    ["playlist", propsData.name],
    () => fetchData(propsData.href),
    {
      enabled: !!accessToken,
      ...requestConfig,
    }
  );

  // Get Playlist Tracks
  const {
    data: playlistTracks,
    isFetching,
    refetch,
  } = useQuery(
    ["playlist-tracks", `${propsData.name} ${page}`],
    () =>
      fetchData(
        `${baseApi}/playlists/${propsData.id}/tracks?limit=${rowsPerPage}&offset=${offset}`
      ),
    {
      enabled: !!accessToken,
      ...requestConfig,
    }
  );

  const handleChangePagination = (_, value) => {
    const offsetVal = value * rowsPerPage;
    setPage(value);
    setOffset(() => offsetVal);
    refetch();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setOffset(0);
    setTimeout(() => refetch(), 1500);
  };

  if (isLoading || isFetching) return <Loader />;

  const { images, name, owner, followers, description, type, tracks } =
    playlistData;

  return (
    <div className="playlist">
      <div className="playlist-details-container d-flex">
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
            className="playlist-image"
            effect="blur"
            src={images[0]?.url}
            alt="playlist-img"
          />
        )}
        <div className="playlist-details d-flex flex-column justify-content-end align-items-start">
          <h6 className="d-flex align-items-center">
            {owner.display_name === user.display_name
              ? playlistData?.public
                ? "Public"
                : "Private"
              : null}
            &nbsp;
            {type}
          </h6>
          <h1>{name}</h1>
          <h6
            className="d-flex align-items-center"
            dangerouslySetInnerHTML={{ __html: description }}
          ></h6>
          <div className="playlist-info d-flex align-items-center">
            <span>
              <ArtistsName artists={owner} content={content} />
            </span>
            <span>{numberWithCommas(followers?.total)} likes</span>
            <span>{tracks?.total} songs</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <DetailPageOptions
          content={
            owner.display_name === user.display_name
              ? `owner-${content}`
              : content
          }
          ownerPlaylist={owner.display_name === user.display_name}
        />
        <div className="playlist-search-bar">
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
              d="M6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM1.13461e-07 6C-0.00012039 5.0557 0.222642 4.12471 0.650171 3.28274C1.0777 2.44077 1.69792 1.7116 2.4604 1.15453C3.22287 0.597453 4.10606 0.228212 5.03815 0.0768326C5.97023 -0.0745466 6.92488 -0.00378925 7.82446 0.28335C8.72404 0.570489 9.54315 1.0659 10.2152 1.7293C10.8872 2.39269 11.3931 3.20533 11.6919 4.10113C11.9906 4.99693 12.0737 5.95059 11.9343 6.88455C11.795 7.81851 11.4372 8.7064 10.89 9.476L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8802 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.99 14.4816 15.8892 14.293 15.707L9.477 10.891C8.57936 11.5293 7.52335 11.9082 6.42468 11.9861C5.326 12.0641 4.22707 11.8381 3.2483 11.333C2.26953 10.8278 1.44869 10.063 0.875723 9.12235C0.30276 8.18167 -0.000214051 7.10143 1.13461e-07 6Z"
            />
          </svg>
          <input
            className="search-bar"
            type="text"
            name="search"
            autoComplete="off"
            spellCheck="false"
            onChange={handleSearchChange}
            placeholder="Search in playlist"
            value={search}
          />
        </div>
      </div>
      {playlistTracks?.items.length === 0 ? (
        <div className="playlist-no-data d-flex flex-column justify-content-center align-items-center">
          <h3>Let's find something for your playlist</h3>
          <Link to="/player/search" className="button no-playlistsongs-button">
            Find Songs
          </Link>
        </div>
      ) : (
        <>
          <MusicTable data={playlistTracks} content={content} search={search} />
          {playlistTracks?.total === undefined ? null : (
            <Pagination
              data={playlistTracks}
              rowsPerPage={rowsPerPage}
              page={page}
              setPage={setPage}
              setOffset={setOffset}
              setRowsPerPage={setRowsPerPage}
              refetch={refetch}
              handleChangePagination={handleChangePagination}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default Playlist;
