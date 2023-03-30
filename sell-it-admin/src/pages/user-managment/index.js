import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { getUsers } from "../../api/users";
import Table from "../../components/table";

const Index = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then((res) => {
        console.log(res);
        setAllUsers(res.data?.response?.users?.results);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
        }}
      >
        User Management
      </Typography>
      <Table data={allUsers} />
    </div>
  );
};
export default Index;
