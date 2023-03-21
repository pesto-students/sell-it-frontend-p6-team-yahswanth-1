import { client } from "./client";
export const login = async (email, passsord) => {
  const response = await client.post(
    "/admin/login",
    {
      email,
      passsord,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response;
};
