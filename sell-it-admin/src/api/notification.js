import { client } from "./client";
import authHeader from "./authServices";
const authHead = authHeader();
export const getAllNotifications = async (page) => {
  const response = await client.get(`/users/notifications?page=${page}`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const getNotificationsUnReadCount = async () => {
  const response = await client.get(`/users/notifications/unread/count`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const deleteAllNotifications = async (body) => {
  const response = await client.delete(`/users/notifications`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};

export const deleteNotificationById = async (id) => {
  const response = await client.delete(`/users/notifications/${id}`, {
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHead,
    },
  });
  return response;
};
