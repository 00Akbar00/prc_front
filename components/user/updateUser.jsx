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
