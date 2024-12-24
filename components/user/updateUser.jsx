import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select
import { getUsers, updateUser, deleteUser } from "../../services/userServices";
import { getDepartments } from "../../services/departmentServices";
import { getRoles } from "../../services/roleServices";
import * as Yup from "yup";

const UpdateUsers = ({ styles }) => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({}); // Store validation errors
  const [modal, setModal] = useState({
    isOpen: false, // Controls modal visibility
    title: "", // Title for the modal
    message: "", // Message to display
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getUsers();
        const departmentsResponse = await getDepartments();
        const rolesResponse = await getRoles();

        const initialFormValues = {};
        usersResponse?.data?.users?.forEach((user) => {
          initialFormValues[user.id] = {
            name: user.name,
            email: user.email,
            departments: user.departments?.map((dept) => dept.id) || [],
            roles: user.roles?.map((role) => role.id) || [], // Extract role IDs
          };
        });
  
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
        setFormValues(initialFormValues); // Set initial form values
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // Yup schema for validation
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Name must not contain numbers or special characters"),
    departments: Yup.array()
      .of(Yup.number().positive("Invalid department ID"))
      .min(1, "At least one department must be selected"),
    roles: Yup.array()
      .of(Yup.number().positive("Invalid role ID"))
      .min(1, "At least one role must be selected"),
  });

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "" });
  };
  
  const validateFields = async (userId) => {
    try {
      await validationSchema.validate(formValues[userId], { abortEarly: false });
      setErrors((prev) => ({ ...prev, [userId]: {} })); // Clear errors if validation passes
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors((prev) => ({ ...prev, [userId]: formattedErrors }));
      return false;
    }
  };

  const handleUpdate = async (userId) => {
    const isValid = await validateFields(userId);
    if (!isValid) return;

    try {
      const user = formValues[userId];
      await updateUser(userId, {
        id: userId,
        name: user.name,
        email: user.email, // Email remains non-editable
        departmentIds: user.departments, // Pass department IDs
        roleIds: user.roles, // Pass role IDs
      });
      alert("User updated successfully!");
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      const response = await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId)); // Update user list
      setModal({
        isOpen: true,
        title: "Success",
        message: response?.message || "User deleted successfully!",
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Failed to delete user. Please try again later.",
      });
    }
  };
  

  const handleChange = (userId, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
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
            <th style={styles.tableHeader}>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Editable Name */}
              <td style={styles.tableCell}>
                <input
                  type="text"
                  name="name"
                  value={formValues[user.id]?.name || ""}
                  onChange={(e) => handleChange(user.id, "name", e.target.value)}
                  style={styles.inputField}
                />
                {errors[user.id]?.name && (
                  <div style={styles.errorText}>{errors[user.id].name}</div>
                )}
              </td>

              {/* Email (non-editable) */}
              <td style={styles.tableCell}>{user.email}</td>

              {/* Multi-select Departments */}
              <td style={styles.tableCell}>
                <Select
                  isMulti
                  name="departments"
                  value={departments.filter((dept) =>
                    formValues[user.id]?.departments.includes(dept.value)
                  )}
                  options={departments}
                  onChange={(selectedOptions) =>
                    handleChange(
                      user.id,
                      "departments",
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  styles={styles.selectField}
                />
                {errors[user.id]?.departments && (
                  <div style={styles.errorText}>{errors[user.id].departments}</div>
                )}
              </td>

              {/* Multi-select Roles */}
              <td style={styles.tableCell}>
                <Select
                  isMulti
                  name="roles"
                  value={roles.filter((role) =>
                    formValues[user.id]?.roles.includes(role.value)
                  )}
                  options={roles}
                  onChange={(selectedOptions) =>
                    handleChange(
                      user.id,
                      "roles",
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  styles={styles.selectField}
                />
                {errors[user.id]?.roles && (
                  <div style={styles.errorText}>{errors[user.id].roles}</div>
                )}
              </td>

              {/* Update Button */}
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleUpdate(user.id)}
                  type="button"
                  style={styles.updateButton}
                >
                  Update
                </button>
              </td>

              {/* Delete Button */}
              <td style={styles.tableCell}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(user.id)} // Call handleDelete with user ID
                  >
                    Delete
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
