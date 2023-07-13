import "./music-table.css";
import { useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import AlbumTableCell from "../music-table-cell/AlbumTableCell";
import ArtistTableCell from "../music-table-cell/ArtistsTableCell";
import PlaylistTableCell from "../music-table-cell/PlaylistTableCell";

function MusicTable({ data, content }) {
  const [isShowMore, setIsShowMore] = useState(false);

  function renderTableSwitch() {
    switch (content) {
      case "album":
        return (
          <>
            <TableHead className="table-head">
              <TableRow>
                <TableCell align="center" width="2%">
                  #
                </TableCell>
                <TableCell align="left" width="88%">
                  Title
                </TableCell>
                <TableCell align="right" width="10%">
                  <svg
                    title="Duration"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6V10L13 13M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                      stroke="#a7a7a7"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data?.items.map((item) => (
                <AlbumTableCell key={item.id} track={item} content={content} />
              ))}
            </TableBody>
          </>
        );
      case "artist":
        const renderedTracks = isShowMore
          ? data?.tracks.slice(0)
          : data?.tracks.slice(0, 5);
        return (
          <>
            <TableHead className="table-head">
              <TableRow>
                <TableCell align="center" width="2%"></TableCell>
                <TableCell align="center" width="3%"></TableCell>
                <TableCell align="left" width="85%"></TableCell>
                <TableCell align="right" width="10%"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {renderedTracks?.map((item, index) => (
                <ArtistTableCell
                  key={item.id}
                  track={item}
                  index={index}
                  content={content}
                />
              ))}
            </TableBody>
          </>
        );
      case "playlist":
        console.log(data);
        return (
          <>
            <TableHead className="table-head">
              <TableRow>
                <TableCell align="center" width="2%">
                  #
                </TableCell>
                <TableCell align="center" width="3%"></TableCell>
                <TableCell align="left" width="60%">
                  Title
                </TableCell>
                <TableCell align="left" width="17%">
                  Album
                </TableCell>
                <TableCell align="left" width="10%">
                  Date Added
                </TableCell>
                <TableCell align="right" width="8%">
                  <svg
                    title="Duration"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6V10L13 13M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                      stroke="#a7a7a7"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data?.items.map((item, index) => (
                <PlaylistTableCell
                  key={item.id}
                  track={item.track}
                  dateAdded={item.added_at}
                  content={content}
                  index={index}
                />
              ))}
            </TableBody>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="music-table animate__fadeInLeft">
      {content === "artist" && <h4 className="music-table-header">Popular</h4>}
      <TableContainer className={`table-container ${content}`}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {renderTableSwitch()}
        </Table>
      </TableContainer>
      {content === "artist" && (
        <button className="see-more" onClick={() => setIsShowMore(!isShowMore)}>
          {isShowMore ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default MusicTable;
