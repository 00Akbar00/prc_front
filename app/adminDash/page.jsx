'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/sideBar/sideBar';
import {styles} from '../../styles/styles'
import LogoutButton from '../../components/logoutButton'

// Importing your form components
import AddUserForm from '../../components/user/addUser';
import DeleteUserForm from '../../components/user/deleteUser';
import ShowUserList from '../../components/user/showUser';
import UpdateUser from '../../components/user/updateUser'

import AddDepartmentForm from '../../components/department/addDepartment';
import DeleteDepartmentForm from '../../components/department/deleteDepartment';
import ShowDepartmentList from '../../components/department/showDepartment';

import AddRoleForm from '../../components/role/addRole';
import DeleteRoleForm from '../../components/role/deleteRole';
import ShowRoleList from '../../components/role/showRole';



export default function AdminDash() {
  const [currentSection, setCurrentSection] = useState('User');
  const [currentAction, setCurrentAction] = useState('Add');
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: '',
    userId: '', 
  });

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setCurrentAction('Add');
  };

  const handleActionChange = (action) => {
    setCurrentAction(action);
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('User added successfully!'
    );
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

  // Map actions and sections to corresponding components
  const renderContent = () => {
    if (currentSection === 'User') {
      switch (currentAction) {
        case 'Add':
          return <AddUserForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles}
            departments={departments}
            //roles={roles}
          />;
        case 'Delete':
          return <DeleteUserForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        case 'Show':
          return <ShowUserList 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
          case 'Update':
          return <UpdateUser 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        default:
          return null;
      }
    } else if (currentSection === 'Department') {
      switch (currentAction) {
        case 'Add':
          return <AddDepartmentForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles}
          />;
        case 'Delete':
          return <DeleteDepartmentForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        case 'Show':
          return <ShowDepartmentList 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        default:
          return null;
      }
    } else if (currentSection === 'Role') {
      switch (currentAction) {
        case 'Add':
          return <AddRoleForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles}
          />;
        case 'Delete':
          return <DeleteRoleForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        case 'Show':
          return <ShowRoleList 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            styles={styles} 
          />;
        default:
          return null;
      }
    }
    
    // Default message for invalid section or action
    return <div>Please select a valid section and action.</div>;
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
  
  {/* Show the Update button only for the User section */}
  {currentSection === 'User' && (
    <button
      style={{
        ...styles.actionButton,
        backgroundColor: currentAction === 'Update' ? '#0056b3' : '#007bff',
      }}
      onClick={() => handleActionChange('Update')}
    >
      Update User
    </button>
  )}
</div>
        <div style={styles.contentArea}>{renderContent()}</div>
        
        {/* Logout Button */}
        <LogoutButton label="Logout" style={{ marginTop: '20px' }} className="logout-button" />
      </div>
      <ToastContainer />
    </div>
  );
}



