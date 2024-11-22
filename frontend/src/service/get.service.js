import { axiosInstance } from "./createToken.service";
const BASE_URI = import.meta.env.VITE_PUBLIC_API_URL;

export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`${BASE_URI}/user/${id}`);
    return res?.data;
  } catch (error) {
    return error.response.data.error;
  }
};
