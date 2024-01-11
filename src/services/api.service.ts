import { globalaxiosInstance, protectedaxiosInstance } from "./axiosSetup";

export const getProfileDetails = (filter: any) => {
  return globalaxiosInstance.get(`/user/${filter.id}`);
};

export const patchProfileDetails = (filter: any) => {
  return globalaxiosInstance.patch(`/user`, filter);
};

export const registerApi = (data: any) => {
  return globalaxiosInstance.post(`/user/register`, data);
};

export const loginApi = (data: any) => {
  return globalaxiosInstance.post(`/user/login`, data);
};

export const ChatListApi = (id: string) => {
  return globalaxiosInstance.get(`/message/chat-list/${id}`);
};
