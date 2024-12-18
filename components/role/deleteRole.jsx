import React, { useState, useEffect } from 'react';
import { getRoles, deleteRole } from '../../services/roleServices'; // Role service functions
import { styles } from '../../styles/styles'; // Updated styles

const RoleListWithDelete = () => {
  const [roles, setRoles] = useState([]); // State for the role list
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch roles when the component loads
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data.roles); // Populate role list
        setLoading(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Function to handle deletion of a role
  const handleDelete = async (roleId) => {
    if (!window.confirm('Are you sure you want to delete this role?')) {
      return; // Confirm before deleting
    }

    try {
      // Call the delete API function
      const response = await deleteRole(roleId);
      alert(response?.message || 'Role deleted successfully');

      // Update the role list after deletion
      setRoles(roles.filter((role) => role.id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  // Show a loading message while fetching data
  if (loading) {
    return <div>Loading roles...</div>;
  }

  // Render the role list with a delete button for each role
  return (
    <div style={styles.tableContainer}>
      <h2>Roles</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Role ID</th>
            <th style={styles.tableHeader}>Role Name</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>{/* Use role.id as the key */}
              <td style={styles.tableCell}>{role.id}</td>
              <td style={styles.tableCell}>{role.name}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.deleteButton} // Use a red button style
                  onClick={() => handleDelete(role.id)} // Call handleDelete with role ID
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

export default RoleListWithDelete;
