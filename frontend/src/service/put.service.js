import axios from "axios";
const BASE_URI = import.meta.env.VITE_PUBLIC_API_URL;

export const putRegister = async (obj) => {
  try {
    const res = await axios.put(`${BASE_URI}/register`, obj);
    return res?.data;
  } catch (error) {
    // console.error(error.message);
    return error.response.data.error;
  }
};
