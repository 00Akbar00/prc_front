import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get users with their departments and roles
export const getUsers = async (page) => {
  const response = await axios.get(`${API_BASE_URL}/api/user/Users`, {
    params: { page }, // Pass page directly, not as a nested object
  });
  return response;
};



// Function to add a user
// userServices.js

export const createUser = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/addUser`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};



// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/user/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (id, payload) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user/updateUser/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

