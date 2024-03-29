import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PlayButton from "../play-button/PlayButton";
import ArtistsName from "../artists-name/ArtistsName";

const textStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "block",
  maxWidth: "100%",
};

function MusicCard({ data, content }) {
  if (data !== null) {
    const { [content === "playlist" ? "owner" : "artists"]: artistInfo } = data;

    return (
      <div className="music-card card animate__fadeIn">
        <Link
          className="image-link"
          to={
            content === "playlist"
              ? `/player/playlist/${data?.id}`
              : content === "track"
              ? `/player/track/${data?.id}`
              : `/player/album/${data?.id}`
          }
          state={{
            data: data,
            content: content,
          }}
        >
          {data?.album?.images[0]?.url === undefined &&
          data?.images[0]?.url === undefined ? (
            <div className="card-img-top d-flex justify-content-center align-items-center">
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
              className="card-img-top"
              effect="blur"
              src={
                content === "track"
                  ? data?.album?.images[0]?.url
                  : data?.images[0]?.url
              }
              alt="card-img"
            />
          )}
        </Link>
        <PlayButton />
        <div className="card-body">
          <Typography
            noWrap
            sx={textStyles}
            className="card-title"
            variant="h4"
          >
            {data?.name}
          </Typography>
          <ArtistsName artists={artistInfo} content={content} />
        </div>
      </div>
    );
  }
}

export default MusicCard;
