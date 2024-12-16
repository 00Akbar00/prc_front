import React, { useState } from 'react';
import { deleteRole } from '../../services/roleServices'; // API service to delete role
import { styles } from '../../styles/styles'; // Styles for the component

const DeleteRole = () => {
  
  const [roleId, setRoleId] = useState('');  // Changed departmentId to roleId

  const handleInputChange = (event) => {
    setRoleId(event.target.value);  // Update state for roleId
  };

  const handleDeleteRole = async (event) => {
    event.preventDefault(); 

    // Validate input: Make sure roleId is not empty
    if (!roleId) {
      return alert('Please enter a valid Role ID');
    }

    try {
      // Call the delete API function and pass the roleId
      const response = await deleteRole(roleId);  // Call deleteRole instead of deleteDepartment
      
      // Display a success message on successful deletion
      alert(response?.message || 'Role deleted successfully');
      
      // Reset the input field after successful deletion
      setRoleId('');
    } catch (error) {
      // Handle any errors and display an error message
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleDeleteRole}>  {/* Handle deleteRole */}
      <h2>Delete Role</h2>  {/* Change heading to Delete Role */}
      
      <div style={styles.formGroup}>
        <label htmlFor="roleId">Role ID:</label>  {/* Change label to Role ID */}
        <input
          type="text"
          id="roleId"  
          name="roleId" 
          value={roleId}  // Use state value for input field
          onChange={handleInputChange}  // Handle input change
          required
          style={styles.input}
        />
      </div>
      
      <button type="submit" style={styles.deleteButton}>
        Delete Role  {/* Change button text to Delete Role */}
      </button>
    </form>
  );
};

export default DeleteRole;
