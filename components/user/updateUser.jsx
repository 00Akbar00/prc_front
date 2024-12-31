import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select
import { getUsers, updateUser, deleteUser } from "../../services/userServices";
import { getDepartments } from "../../services/departmentServices";
import { getRoles } from "../../services/roleServices";
import { Modal, Button } from 'react-bootstrap';
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
    userToDelete: null, // User ID to delete
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch users for the current page
        const usersResponse = await getUsers(currentPage );
        console.log(usersResponse)
        const { users, totalPages } = usersResponse.data;
  
        // Fetch departments and roles (only needed once)
        const departmentsResponse = await getDepartments();
        const rolesResponse = await getRoles();
  
        const initialFormValues = {};
        users.forEach((user) => {
          initialFormValues[user.id] = {
            name: user.name,
            email: user.email,
            departments: user.departments?.map((dept) => dept.id) || [],
            roles: user.roles?.map((role) => role.id) || [],
          };
        });
  
        // Update state
        setUsers(users);
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
        setFormValues(initialFormValues);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage]); 
  

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page state
  };
  
  

  const handleShowModal = (userId) => {
    setModal({
      isOpen: true,
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      userToDelete: userId,
    });
  };

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false, userToDelete: null }));
  };

  const handleConfirmDelete = async () => {
    const { userToDelete } = modal;
    if (userToDelete) {
      await handleDelete(userToDelete);
      setModal({
        isOpen: false,
        title: "",
        message: "",
        userToDelete: null,
      });
    }
  };
  
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
    try {
      const response = await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId)); // Update user list
      setModal({
        isOpen: true,
        title: "Success",
        message: response?.message || "User deleted successfully!",
        userToDelete: null,
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Failed to delete user. Please try again later.",
        userToDelete: null,
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
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2>Update Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Name
            </th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Email
            </th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Departments
            </th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Roles
            </th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Actions
            </th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>
              Delete User
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  name="name"
                  value={formValues[user.id]?.name || ""}
                  onChange={(e) => handleChange(user.id, "name", e.target.value)}
                  style={{ padding: '5px', width: '100%' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
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
                  styles={{ control: (provided) => ({ ...provided, width: '100%' }) }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
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
                  styles={{ control: (provided) => ({ ...provided, width: '100%' }) }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleUpdate(user.id)}
                  type="button"
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleShowModal(user.id)} // Trigger modal for the current user
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     {/* Pagination */}
     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: currentPage === 1 ? "#e9ecef" : "#007bff",
            color: currentPage === 1 ? "#6c757d" : "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px", fontSize: "16px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: currentPage === totalPages ? "#e9ecef" : "#007bff",
            color: currentPage === totalPages ? "#6c757d" : "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          Next
        </button>
      </div>
  
      {/* Modal for Confirming Deletion */}
      <Modal
  show={modal.isOpen}
  onHide={handleCloseModal}
  style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the modal vertically and horizontally
    zIndex: '1050', // Ensure the modal stays on top of other content
    width: '400px', // Set a fixed width for better design
    borderRadius: '8px', // Add rounded corners for a smooth look
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow for better visual depth
    backgroundColor: 'white', // White background for the modal
    padding: '20px', // Add padding for internal spacing
  }}
>
  <Modal.Header
    closeButton
    style={{
      backgroundColor: '#fafafa',
      padding: '15px 20px',
      borderBottom: '2px solid #e0e0e0',
      borderTopLeftRadius: '8px', // Rounded top corners
      borderTopRightRadius: '8px',
    }}
  >
    <Modal.Title
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#333', // Darker title color for contrast
        textAlign: 'center',
      }}
    >
      {modal.title}
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      padding: '21px 15px',
      fontSize: '16px',
      color: 'black', // Lighter color for the message text
      textAlign: 'center',
    }}
  >
    {modal.message}
  </Modal.Body>
  
  <Modal.Footer
    style={{
      backgroundColor: '#fafafa',
      padding: '15px 20px',
      borderTop: '2px solid #e0e0e0',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    }}
  >
    <Button
      variant="secondary"
      onClick={handleCloseModal}
      style={{
        padding: '10px 20px',
        backgroundColor: '#ccc',
        border: 'none',
        borderRadius: '25px', // Rounded button edges
        color: '#333',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s, transform 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#b3b3b3')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#ccc')}
    >
      No
    </Button>
    <Button
      variant="danger"
      onClick={handleConfirmDelete}
      style={{
        padding: '10px 20px',
        backgroundColor: '#f44336',
        border: 'none',
        color: 'white',
        borderRadius: '25px', // Rounded button edges
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        marginLeft: '10px',
        transition: 'background-color 0.3s, transform 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#f44336')}
    >
      Yes
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
  
};

export default UpdateUsers;
