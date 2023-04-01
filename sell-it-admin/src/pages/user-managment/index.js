import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { getUsers } from "../../api/users";
import Table from "../../components/table";
import { Title } from "../../components/reusable/Title";

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
      <Title text="User managment" />
      <Table data={allUsers} />
    </div>
  );
};
export default Index;
