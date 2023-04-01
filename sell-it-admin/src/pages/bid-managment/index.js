import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Pagination } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import BidManagmentCard from "../../components/reusable/BidManagmentCard";
import { getAllProducts } from "../../api/products";
import NoBidsFound from "./NoBidsFound";
import { Title } from "../../components/reusable/Title";

const tabs = ["Pending", "Picked up date estimated", "Picked up", "Paid"];

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
  const [value, setValue] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const getProucts = (pno, tab) => {
    setOpen(true);
    getAllProducts(pno, tab)
      .then((res) => {
        console.log(res?.data);
        setAllProducts(res.data?.response?.products?.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setOpen(false));
  };

  const handleChange = (event, newValue) => {
    console.log({ newValue });
    setValue(newValue);
    getProucts(1, newValue + 1);
  };

  const filterByType = (type) => {
    return allProducts.filter((f) => f.orderStatus === type);
  };

  const onPageChange = (e, pageNo) => {
    getProucts(pageNo, value + 1);
  };

  useEffect(() => {
    getProucts(1, 1);
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
          {tabs.map((tab, tabId) => (
            <Tab key={tab} label={tab} {...a11yProps(tabId)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, tabId) => (
        <TabPanel key={tab} value={value} index={tabId}>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "70vh",
            }}
          >
            <Grid container spacing={2}>
              {allProducts.length > 0 ? (
                allProducts.map((details) => {
                  return (
                    <Grid item xs={6}>
                      <BidManagmentCard
                        id={details?._id}
                        url={details?.images[0]?.uri}
                        title={details?.title}
                        type={details?.type}
                        description={details?.description}
                        createdAt={new Date(
                          details?.createdAt
                        ).toLocaleString()}
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
      ))}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Pagination count={totalPage} color="primary" onChange={onPageChange} />
    </div>
  );
};

export default Index;
