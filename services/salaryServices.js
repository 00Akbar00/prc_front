import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getSalary = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/salary/getSalary`, {
            params: { userId: userId }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const addSalary = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/salary/addSalary`, payload);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const deleteSalary = async (salaryId) => {
    try {
      if (!salaryId) {
        throw new Error("Salary ID is required."); // Validate salaryId
      }
      const response = await axios.delete(`${API_BASE_URL}/api/salary/deleteSalary/${salaryId}`);
      return { success: true, data: response.data }; // Return successful response
    } catch (error) {
      console.error("Error in deleteSalary:", error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };
  
  
