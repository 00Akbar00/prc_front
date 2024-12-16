import axios from "axios";

// Function to get users with their departments and roles
export const getUsers = async () => {
  const response = await axios.get("http://localhost:8082/Users");
  return response;
};

// Function to add a user
export const addUser = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/addUser",
      payload // Send user data: { name, email, password, departmentId, roleId }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8082/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
