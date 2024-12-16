import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/userServices";

const ShowUsers = ({ styles }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div style={styles.tableContainer}>
      <h2>Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Password</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.password}</td>
              <td style={styles.tableCell}>
                {/* Joining all department names with commas */}
                {user.departments && user.departments.length > 0
                  ? user.departments.map(department => department.name).join(", ")
                  : "N/A"}
              </td>
              <td style={styles.tableCell}>
                {/* Joining all role names with commas */}
                {user.roles && user.roles.length > 0
                  ? user.roles.map(role => role.name).join(", ")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
