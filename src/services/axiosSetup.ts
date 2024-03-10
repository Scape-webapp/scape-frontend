import { logout, setAccessToken } from "@/redux/features/user-slice";
import { store } from "@/redux/store";
import axios from "axios";
import { toast } from "react-toastify";

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
  async function (error) {
    const originalRequest: any = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url ===
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh`
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().user.refreshToken;
      return await globalaxiosInstance
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh`, {
          user_name: store.getState().user.user.user_name,
          userId: store.getState().user.user._id,
          token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            store.dispatch(setAccessToken(res.data.accessToken));
            protectedaxiosInstance.defaults.headers.common["authorization"] =
              "Bearer " + store.getState().user.accessToken;
            return protectedaxiosInstance(originalRequest);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error("Login Session Expired!");
            // logout user
            store.dispatch(logout());
          }
        });
    }
    return Promise.reject(error);
  }
);
