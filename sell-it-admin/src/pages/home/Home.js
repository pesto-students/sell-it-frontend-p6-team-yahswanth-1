import React from "react";
import { Box } from "@mui/material";
import PendingBids from "./PendingBid";

const Home = () => {
  return (
    <>
      <div>
        <Box>
          <PendingBids />
        </Box>

        <div></div>
      </div>
    </>
  );
};

export default Home;
