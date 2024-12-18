import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../services/userServices'; // Assuming you have these services
import { styles } from '../../styles/styles'; // Styles for the page

const UserListWithDelete = () => {
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(true); // State for loading state

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users); // Store the fetched users
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return; // Confirm before deleting
    }

    try {
      const response = await deleteUser(userId); // Call the delete API function
      alert(response?.message || 'User deleted successfully');

      // Update the users list by filtering out the deleted user
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  // Display loading message if data is still being fetched
  if (loading) {
    return <div>Loading users...</div>;
  }

  // Render the user list, excluding rows where the user's role is "Admin"
  return (
    <div style={styles.tableContainer}>
      <h2>Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User ID</th>
            <th style={styles.tableHeader}>User Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            // Filter out users with the "Admin" role
            .filter((user) =>
              user.roles && !user.roles.some((role) => role.name === 'Admin')
            )
            .map((user) => (
              <tr key={user.id}>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(user.id)} // Call handleDelete with user ID
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

export default UserListWithDelete;
