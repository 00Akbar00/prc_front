import React, { useState, useEffect } from "react";
import { getRoles } from "../../services/roleServices";
import { getPermissions } from "../../services/permissionServices";
import { assignPermissionsToRole } from "../../services/permissionServices"; 
import Select from "react-select";
import { styles } from "../../styles/styles";

const ShowRoleList = ({ styles }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});

  // Fetch roles and permissions when the component mounts
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const roleResponse = await getRoles();
        const permissionResponse = await getPermissions();

        // Log permissions for debugging
        console.log("Permissions:", permissionResponse.data.permissions);

        // Update state with roles and permissions
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

    try {
      // Send API request to assign permissions to the role
      const response = await assignPermissionsToRole(roleId, permissionIds);

      console.log(`Permissions assigned to role ${roleId}:`, response.data);
      alert("Permissions successfully assigned!");
    } catch (error) {
      console.error("Error assigning permissions:", error);
      alert("Failed to assign permissions. Please try again.");
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
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAssignPermissions(role.id)} // Button click to assign permissions
                >
                  Assign Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRoleList;
