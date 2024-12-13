import axios from "../utils/axios";

export const getDepartments = async (payload) => {
    const response = await axios.post("/amazon/token", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  };