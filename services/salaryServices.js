import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addSalary = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/salary/addSalary`, payload);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};