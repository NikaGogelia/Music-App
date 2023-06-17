import "./artists-name.css";
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const textStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "block",
  maxWidth: "100%",
};

function ArtistsName({ artists }) {
  return (
    <Typography noWrap sx={textStyles} className="artists-name" variant="body1">
      {artists.map((artist) => (
        <Fragment key={artist.id}>
          <Link
            to={`/player/artist/${artist.name}`}
            state={{ data: artist }}
          >
            {artists.indexOf(artist) === artists.length - 1
              ? artist.name
              : artist.name + ","}
          </Link>{" "}
        </Fragment>
      ))}
    </Typography>
  );
}

export default ArtistsName;
