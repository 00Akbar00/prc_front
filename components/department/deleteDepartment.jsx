import React, { useState, useEffect } from 'react';
import { getDepartments, deleteDepartment } from '../../services/departmentServices'; // API services
import { styles } from '../../styles/styles'; // Import your styles

const DepartmentListWithDelete = () => {
  const [departments, setDepartments] = useState([]); // State for department list
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch departments when the component loads
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data.departments); // Populate department list
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Function to handle deletion of a department
  const handleDelete = async (departmentId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) {
      return; // Confirm before deleting
    }

    try {
      // Call the delete API function
      const response = await deleteDepartment(departmentId);
      alert(response?.message || 'Department deleted successfully');

      // Update the department list after deletion
      setDepartments(departments.filter((dept) => dept.id !== departmentId));
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Failed to delete department');
    }
  };

  // Show a loading message while fetching data
  if (loading) {
    return <div>Loading departments...</div>;
  }

  // Render the department list with a delete button for each department
  return (
    <div style={styles.tableContainer}>
      <h2>Departments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Department ID</th>
            <th style={styles.tableHeader}>Department Name</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>
                <button
                  style={styles.deleteButton} // Use a red button style
                  onClick={() => handleDelete(department.id)} // Call handleDelete with department ID
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default DepartmentListWithDelete;
