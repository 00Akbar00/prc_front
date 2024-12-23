import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getPermissions = async () => {
    const response = await axios.get(`http://localhost:8082/permissions`);
    return response;
};

export const assignPermissionsToRole = async (roleId, permissionIds) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/assign-permissions`,
        { roleId, permissions: permissionIds }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };