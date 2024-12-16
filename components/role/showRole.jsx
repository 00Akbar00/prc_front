import React, { useState, useEffect } from 'react';
import { getRoles } from '../../services/roleServices'; // Assuming you have an API service for roles
import { styles } from '../../styles/styles'; 

const ShowRoleList = ({ styles }) => {
  const [roles, setRoles] = useState([]);  // Change state to hold roles
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();  // Fetch roles instead of departments
        setRoles(response.data.roles);  // Assuming the API returns roles in response.data.roles
        setLoading(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []); 
  
  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div style={styles.tableContainer}>
      <h2>Roles</h2> {/* Change heading to Roles */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Role ID</th> {/* Change column header */}
            <th style={styles.tableHeader}>Role Name</th> {/* Change column header */}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (  // Map through roles instead of departments
            <tr key={role.id}>  {/* Use role.id as the key */}
              <td>{role.id}</td>  {/* Display role ID */}
              <td>{role.name}</td>  {/* Display role name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRoleList;
