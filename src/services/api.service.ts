import { globalaxiosInstance, protectedaxiosInstance } from "./axiosSetup";

export const getProfileDetails = (id: any) => {
  return protectedaxiosInstance.get(`/user/${id}`);
};

export const patchProfileDetails = (filter: any) => {
  return protectedaxiosInstance.patch(`/user`, filter);
};

export const registerApi = (data: any) => {
  return globalaxiosInstance.post(`/user/register`, data);
};

export const loginApi = (data: any) => {
  return globalaxiosInstance.post(`/user/login`, data);
};

export const ChatListApi = (id: string) => {
  return protectedaxiosInstance.get(`/message/chat-list/${id}`);
};

export const chatApi = (data: any) => {
  return protectedaxiosInstance.post(`/message/chat`, data);
};

export const sendMessageApi = (data: any) => {
  return protectedaxiosInstance.post(`/message`, data);
};

export const searchUserApi = (username: string) => {
  return protectedaxiosInstance.get(`/user/search/${username}`);
};

export const clearChatApi = (data: any) => {
  return protectedaxiosInstance.post(`/message/clear-chat`, data);
};

export const GroupListApi = (id: string) => {
  return protectedaxiosInstance.get(`/group/group-list/${id}`);
};

export const NewGroupApi = (data: any) => {
  return globalaxiosInstance.post(`/group/newgroup`, data);
};
