import "./pagination.css";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, TablePagination } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function Pagination({
  data,
  rowsPerPage,
  page,
  setPage,
  setOffset,
  setRowsPerPage,
  refetch,
}) {
  const handleChangePagination = (_, value) => {
    const offsetVal = value * rowsPerPage;
    sessionStorage.setItem("likes-table-page", value);
    sessionStorage.setItem("likes-table-offset", offsetVal);
    setPage(value);
    setOffset(() => offsetVal);
    refetch();
  };

  const handleChangeRowsPerPage = (event) => {
    sessionStorage.setItem(
      "likes-table-rows",
      parseInt(event.target.value, 10)
    );
    sessionStorage.setItem("likes-table-page", 0);
    sessionStorage.setItem("likes-table-offset", 0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setOffset(0);
    setTimeout(() => refetch(), 1500);
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  return (
    <TablePagination
      className="pagination"
      rowsPerPageOptions={[10, 20, 50]}
      component="div"
      count={data?.total}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePagination}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
}

export default Pagination;
