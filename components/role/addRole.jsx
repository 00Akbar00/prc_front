import React, { useState } from 'react';
import { addRole } from '../../services/roleServices'; // your API service to add role
import { styles } from '../../styles/styles';

const AddRole = ({ styles }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    roleName: '', // Store the role name
  });

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the roleName dynamically
    });
  };

  // Function to handle the form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = formData.roleName;

    if (!name) {
      alert('Please enter a role name');
      return;
    }

    try {
      // Send { name: "AnyRole" } in the payload
      const response = await addRole({ name });

      if (response.status == 201) {
        alert('Role added successfully');
      } else {
        alert('Failed to add role: ' + response.message);
      }
    } catch (error) {
      alert('An error occurred while adding the role');
      console.error(error);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleFormSubmit}>
      <h2>Add Role</h2>
      <div style={styles.formGroup}>
        <label htmlFor="roleName">Role Name:</label>
        <input
          type="text"
          id="roleName"
          name="roleName"
          value={formData.roleName || ''} // Ensure formData is initialized
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Add Role
      </button>
    </form>
  );
};

export default AddRole;
