import React, { useState } from 'react';
import { addDepartment } from '../../services/departmentServices'; // your API service
import { styles } from '../../styles/styles';

const AddDepartment = ({ styles }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    departmentName: '', // Store the department name
  });

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the departmentName dynamically
    });
  };

 // Function to handle the form submission
 const handleFormSubmit = async (e) => {
  e.preventDefault(); 

  const name = formData.departmentName; 

  console.log(name); 

  if (!name) {
    alert('Please enter a department name');
    return;
  }

  try {
    // Send { name: "AnyDepartment" } in the payload
    const response = await addDepartment({ name });

    if (response.success) {
      alert('Department added successfully');
    } else {
      alert('Failed to add department: ' + response.message);
    }
  } catch (error) {
    alert('An error occurred while adding the department');
    console.error(error);
  }
};
  
  

  return (
    <form style={styles.form} onSubmit={handleFormSubmit}>
      <h2>Add Department</h2>
      <div style={styles.formGroup}>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          value={formData.departmentName || ''} // Ensure formData is initialized
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Add Department
      </button>
    </form>
  );
};

export default AddDepartment;
