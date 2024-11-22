import { axiosInstance } from "./createToken.service";
const BASE_URI = import.meta.env.VITE_PUBLIC_API_URL;

export const postLogin = async (obj) => {
  try {
    const res = await axiosInstance.post(`${BASE_URI}/send-code`, obj);
    return res?.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export const postVeryfiycation = async (obj) => {
  try {
    const res = await axiosInstance.post(`${BASE_URI}/verify-code`, obj);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
