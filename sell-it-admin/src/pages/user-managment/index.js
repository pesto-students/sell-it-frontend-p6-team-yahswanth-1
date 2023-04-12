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
  const [totalResult, setTotalResult] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getAllUsers = (pageNo) => {
    setLoading(true);
    getUsers(pageNo)
      .then((res) => {
        console.log(res);
        setAllUsers(res.data?.response?.users?.results);
        setTotalResult(res.data?.response?.users?.totalResults);
        setTotalPage(res.data?.response?.users?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllUsers(1);
  }, []);

  const onPageChange = (no) => {
    getAllUsers(no);
  };

  return (
    <div
      style={{
        padding: 2,
      }}
    >
      <Title text="User managment" />
      {loading ? (
        <EmptyUsers />
      ) : (
        <Table
          data={allUsers}
          totalResult={totalResult}
          totalPage={totalPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
export default Index;
