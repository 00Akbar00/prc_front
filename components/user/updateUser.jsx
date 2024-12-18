import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select
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
        setDepartments(
          departmentsResponse?.data?.departments?.map((dept) => ({
            value: dept.id,
            label: dept.name,
          })) || []
        );
        setRoles(
          rolesResponse?.data?.roles?.map((role) => ({
            value: role.id,
            label: role.name,
          })) || []
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (userId) => {
    const updatedUser = users.find((user) => user.id === userId);
    try {
      await updateUser(userId, updatedUser);
      alert("User updated successfully!");
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
    }
  };

  const handleMultiSelectChange = (userId, field, selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: selectedIds } : user
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
            <th style={styles.tableHeader}>Departments</th>
            <th style={styles.tableHeader}>Roles</th>
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
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id
                          ? { ...u, name: e.target.value }
                          : u
                      )
                    )
                  }
                  style={styles.inputField}
                />
              </td>
              {/* Email (non-editable) */}
              <td style={styles.tableCell}>{user.email}</td>

              {/* Multi-select Departments */}
              <td style={styles.tableCell}>
                <Select
                  isMulti
                  value={departments.filter((dept) =>
                    user.departments?.includes(dept.value)
                  )}
                  options={departments}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(user.id, "departments", selectedOptions)
                  }
                  styles={styles.selectField}
                />
              </td>

              {/* Multi-select Roles */}
              <td style={styles.tableCell}>
                <Select
                  isMulti
                  value={roles.filter((role) =>
                    user.roles?.includes(role.value)
                  )}
                  options={roles}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(user.id, "roles", selectedOptions)
                  }
                  styles={styles.selectField}
                />
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
