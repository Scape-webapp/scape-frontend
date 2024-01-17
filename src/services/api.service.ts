import { globalaxiosInstance, protectedaxiosInstance } from "./axiosSetup";

export const getProfileDetails = (id: any) => {
  return globalaxiosInstance.get(`/user/${id}`);
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

export const chatApi = (data: any) => {
  return globalaxiosInstance.post(`/message/chat`, data);
};

export const sendMessageApi = (data: any) => {
  return globalaxiosInstance.post(`/message`, data);
};
