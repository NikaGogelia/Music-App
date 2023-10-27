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
