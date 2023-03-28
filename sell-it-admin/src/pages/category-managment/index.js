import React, { useEffect, useState } from "react";

import { getCategoryListing } from "../../api/products";

const CategoryManagmentPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    getCategoryListing()
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
};
export default CategoryManagmentPage;
