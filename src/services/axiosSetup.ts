import axios from "axios";

export const protectedaxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
export const globalaxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const requestHandler = (request: any) => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return request;
};


const responseHandler = (response: any) => {
  return response;
};

protectedaxiosInstance.interceptors.request.use((request) =>
  requestHandler(request)
);