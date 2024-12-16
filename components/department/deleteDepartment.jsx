import React, { useState } from 'react';
import { deleteDepartment } from '../../services/departmentServices'; // API service to delete department
import { styles } from '../../styles/styles'; // Styles for the component

const DeleteDepartment = () => {
  
  const [departmentId, setDepartmentId] = useState('');

  
  const handleInputChange = (event) => {
    setDepartmentId(event.target.value); 
  };

  
  const handleDeleteDepartment = async (event) => {
    event.preventDefault(); 

    // Validate input: Make sure departmentId is not empty
    if (!departmentId) {
      return alert('Please enter a valid Department ID');
    }

    try {
      // Call the delete API function and pass the departmentId
      const response = await deleteDepartment(departmentId);
      
      // Display a success message on successful deletion
      alert(response?.message || 'Department deleted successfully');
      
      // Reset the input field after successful deletion
      setDepartmentId('');
    } catch (error) {
      // Handle any errors and display an error message
      console.error('Error deleting department:', error);
      //alert('Failed to delete department');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleDeleteDepartment}>
      <h2>Delete Department</h2>
      
      <div style={styles.formGroup}>
        <label htmlFor="departmentId">Department ID:</label>
        <input
          type="text"
          id="departmentId"
          name="departmentId"
          value={departmentId} // Use state value for input field
          onChange={handleInputChange} // Handle input change
          required
          style={styles.input}
        />
      </div>
      
      <button type="submit" style={styles.deleteButton}>
        Delete Department
      </button>
    </form>
  );
};

export default DeleteDepartment;
