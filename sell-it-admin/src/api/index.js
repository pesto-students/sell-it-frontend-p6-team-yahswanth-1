import { client } from "./client";
export const login = async (email, password) => {
  const response = await client.post(
    "/admin/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response;
};
