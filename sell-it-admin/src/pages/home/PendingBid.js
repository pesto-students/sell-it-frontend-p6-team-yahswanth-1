import React, { useEffect, useState } from "react";

import Table from "../../components/table";
import { pendingProducts } from "../../api/products";
import { Typography } from "@mui/material";
import BidCard from "../../components/reusable/BidCard";
import { Grid, Box, Skeleton } from "@mui/material";
import { Title } from "../../components/reusable/Title";
import Empty from "../../assets/img/undraw_Sunlight.png";

const Home = () => {
  const [pendingBids, setPendingBids] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    pendingProducts()
      .then((res) => {
        console.log(res.data.response.products.results);
        setPendingBids(res.data?.response?.products?.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Title text="Pending bids" />

      <div
        className="mt-2"
        style={{
          overflowY: "auto",
          maxHeight: "76vh",
        }}
      >
        {!loading ? (
          pendingBids.length > 0 ? (
            <Grid container spacing={2}>
              {pendingBids.map((bid) => {
                return (
                  <Grid item xs={6}>
                    <BidCard
                      userId={bid?.createdByDetails?._id}
                      name={bid?.title}
                      description={bid?.description}
                      image={bid?.images[0]?.uri}
                      category={bid?.category?.name}
                      createdAt={bid?.createdAt}
                      createdBy={bid?.createdByDetails?.name}
                      createdByEmail={bid?.createdByDetails?.email}
                      bidId={bid?._id}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <div>
              <img src={Empty} className="no-bid" alt="no bids found" />
            </div>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Home;
