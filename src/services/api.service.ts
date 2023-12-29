import { globalaxiosInstance, protectedaxiosInstance } from "./axiosSetup";

export const getProfileDetails = (filter: any) => {
  return globalaxiosInstance.get(`/user/${filter.id}`);
};

export const patchProfileDetails = (filter: any) => {
  return globalaxiosInstance.patch(`/user`,filter);
};