import axios from "axios";

// Function to get departments
export const getDepartments = async () => {
  const response = await axios.get("http://localhost:8082/Departments");
  return response;
};

// Function to add a department
export const addDepartment = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/addDepartment",
      payload // Send { name: "AnyDepartment" }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};



export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8082/deleteDepartment/${id}`);
    return response.data;  // Returning the response data
  } catch (error) {
    console.error('Error in deleting department:', error);
    throw error;  // Ensure error is thrown so it can be caught elsewhere
  }
};

