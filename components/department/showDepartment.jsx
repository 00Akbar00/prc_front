import React, { useState, useEffect } from 'react';
import { getDepartments } from '../../services/departmentServices'; // your API service
import { styles } from '../../styles/styles'; 

const ShowDepartmentList = ({ styles }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments(); 
        setDepartments(response.data.departments); 
         setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []); 
  
  if (loading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div style={styles.tableContainer}>
      <h2>Departments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Department ID</th>
            <th style={styles.tableHeader}>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}> {/* Use department.id as the key */}
              <td>{department.id}</td> {/* Display department ID */}
              <td>{department.name}</td> {/* Display department name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDepartmentList;
