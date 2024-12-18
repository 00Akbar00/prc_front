import React, { useState } from 'react';
import { addDepartment } from '../../services/departmentServices'; // your API service
import * as Yup from 'yup'; // Yup for validation
import { styles } from '../../styles/styles';

const AddDepartment = ({ styles }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    departmentName: '', // Store the department name
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Yup validation schema
  const validationSchema = Yup.object({
    departmentName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]*$/, 'Department name must only contain letters')
      .required('Department name is required'),
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

    try {
      // Clear previous errors
      setErrors({});

      // Validate the formData using Yup
      await validationSchema.validate(formData, { abortEarly: false });

      const name = formData.departmentName;

      console.log(name);

      // Send { name: "AnyDepartment" } in the payload
      const response = await addDepartment({ name });

      if (response.success) {
        alert('Department added successfully');
      } else {
        alert('Failed to add department: ' + response.message);
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
      <h2>Add Department</h2>
      <div style={styles.formGroup}>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          value={formData.departmentName || ''} // Ensure formData is initialized
          onChange={handleInputChange}
          style={styles.input}
        />
        {/* Show error message for departmentName */}
        {errors.departmentName && <div style={{ color: 'red' }}>{errors.departmentName}</div>}
      </div>
      <button type="submit" style={styles.submitButton}>
        Add Department
      </button>
    </form>
  );
};

export default AddDepartment;
