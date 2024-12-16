import React from 'react';

const AddUser = ({ formData, handleInputChange, handleFormSubmit, styles, departments, roles }) => {
  return (
    <form style={styles.form} onSubmit={handleFormSubmit}>
      <h2>Add User</h2>
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
      <div style={styles.formGroup}>
        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
          style={styles.select}
        >
          <option value="">Select Department</option>
          
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
          style={styles.select}
        >
          <option value="">Select Role</option>
         
        </select>
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default AddUser;
