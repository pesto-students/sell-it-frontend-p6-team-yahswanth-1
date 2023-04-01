import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import BidManagmentCard from "../../components/reusable/BidManagmentCard";
import { getAllProducts } from "../../api/products";
import NoBidsFound from "./NoBidsFound";
import { Title } from "../../components/reusable/Title";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Index = () => {
  const [value, setValue] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByType = (type) => {
    return allProducts.filter((f) => f.orderStatus === type);
  };

  const getProucts = () => {
    setOpen(true);
    getAllProducts()
      .then((res) => {
        setAllProducts(res.data?.response?.products?.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setOpen(false));
  };

  useEffect(() => {
    getProucts();
  }, []);

  return (
    <div>
      <Title text="Bid Management" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Picked up date estimated" {...a11yProps(1)} />
          <Tab label="Picked up" {...a11yProps(2)} />
          <Tab label="Paid" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <Grid container spacing={2}>
            {filterByType(1).length > 0 ? (
              filterByType(1).map((details) => {
                return (
                  <Grid item xs={6}>
                    <BidManagmentCard
                      id={details?._id}
                      url={details?.images[0]?.uri}
                      title={details?.title}
                      type={details?.type}
                      description={details?.description}
                      createdAt={new Date(details?.createdAt).toLocaleString()}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoBidsFound />
            )}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <Grid container spacing={2}>
            {filterByType(2).length > 0 ? (
              filterByType(2).map((details) => {
                return (
                  <Grid item xs={6}>
                    <BidManagmentCard
                      id={details?._id}
                      url={details?.images[0]?.uri}
                      title={details?.title}
                      type={details?.type}
                      description={details?.description}
                      createdAt={new Date(details?.createdAt).toLocaleString()}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoBidsFound />
            )}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <Grid container spacing={2}>
            {filterByType(3).length > 0 ? (
              filterByType(3).map((details) => {
                return (
                  <Grid item xs={6}>
                    <BidManagmentCard
                      id={details?._id}
                      url={details?.images[0]?.uri}
                      title={details?.title}
                      type={details?.type}
                      description={details?.description}
                      createdAt={new Date(details?.createdAt).toLocaleString()}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoBidsFound />
            )}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <Grid container spacing={2}>
            {filterByType(4).length > 0 ? (
              filterByType(4).map((details) => {
                return (
                  <Grid item xs={6}>
                    <BidManagmentCard
                      id={details?._id}
                      url={details?.images[0]?.uri}
                      title={details?.title}
                      type={details?.type}
                      description={details?.description}
                      createdAt={new Date(details?.createdAt).toLocaleString()}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoBidsFound />
            )}
          </Grid>
        </Box>
      </TabPanel>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Index;
