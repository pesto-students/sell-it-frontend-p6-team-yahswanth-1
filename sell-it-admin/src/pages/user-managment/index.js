import React, { useEffect, useState } from "react";

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
    <div>
      <h2> User managment </h2>
      <Table data={allUsers} />
    </div>
  );
};
export default Index;
