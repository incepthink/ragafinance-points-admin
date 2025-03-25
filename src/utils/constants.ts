import axios from "axios";

export const BackendUrl = "https://ragafinancepoints.mooo.com";

export const testAddress = "0x4142676ec5706706D3a0792997c4ea343405376b";

export const clientAxios = axios.create();

clientAxios.interceptors.request.use((config) => {
  config.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY || "";
  return config;
});
