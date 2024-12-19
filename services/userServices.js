import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get users with their departments and roles
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/Users`);
  return response;
};

// Function to add a user
// userServices.js

export const createUser = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addUser`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};



// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (id, payload) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateUser/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

