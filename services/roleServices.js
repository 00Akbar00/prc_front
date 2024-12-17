import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get roles
export const getRoles = async () => {
  const response = await axios.get(`${API_BASE_URL}/roles`);
  return response;
};

// Function to add a role
export const addRole = async (roleData) => {
  const response = await axios.post(`${API_BASE_URL}/addRole`, roleData);
  return response;
};

// Function to delete a role
export const deleteRole = async (roleId) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteRole/${roleId}`);
  return response;
};
