import "./music-table.css";
import { useState } from "react";
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

function MusicTable({ data, content, search }) {
  // Artist Table Features
  const [isShowMore, setIsShowMore] = useState(false);

  // Playlist Table Features
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");

  function handleRequestSort(_, property) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function compareValues(valueA, valueB) {
    if (valueA < valueB) {
      return 1;
    }
    if (valueA > valueB) {
      return -1;
    }
    return 0;
  }

  function descendingComparator(a, b, orderBy) {
    switch (orderBy) {
      case "title":
        return compareValues(a.track.name, b.track.name);

      case "album":
        return compareValues(a.track.album.name, b.track.album.name);

      case "date-added":
        return compareValues(a.added_at, b.added_at);

      case "duration":
        return compareValues(a.track.duration_ms, b.track.duration_ms);
      default:
        return 0;
    }
  }

  function sortedData(array, comparator) {
    const sorted = array?.map((el, index) => [el, index]);
    sorted?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });

    return sorted
      ?.map((el) => el[0])
      ?.filter(
        (item) =>
          item?.track.name.toLowerCase().includes(search.toLowerCase()) ||
          item?.track.album.name.toLowerCase().includes(search.toLowerCase()) ||
          item?.track.artists
            .find((artist) =>
              artist.name.toLowerCase().includes(search.toLowerCase())
            )
            ?.name.toLowerCase()
            .includes(search.toLowerCase())
      );
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => {
          return descendingComparator(a, b, orderBy);
        }
      : (a, b) => {
          return -descendingComparator(a, b, orderBy);
        };
  }

  // Render Different Table Content
  function renderTableSwitch() {
    switch (content) {
      // Album Table
      case "album":
        const albumTracks = data?.items;
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
              {albumTracks?.map((item) => (
                <AlbumTableCell key={item.id} track={item} content={content} />
              ))}
            </TableBody>
          </>
        );

      // Artist Table
      case "artist":
        const artistTracks = isShowMore
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
              {artistTracks?.map((item, index) => (
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

      // Playlist Table
      case "playlist":
        const playlistTracks = sortedData(
          data?.items,
          getComparator(order, orderBy)
        );

        if (playlistTracks?.length === 0) return null;
        return (
          <>
            <TableHead className="table-head">
              <TableRow>
                <TableCell align="center" width="2%">
                  #
                </TableCell>
                <TableCell align="center" width="3%"></TableCell>
                <TableCell
                  align="left"
                  width="50%"
                  sortDirection={orderBy === "title" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="left"
                  width="29%"
                  sortDirection={orderBy === "album" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "album"}
                    direction={orderBy === "album" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "album")}
                  >
                    Album
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="left"
                  width="10%"
                  sortDirection={orderBy === "date-added" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "date-added"}
                    direction={orderBy === "date-added" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "date-added")}
                  >
                    Date Added
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  width="5%"
                  sortDirection={orderBy === "duration" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "duration"}
                    direction={orderBy === "duration" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "duration")}
                  >
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
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {playlistTracks?.map((item, index) => (
                <PlaylistTableCell
                  key={item.track.id}
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
        <Table>{renderTableSwitch()}</Table>
      </TableContainer>
      {content === "artist" && data?.tracks?.length >= 5 && (
        <button className="see-more" onClick={() => setIsShowMore(!isShowMore)}>
          {isShowMore ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default MusicTable;
