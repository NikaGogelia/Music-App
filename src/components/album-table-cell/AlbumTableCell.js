import "./album-table-cell.css";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function AlbumTableCell({ track }) {
  const { track_number, name, artists, duration_ms } = track;

  const seconds = Math.floor((duration_ms / 1000) % 60).toString();
  const minutes = Math.floor((duration_ms / (1000 * 60)) % 60).toString();
  
  return (
    <TableRow className="album-table-cell">
      <TableCell align="center" className="index">
        {track_number}
      </TableCell>
      <TableCell
        align="left"
        className="d-flex flex-column justify-content-center"
      >
        <span className="album-cell-title">{name}</span>
        <span className="album-cell-artists">{artists.map((artist) => artist.name)}</span>
      </TableCell>
      <TableCell align="right">
        {minutes}:{seconds.length > 1 ? seconds : 0 + seconds}
      </TableCell>
    </TableRow>
  );
}

export default AlbumTableCell;
