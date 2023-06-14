import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PlayButton from "../play-button/PlayButton";

function MusicCard({ data, content }) {
  const { album, images, name, artists } = data;
  const { url } = content === "track" ? album?.images[0] : images[0];

  // console.log(data);
  const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "100%",
  };

  return (
    <div className="music-card card animate__fadeIn">
      <Link
        to={`/player/album/${name}`}
        state={{
          data: data,
          content: content,
        }}
      >
        <LazyLoadImage
          className="card-img-top"
          effect="blur"
          src={url}
          alt="card-img"
        />
      </Link>
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
          {artists.map((artist) =>
            artists.indexOf(artist) === artists.length - 1
              ? artist.name
              : artist.name + ", "
          )}
        </Typography>
      </div>
    </div>
  );
}

export default MusicCard;
