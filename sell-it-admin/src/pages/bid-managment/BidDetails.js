import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";

import { getProductById } from "../../api/products";
import ImageSlider from "../../components/reusable/Stepper";
import Stepper from "../../components/Stpper";

const BidDetails = () => {
  const [details, setDetails] = useState({
    images: [],
    title: "",
    createdAt: "",
  });
  const loc = useParams();
  const { bidId } = loc;

  useEffect(() => {
    if (bidId) {
      getProductById(bidId)
        .then((res) => {
          setDetails(res.data?.response?.product);
          console.log(res.data?.response?.product);
        })
        .catch((err) => console.log(err));
    }
  }, [bidId]);

  const images = details
    ? details?.images?.map((i, id) => ({
        lebel: `Image ${id}`,
        imgPath: i.uri,
      }))
    : [];

  return (
    <div>
      <Typography variant="h5">Bid details</Typography>
      <Box>
        <Grid container>
          <Grid xs={12}>
            <Typography variant="h6">{details?.title}</Typography>
            <Typography color={"gray"} variant="subtitle2">
              {details?.createdAt
                ? new Date(details?.createdAt).toLocaleString()
                : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {images.length > 0 && <ImageSlider images={images} />}
          </Grid>
          <Grid item xs={6}>
            {details?.description}
          </Grid>
          <Grid
            sx={{
              marginY: 2,
            }}
            item
            xs={8}
          >
            <Stepper />
          </Grid>
        </Grid>

        <Typography variant="h6"></Typography>
      </Box>
    </div>
  );
};

export default BidDetails;
