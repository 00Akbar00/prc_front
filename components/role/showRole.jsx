import React, { useState, useEffect } from 'react';
import { getRoles } from '../../services/roleServices'; 
import Select from "react-select"; 
import { styles } from '../../styles/styles'; 

const ShowRoleList = ({ styles }) => {
  const [roles, setRoles] = useState([]);  // Change state to hold roles
  const [loading, setLoading] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState([]);


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();  
        console.log(response)
        setRoles(response.data.roles);  // API returns roles in response.data.roles
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
      <h2 style={{fontWeight:'bold'}}>Roles</h2> {/* Change heading to Roles */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Role ID</th> {/* Change column header */}
            <th style={styles.tableHeader}>Role Name</th> {/* Change column header */}
            <th style={styles.tableHeader}>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (  
            <tr key={role.id}>  
              <td style={styles.tableCell}>{role.id}</td>  
              <td style={styles.tableCell}>{role.name}</td> 
              {/* multiSelect role permissions */}
                <td style={styles.tableCell}>
                  <Select
                    isMulti
                    name="roles"
                    
                  />  
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRoleList;

