import { client } from "./client";
import authHeader from "./authServices";
const authHead = authHeader();
export const pendingProducts = async (pageNo) => {
  const response = await client.get(`/products/pending?page=${pageNo}`, {
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

export const getAllProducts = async (pageNo, bidStatus) => {
  const response = await client.get(
    `/products?bidStatus=${bidStatus}&page=${pageNo}`,
    {
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        ...authHead,
      },
    }
  );
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

export const addNewBid = async (body) => {
  const response = await client.post(`/admin/products/bid`, body, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};
