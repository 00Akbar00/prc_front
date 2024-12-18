import React, { useState, useEffect } from "react";
import { getUsers, updateUser } from "../../services/userServices";
import { getDepartments } from "../../services/departmentServices";
import { getRoles } from "../../services/roleServices";

const UpdateUsers = ({ styles }) => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getUsers();
        const departmentsResponse = await getDepartments();
        const rolesResponse = await getRoles();

        setUsers(usersResponse?.data?.users || []);
        setDepartments(departmentsResponse?.data?.departments || []);
        setRoles(rolesResponse?.data?.roles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle update of a user
  const handleUpdate = async (userId) => {
    const updatedUser = users.find((user) => user.id === userId);
    try {
      await updateUser(userId, updatedUser); // Call your API to update the user
      alert("User updated successfully!");
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
    }
  };

  // Handle change in editable fields
  const handleInputChange = (e, userId, field) => {
    const { value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  // Handle department and role selection
  const handleSelectChange = (e, userId, field) => {
    const { value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  if (loading) {
    return <div>Loading users, departments, and roles...</div>;
  }

  return (
    <div style={styles.tableContainer}>
      <h2>Update Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Role</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Editable Name */}
              <td style={styles.tableCell}>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleInputChange(e, user.id, "name")}
                  style={styles.inputField}
                />
              </td>

              {/* Email (non-editable) */}
              <td style={styles.tableCell}>
                <input
                type="email"
                value={user.email}
                onChange={(e) => handleInputChange(e, user.id, "email")}
                style={styles.inputField}
                />
             </td>
              {/* Department Dropdown */}
              <td style={styles.tableCell}>
                <select
                  value={user.departmentId || ""}
                  onChange={(e) => handleSelectChange(e, user.id, "departmentId")}
                  style={styles.selectField}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </td>

              {/* Role Dropdown */}
              <td style={styles.tableCell}>
                <select
                  value={user.roleId || ""}
                  onChange={(e) => handleSelectChange(e, user.id, "roleId")}
                  style={styles.selectField}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>

              {/* Update Button */}
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleUpdate(user.id)}
                  style={styles.updateButton}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateUsers;
