import React, { useEffect, useState } from "react";
import { Skeleton, Typography, Box } from "@mui/material";

import { getUsers } from "../../api/users";
import Table from "../../components/table";
import { Title } from "../../components/reusable/Title";

const EmptyUsers = () => {
  <Box>
    <Skeleton animation="wave" width={300} height={100} />
    <Skeleton animation="wave" width={300} height={100} />
    <Skeleton animation="wave" width={300} height={100} />
  </Box>;
};

const Index = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = () => {
    setLoading(true);
    getUsers()
      .then((res) => {
        console.log(res);
        setAllUsers(res.data?.response?.users?.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div
      style={{
        padding: 2,
      }}
    >
      <Title text="User managment" />
      {loading ? <EmptyUsers /> : <Table data={allUsers} />}
    </div>
  );
};
export default Index;
