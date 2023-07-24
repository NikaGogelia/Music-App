import "./likes.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LikeContextProvider from "../../context/LikeContextProvider";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import MusicTable from "../../components/music-table/MusicTable";
import Pagination from "@mui/material/Pagination";

function Likes() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const { baseApi, accessToken, fetchData } = useRootContext();

  const limit = 50;

  const requestConfig = {
    enabled: !!accessToken,
    refetchOnWindowFocus: true,
    staleTime: 0,
  };

  const handleChangePagination = (_, value) => {
    setPage(value);
    setOffset(() => (value - 1) * limit);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // GET Liked Songs
  const {
    data: likedSongsData,
    isLoading,
    refetch,
  } = useQuery(
    ["liked-songs", offset],
    () => fetchData(`${baseApi}/me/tracks?limit=${limit}&offset=${offset}`),
    requestConfig
  );

  if (isLoading) return <Loader />;
  return (
    <div className="likes">
      <div className="likes-details-container d-flex">
        <LazyLoadImage
          className="likes-image"
          effect="blur"
          src="/assets/images/likes.png"
          alt="likes-img"
        />
        <div className="likes-details d-flex flex-column justify-content-end align-items-start">
          <h6 className="d-flex align-items-center">Playlist</h6>
          <h1>Liked Songs</h1>
          <div className="likes-info d-flex align-items-center">
            <span>{likedSongsData?.total} Songs</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <DetailPageOptions />
        <div className="likes-search-bar">
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
            onChange={handleSearchChange}
            placeholder="Search in playlist"
            value={search}
          />
        </div>
      </div>
      <LikeContextProvider refetch={refetch}>
        <MusicTable data={likedSongsData} content="playlist" search={search} />
      </LikeContextProvider>
      <Pagination
        className="liked-songs-pagination"
        onChange={handleChangePagination}
        page={page}
        count={parseInt(Math.ceil(likedSongsData?.total / 50))}
      />
    </div>
  );
}

export default Likes;
