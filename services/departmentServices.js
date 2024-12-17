import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get departments
export const getDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments`);
  return response;
};

// Function to add a department
export const addDepartment = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addDepartment`,
      payload // Send { name: "AnyDepartment" }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};



export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteDepartment/${id}`);
    return response.data;  // Returning the response data
  } catch (error) {
    console.error('Error in deleting department:', error);
    throw error;  // Ensure error is thrown so it can be caught elsewhere
  }
};

