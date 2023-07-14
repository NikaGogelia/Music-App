import "./playlist.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Loader from "../../components/loader/Loader";
import DetailPageOptions from "../../components/detail-page-options/DetailPageOptions";
import MusicTable from "../../components/music-table/MusicTable";
import ArtistsName from "../../components/artists-name/ArtistsName";

function Playlist() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { accessToken, fetchData, numberWithCommas } = useRootContext();

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

  if (isLoading) return <Loader />;

  const { images, name, owner, followers, description, tracks, type } =
    playlistData;

  return (
    <div className="playlist">
      <div className="playlist-details-container d-flex">
        <LazyLoadImage
          className="playlist-image"
          effect="blur"
          src={images[0].url}
          alt="playlist-img"
        />
        <div className="playlist-details d-flex flex-column justify-content-end align-items-start">
          <h6 className="d-flex align-items-center">{type}</h6>
          <h1>{name}</h1>
          <h6 className="d-flex align-items-center">{description}</h6>
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
        <DetailPageOptions content={content} />
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
            onChange={handleSearchChange}
            placeholder="Search in playlist"
            value={search}
          />
        </div>
      </div>
      <MusicTable data={tracks} content={content} search={search} />
    </div>
  );
}

export default Playlist;
