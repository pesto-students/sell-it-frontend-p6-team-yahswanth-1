import { client } from "./client";
export const getAllUsers = async () => {
  const response = await client.get("/admin/users", {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};

export const getUserById = async (userId) => {
  const response = await client.get(`/users/${userId}`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};
