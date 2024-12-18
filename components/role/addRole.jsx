import React, { useState } from 'react';
import { addRole } from '../../services/roleServices'; // your API service to add role
import * as Yup from 'yup'; // Yup for validation

const AddRole = ({ styles }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    roleName: '', // Store the role name
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Yup validation schema
  const validationSchema = Yup.object({
    roleName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]*$/, 'Role name must only contain letters') // Restrict to letters and spaces
      .required('Role name is required'),
  });

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update roleName dynamically
    });
  };

  // Function to handle the form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous errors
      setErrors({});

      // Validate the formData using Yup
      await validationSchema.validate(formData, { abortEarly: false });

      // Send { name: "AnyRole" } in the payload
      const response = await addRole({ name: formData.roleName });

      if (response.status === 201) {
        alert('Role added successfully');
        // Reset form
        setFormData({ roleName: '' });
      } else {
        alert('Failed to add role: ' + response.message);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Extract and set validation errors
        const validationErrors = error.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setErrors(validationErrors); // Update errors state
      } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
      }
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
          style={styles.input}
        />
        {/* Show error message for roleName */}
        {errors.roleName && <div style={{ color: 'red' }}>{errors.roleName}</div>}
      </div>
      <button type="submit" style={styles.submitButton}>
        Add Role
      </button>
    </form>
  );
};

export default AddRole;
