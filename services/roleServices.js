import axios from "axios";

// Function to get roles
export const getRoles = async () => {
  const response = await axios.get("http://localhost:8082/roles");
  return response;
};

// Function to add a role
export const addRole = async (roleData) => {
  const response = await axios.post("http://localhost:8082/addRole", roleData);
  return response;
};

// Function to delete a role
export const deleteRole = async (roleId) => {
  const response = await axios.delete(`http://localhost:8082/deleteRole/${roleId}`);
  return response;
};
