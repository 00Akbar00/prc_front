import React from 'react';

const DeleteUser = ({ formData, handleInputChange, handleDeleteUser, styles }) => {
  return (
    <form style={styles.form} onSubmit={handleDeleteUser}>
      <h2>Delete User</h2>
      <div style={styles.formGroup}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.deleteButton}>
        Delete User
      </button>
    </form>
  );
};

export default DeleteUser;
