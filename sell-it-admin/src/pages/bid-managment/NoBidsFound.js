import { Typography } from "@mui/material";
import React from "react";

import NotFound from "../../assets/img/undraw_Sunlight.png";

const NoBidsFound = () => {
  return (
    <div>
      <Typography>No bids found</Typography>
      <img alt="no bid" src={NotFound} className="not-found" />
    </div>
  );
};

export default NoBidsFound;
