import "./music-table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AlbumTableCell from "../album-table-cell/AlbumTableCell";

function MusicTable({ data }) {
  const { items } = data;

  console.log(items);
  return (
    <div className="music-table">
      <TableContainer className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            </TableRow>
          </TableHead>
          <div className="table-margin"></div>
          <TableBody className="table-body">
            {items.map((item) => (
              <AlbumTableCell key={item.track_number} track={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MusicTable;
