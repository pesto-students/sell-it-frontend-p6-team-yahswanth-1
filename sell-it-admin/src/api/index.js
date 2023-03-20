import { client } from "./client";
export const login = async (email, passsord) => {
  const response = await client.post(
    "/login",
    {
      email,
      passsord,
    },
    {}
  );
  return response;
};
