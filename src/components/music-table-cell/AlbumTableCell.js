import "./music-table-cell.css";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import LikeButton from "../like-button/LikeButton";
import MoreOptionsButton from "../more-options-button/MoreOptionsButton";
import { Link } from "react-router-dom";
import ArtistsName from "../artists-name/ArtistsName";

function AlbumTableCell({ track, content }) {
  const { track_number, name, artists, duration_ms } = track;

  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);

  const seconds = Math.floor((duration_ms / 1000) % 60).toString();
  const minutes = Math.floor((duration_ms / (1000 * 60)) % 60).toString();

  return (
    <TableRow
      className="album-table-cell music-table-cell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TableCell align="center" className="index-cell">
        {hover ? (
          !play ? (
            <svg
              onClick={() => setPlay(true)}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.555 9.036L14.752 11.168C14.889 11.2593 15.0013 11.384 15.0789 11.5292C15.1566 11.6743 15.1972 11.8364 15.1972 12.001C15.1972 12.1656 15.1566 12.3277 15.0789 12.4728C15.0013 12.618 14.889 12.7417 14.752 12.833L11.555 14.965C11.4044 15.0655 11.2293 15.1232 11.0485 15.132C10.8677 15.1408 10.6879 15.1003 10.5282 15.0149C10.3686 14.9295 10.2352 14.8023 10.1421 14.647C10.0491 14.4917 9.99998 14.314 10 14.133V9.87C9.99961 9.68879 10.0485 9.51087 10.1414 9.35528C10.2342 9.19968 10.3677 9.07224 10.5274 8.9866C10.687 8.90095 10.867 8.8603 11.048 8.869C11.229 8.8777 11.4043 8.93543 11.555 9.036Z"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442Z"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              onClick={() => setPlay(false)}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9V15M14 9V15M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        ) : (
          <div className="index d-flex justify-content-center align-items-center">
            {track_number}
          </div>
        )}
      </TableCell>
      <TableCell align="left">
        <div className="d-flex flex-column justify-content-center">
          <span className="music-cell-title">
            <Link
              to={`/player/track/${name}`}
              state={{
                data: track,
                content: "track",
              }}
            >
              {name}
            </Link>
          </span>
          <span className="music-cell-artists">
            <ArtistsName artists={artists} content={content} />
          </span>
        </div>
      </TableCell>
      <TableCell align="right">
        {minutes}:{seconds.length > 1 ? seconds : 0 + seconds}
      </TableCell>
      <TableCell align="center" className="table-cell-options">
        <div className="d-flex align-items-center">
          <LikeButton />
          <MoreOptionsButton content={"track-album"} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default AlbumTableCell;
