import { client } from "./client";
import authHeader from "./authServices";
const authHead = authHeader();
export const getUsers = async (pageNo) => {
  const response = await client.get(`/users/?page=${pageNo}`, {
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

export const blockUserById = async (body) => {
  const response = await client.post(`/admin/users/block`, body, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};
