import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PlayButton from "../play-button/PlayButton";

function ArtistCard({ data, content }) {
  const { images, name, id, type } = data;

  const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "100%",
  };

  return (
    <div className="artist-card card animate__fadeIn">
      <Link
        className="image-link"
        to={`/player/artist/${id}`}
        state={{
          data: data,
          content: content,
        }}
      >
        {images[0]?.url === undefined ? (
          <div className="card-img-top d-flex justify-content-center align-items-center">
            <svg
              role="img"
              height={24}
              width={24}
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="m13.363 10.474-.521.625a2.499 2.499 0 0 0 .67 3.766l.285.164a5.998 5.998 0 0 1 1.288-1.565l-.573-.33a.5.5 0 0 1-.134-.754l.52-.624a7.372 7.372 0 0 0 1.837-4.355 7.221 7.221 0 0 0-.29-2.489 5.644 5.644 0 0 0-3.116-3.424A5.771 5.771 0 0 0 6.753 2.87a5.7 5.7 0 0 0-1.19 2.047 7.22 7.22 0 0 0-.29 2.49 7.373 7.373 0 0 0 1.838 4.355l.518.622a.5.5 0 0 1-.134.753L3.5 15.444a5 5 0 0 0-2.5 4.33v2.231h13.54a5.981 5.981 0 0 1-1.19-2H3v-.23a3 3 0 0 1 1.5-2.6l3.995-2.308a2.5 2.5 0 0 0 .67-3.766l-.521-.625a5.146 5.146 0 0 1-1.188-4.918 3.71 3.71 0 0 1 .769-1.334 3.769 3.769 0 0 1 5.556 0c.346.386.608.84.768 1.334.157.562.22 1.146.187 1.728a5.379 5.379 0 0 1-1.373 3.188zm7.641-1.173a1 1 0 0 0-1 1v4.666h-1a3 3 0 1 0 3 3v-7.666a.999.999 0 0 0-1.003-1h.003zm-1 8.666a1 1 0 1 1-1-1h1v1z" />
            </svg>
          </div>
        ) : (
          <LazyLoadImage
            className="card-img-top"
            effect="blur"
            src={images[0]?.url}
            alt="card-img"
          />
        )}
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
          {type}
        </Typography>
      </div>
    </div>
  );
}

export default ArtistCard;
