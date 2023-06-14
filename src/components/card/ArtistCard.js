import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Typography from "@mui/material/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayButton from "../play-button/PlayButton";

function ArtistCard({ data }) {
  const { images, name, type } = data;
  const { url } = images[0];

  const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "100%",
  };

  return (
    <div className="artist-card card animate__fadeIn">
      <LazyLoadImage
        className="card-img-top"
        effect="blur"
        src={url}
        alt="card-img"
      />
      <PlayButton />
      <div className="card-body">
        <Typography noWrap sx={textStyles} className="card-title" variant="h4">
          {name}
        </Typography>
        <Typography
          noWrap
          sx={textStyles}
          className="card-text"
          variant="body1"
        >
          {type}
        </Typography>
      </div>
    </div>
  );
}

export default ArtistCard;
