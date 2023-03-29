import { client } from "./client";
import authHeader from "./authServices";
const authHead = authHeader();
export const pendingProducts = async () => {
  const response = await client.get("/products/pending", {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const getCategoryListing = async () => {
  const response = await client.get("/products/categories", {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const getAllProducts = async () => {
  const response = await client.get("/products", {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const getProductById = async (id) => {
  const response = await client.get(`/products/${id}`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};
