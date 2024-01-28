import { setAccessToken } from "@/redux/features/user-slice";
import { store } from "@/redux/store";
import axios from "axios";


export const protectedaxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
export const globalaxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const requestHandler = (request: any) => {
  request.headers.Authorization = `Bearer ${store.getState().user.accessToken}`;
  return request;
};

const responseHandler = (response: any) => {
  return response;
};

protectedaxiosInstance.interceptors.request.use((request) =>
  requestHandler(request)
);

protectedaxiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  function (error) {
    const originalRequest: any = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url ===
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/refresh`
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().user.refreshToken;
      return globalaxiosInstance
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/refresh`, {
          user_name: store.getState().user.user.user_name,
          refreshToken: refreshToken,
        })
        .then((res) => {
          console.log("res",res.status)
          if (res.status === 200) {
            store.dispatch(setAccessToken(res.data.accessToken));
            protectedaxiosInstance.defaults.headers.common["authorization"] =
              "Bearer " + store.getState().user.accessToken;
            return protectedaxiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);