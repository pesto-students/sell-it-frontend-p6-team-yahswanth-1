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
