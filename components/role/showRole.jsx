import React, { useState, useEffect } from "react";
import { getRoles } from "../../services/roleServices";
import { getPermissions } from "../../services/permissionServices";
import { assignPermissionsToRole } from "../../services/permissionServices"; 
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../../styles/styles";

const ShowRoleList = ({ styles }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [buttonLoading, setButtonLoading] = useState({}); // Track loading state for each button

  // Fetch roles and permissions when the component mounts
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const roleResponse = await getRoles();
        const permissionResponse = await getPermissions();

        setRoles(roleResponse.data.roles);
        setPermissions(
          permissionResponse.data.permissions.map((permission) => ({
            value: permission.id,
            label: permission.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roles or permissions:", error);
        setLoading(false);
      }
    };

    fetchRolesAndPermissions();
  }, []);

  // Handle permission changes for each role
  const handlePermissionChange = (roleId, selectedPermissions) => {
    setRolePermissions((prev) => ({
      ...prev,
      [roleId]: selectedPermissions,
    }));
  };

  // Handle assigning permissions to a role
  const handleAssignPermissions = async (roleId) => {
    const selectedPermissions = rolePermissions[roleId] || [];
    const permissionIds = selectedPermissions.map((permission) => permission.value);

    // Set button loading state
    setButtonLoading((prev) => ({ ...prev, [roleId]: true }));

    try {
      const response = await assignPermissionsToRole(roleId, permissionIds);

      console.log(`Permissions assigned to role ${roleId}:`, response.data);
      toast.success("Permissions successfully assigned!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error assigning permissions:", error);
      toast.error("Failed to assign permissions. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
    } finally {
      // Reset button loading state
      setButtonLoading((prev) => ({ ...prev, [roleId]: false }));
    }
  };

  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div style={styles.tableContainer}>
      <h2 style={{ fontWeight: "bold" }}>Roles</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Role ID</th>
            <th style={styles.tableHeader}>Role Name</th>
            <th style={styles.tableHeader}>Permissions</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td style={styles.tableCell}>{role.id}</td>
              <td style={styles.tableCell}>{role.name}</td>
              <td style={styles.tableCell}>
                <Select
                  isMulti
                  name={`permissions-${role.id}`}
                  options={permissions}
                  value={rolePermissions[role.id] || []}
                  onChange={(selected) =>
                    handlePermissionChange(role.id, selected)
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </td>
              <td style={styles.tableCell}>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: buttonLoading[role.id] ? "#6c757d" : "#007bff", // Change background color when loading
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: buttonLoading[role.id] ? "not-allowed" : "pointer", // Disable cursor
                  }}
                  onClick={() => handleAssignPermissions(role.id)}
                  disabled={buttonLoading[role.id]} // Disable button when loading
                >
                  {buttonLoading[role.id] ? "Assigning..." : "Assign Permissions"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        theme="colored"
        style={{
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default ShowRoleList;

