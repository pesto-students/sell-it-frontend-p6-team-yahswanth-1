import React, { useEffect, useState } from "react";

import { getCategoryListing } from "../../api/products";
import List from "../../components/reusable/List";
import { Typography, Button, Input, Skeleton, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Title } from "../../components/reusable/Title";

const CategoryManagmentPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setLoading(true);
    getCategoryListing()
      .then((res) => {
        setAllCategories(res.data?.response?.categories);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <>
      <div>
        <Title text="Category managment" />
        {loading ? (
          <Box>
            <Skeleton animation="wave" width={200} height={50} />
            <Skeleton animation="wave" width={200} height={50} />
            <Skeleton animation="wave" width={200} height={50} />
            <Skeleton animation="wave" width={200} height={50} />
            <Skeleton animation="wave" width={200} height={50} />
          </Box>
        ) : (
          <List list={allCategories} />
        )}

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
