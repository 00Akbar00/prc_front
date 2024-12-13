'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/sideBar/sideBar';


export default function AdminDash() {
  const [currentSection, setCurrentSection] = useState('User');
  const [currentAction, setCurrentAction] = useState('Add');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: '',
    userId: '', 
  });

  const departments = ['HR', 'IT', 'Finance', 'Marketing']; // Example options
  const roles = ['Admin', 'Manager', 'Staff', 'Intern']; // Example options

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setCurrentAction('Add');
  };

  const handleActionChange = (action) => {
    setCurrentAction(action);
    toast.success(`${action} action selected in ${currentSection}!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('User added successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });
    // Clear form data after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      department: '',
      role: '',
    });
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    console.log('Deleting user with ID:', formData.userId);
    toast.success(`User with ID ${formData.userId} deleted successfully!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    // Clear userId after deletion
    setFormData({ ...formData, userId: '' });
  };

  const renderContent = () => {
    if (currentSection === 'User') {
      if (currentAction === 'Add') {
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
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
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
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </form>
        );
      }

      if (currentAction === 'Delete') {
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
      }
      if (currentAction === 'Show') {
        return (
          <div style={styles.tableContainer}>
            <h2>Users</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Password</th>
                </tr>
              </thead>
              <tbody>
                {/* Example static data, replace with dynamic data from the database */}
                {[
                  { name: 'John Doe', email: 'john@example.com', password: '123456' },
                  { name: 'Jane Smith', email: 'jane@example.com', password: 'abcdef' },
                ].map((user, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{user.name}</td>
                    <td style={styles.tableCell}>{user.email}</td>
                    <td style={styles.tableCell}>{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      
    }
    if (currentSection === 'Role') {
      if (currentAction === 'Add') {
        return (
          <div style={styles.form}>
            <h2>Add Role</h2>
            <div style={styles.formGroup}>
              <label htmlFor="roleName">Role Name:</label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                value={formData.roleName || ''}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <button
              onClick={() => {
                // Implement your add role logic here (e.g., API call)
                console.log('Add Role:', formData.roleName);
              }}
              style={styles.submitButton}
            >
              Add Role
            </button>
          </div>
        );
      }
    
      if (currentAction === 'Delete') {
        return (
          <div style={styles.form}>
            <h2>Delete Role</h2>
            <div style={styles.formGroup}>
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role || ''}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="">Select a Role</option>
                {/* Replace the roles array with dynamic data from the backend */}
                {['Admin', 'Manager', 'Staff', 'Intern'].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                // Implement your delete role logic here (e.g., API call)
                console.log('Delete Role:', formData.role);
              }}
              style={styles.deleteButton}
            >
              Delete Role
            </button>
          </div>
        );
      }
    
      if (currentAction === 'Show') {
        return (
          <div style={styles.tableContainer}>
            <h2>Roles</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Role</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace the roles array with dynamic data from the backend */}
                {['Admin', 'Manager', 'Staff', 'Intern'].map((role, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    
    if (currentSection === 'Department') {
      if (currentAction === 'Add') {
        return (
          <div style={styles.form}>
            <h2>Add Department</h2>
            <div style={styles.formGroup}>
              <label htmlFor="roleName">Department Name:</label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={formData.departmentName || ''}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <button
              onClick={() => {
                // Implement your add role logic here (e.g., API call)
                console.log('Add Department:', formData.departmentName);
              }}
              style={styles.submitButton}
            >
              Add Department
            </button>
          </div>
        );
      }
    
      if (currentAction === 'Delete') {
        return (
          <div style={styles.form}>
            <h2>Delete Department</h2>
            <div style={styles.formGroup}>
              <label htmlFor="role">Select Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department || ''}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="">Select a Department</option>
                {/* Replace the roles array with dynamic data from the backend */}
                {['Admin', 'Manager', 'Staff', 'Intern'].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                // Implement your delete role logic here (e.g., API call)
                console.log('Delete Role:', formData.role);
              }}
              style={styles.deleteButton}
            >
              Delete Department
            </button>
          </div>
        );
      }
    
      if (currentAction === 'Show') {
        return (
          <div style={styles.tableContainer}>
            <h2>Department</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Department</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace the roles array with dynamic data from the backend */}
                {['Admin', 'Manager', 'Staff', 'Intern'].map((department, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    return <div>Select a section to see content</div>;
  };

  return (
    <div style={styles.container}>
      <SideBar onSectionChange={handleSectionChange} />
      <div style={styles.mainContent}>
        <div style={styles.actionButtons}>
          {['Add', 'Delete', 'Show'].map((action) => (
            <button
              key={action}
              style={{
                ...styles.actionButton,
                backgroundColor: currentAction === action ? '#0056b3' : '#007bff',
              }}
              onClick={() => handleActionChange(action)}
            >
              {`${action} ${currentSection}`}
            </button>
          ))}
        </div>
        <div style={styles.contentArea}>{renderContent()}</div>
      </div>
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f2f5', // Light background for a clean look
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
  },
  actionButton: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    backgroundColor: '#007bff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333333',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333333',
  },
  formGroup: {
    marginBottom: '20px',
    color: '#333333',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333333',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  select: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333333',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  submitButton: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  deleteButton: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#dc3545',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '12px',
    border: '1px solid #dee2e6',
    fontSize: '16px',
  },
  tableCell: {
    padding: '12px',
    border: '1px solid #dee2e6',
    fontSize: '16px',
    color: '#333333',
  },
};

