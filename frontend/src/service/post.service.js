import axios from "axios";
import { axiosInstance } from "./createToken.service";
const BASE_URI = import.meta.env.VITE_PUBLIC_API_URL;

export const postRegister = async (obj) => {
  try {
    const res = await axios.post(`${BASE_URI}/register`, obj);
    return res?.data;
  } catch (error) {
    // console.error(error.message);
    return error.response.data.error;
  }
};

export const postLogin = async (obj) => {
  try {
    const res = await axios.post(`${BASE_URI}/login`, obj);
    return res?.data;
  } catch (error) {
    // console.error(error.message);
    return error.response.data.error;
  }
};
