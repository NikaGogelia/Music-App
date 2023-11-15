import "./artists-name.css";
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const textStyles = {
  maxWidth: "50em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function ArtistsName({ artists, content }) {
  return (
    <Typography noWrap sx={textStyles} className="artists-name" variant="body1">
      {content === "playlist" ? (
        <Link
        // to={`/player/artist/${artists.display_name}`}
        // state={{ data: artists, content: "artist" }}
        >
          {artists?.display_name}
        </Link>
      ) : (
        artists?.map((artist) => (
          <Fragment key={artist.id}>
            <Link
              to={`/player/artist/${artist.name}`}
              state={{ data: artist, content: "artist" }}
            >
              {artists.indexOf(artist) === artists.length - 1
                ? artist.name
                : artist.name + ","}
            </Link>
            &nbsp;
          </Fragment>
        ))
      )}
    </Typography>
  );
}

export default ArtistsName;
