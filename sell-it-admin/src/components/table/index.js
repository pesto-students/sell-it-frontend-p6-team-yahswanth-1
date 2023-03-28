import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, TextareaAutosize } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { blockUserById } from "../../api/users";
import { toast } from "react-hot-toast";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "createdAt", label: "Created", minWidth: 100 },
  {
    id: "block",
    label: "Block/Unblock",
    minWidth: 170,
  },
];

function createData(name, email, createdAt, block) {
  return { name, email, block, createdAt };
}

export default function StickyHeadTable(props) {
  const data = props?.data ?? [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reason, setReason] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const blockUser = (e, id) => {
    setSelectedUser(id);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };
  const rows = data.map((user) =>
    createData(
      user.accountHolderName,
      user.email,
      new Date(user.createdAt).toLocaleString(),
      <Button
        variant="outlined"
        color="secondary"
        onClick={(e) => blockUser(e, user._id)}
      >
        Block
      </Button>
    )
  );

  const blockSelectedUser = () => {
    const body = {
      id: selectedUser,
      isReported: true,
      reason: reason,
    };
    blockUserById(body)
      .then((res) => {
        toast.success("User is blocked");
      })
      .catch((err) => console.log(err));
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-4 flex flex-col">
          <TextareaAutosize
            minRows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button
            sx={{
              marginTop: 1,
            }}
            variant="outlined"
            onClick={blockSelectedUser}
          >
            Block user
          </Button>
        </div>
      </Popover>
    </>
  );
}
