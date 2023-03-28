import { client } from "./client";
import authHeader from "./authServices";
const authHead = authHeader();
export const getUsers = async (email, passsord) => {
  const response = await client.get("/users", {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const getUserById = async (userId) => {
  const response = await client.get(`/users/${userId}`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};
