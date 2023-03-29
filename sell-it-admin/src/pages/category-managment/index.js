import React, { useEffect, useState } from "react";

import { getCategoryListing } from "../../api/products";
import List from "../../components/reusable/List";
import { Typography, Button, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CategoryManagmentPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getCategoryListing()
      .then((res) => {
        setAllCategories(res.data?.response?.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <>
      <div>
        <Typography>All Categories</Typography>

        <List list={allCategories} />
        {/* <Button variant="contained" onClick={handleClickOpen}>
          Add new category
        </Button> */}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <Input
            type="text"
            value={categoryName}
            placeholder="Category name"
            onChange={onChangeCategoryName}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CategoryManagmentPage;
