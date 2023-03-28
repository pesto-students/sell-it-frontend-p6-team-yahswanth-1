import React, { useEffect, useState } from "react";

import Table from "../../components/table";
import { pendingProducts } from "../../api/products";
import { Typography } from "@mui/material";
import BidCard from "../../components/reusable/BidCard";

import Empty from "../../assets/img/undraw_Sunlight.png";

const Home = () => {
  const [pendingBids, setPendingBids] = useState([]);
  useEffect(() => {
    pendingProducts()
      .then((res) => {
        console.log(res.data.response.products.results);
        setPendingBids(res.data?.response?.products?.results);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Typography>Pending bids</Typography>
      <div>
        {pendingBids.length > 0 ? (
          pendingBids.map((bid) => {
            return <BidCard />;
          })
        ) : (
          <div>
            <img src={Empty} className="no-bid" alt="no bids found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
