import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userServices';
import { getRoles } from '../../services/roleServices';
import { getDepartments } from '../../services/departmentServices';

const AddUser = ({ styles }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    departments: [], // Array for multiple selected departments
    roles: [], // Array for multiple selected roles
  });
  const [departments, setDepartments] = useState([]); // Departments from backend
  const [roles, setRoles] = useState([]); // Roles from backend
  const [loading, setLoading] = useState(true); // Loading state for API calls

  // Fetch departments and roles when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await getDepartments();
        setDepartments(departmentsResponse?.data || []); // Ensure it's an array
        const rolesResponse = await getRoles();
        setRoles(rolesResponse?.data || []); // Ensure it's an array
        setLoading(false); // Data is fetched, no longer loading
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle multi-select changes (for roles and departments)
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData(prevData => ({
      ...prevData,
      [name]: selectedValues,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData); // Assuming createUser is an API function
      alert('User created successfully!');
      // Optionally, reset form data or navigate to another page
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  if (loading) {
    return <div>Loading departments and roles...</div>; // Show loading message while fetching
  }

  return (
    <form style={styles.form} onSubmit={handleFormSubmit}>
      <h2>Add User</h2>
      
      {/* Name Input */}
      <div style={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>

      {/* Email Input */}
      <div style={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>

      {/* Password Input */}
      <div style={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>

      {/* Department Select */}
      <div style={styles.formGroup}>
        <label htmlFor="departments">Departments:</label>
        <select
          id="departments"
          name="departments"
          multiple
          value={formData.departments}
          onChange={handleSelectChange}
          required
          style={styles.select}
        >
          <option value="">Select Departments</option>
          {Array.isArray(departments) && departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>

      {/* Role Select */}
      <div style={styles.formGroup}>
        <label htmlFor="roles">Roles:</label>
        <select
          id="roles"
          name="roles"
          multiple
          value={formData.roles}
          onChange={handleSelectChange}
          required
          style={styles.select}
        >
          <option value="">Select Roles</option>
          {Array.isArray(roles) && roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default AddUser;