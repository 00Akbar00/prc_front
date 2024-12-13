import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userServices';
import { getRoles } from '../../services/roleServices';
import { getDepartments } from '../../services/departmentServices';
import * as Yup from 'yup';

const AddUser = ({ styles }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    departments: [], // Array for selected departments
    roles: [], // Array for selected roles
  });
  const [departments, setDepartments] = useState([]); // Departments from backend
  const [roles, setRoles] = useState([]); // Roles from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [dropdownVisible, setDropdownVisible] = useState(false); // Toggle for dropdown visibility
  const [selectedOptionType, setSelectedOptionType] = useState(''); // Track whether user is selecting departments or roles
  const [searchQuery, setSearchQuery] = useState(''); // For filtering dropdown options
  const [permissions, setPermissions] = useState([]);
  const [errors, setErrors] = useState({}); // State to store error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await getDepartments();
        setDepartments(departmentsResponse?.data?.departments || []);

        const rolesResponse = await getRoles();
        console.log(rolesResponse);
        setRoles(rolesResponse?.data?.roles || []);
        setPermissions(rolesResponse.data.roles.permissions || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle dropdown visibility
  const handleInputClick = (type) => {
    setSelectedOptionType(type); // Determine whether it's departments or roles dropdown
    setDropdownVisible(!dropdownVisible);
  };

  // Handle selection of an item (department or role)
  const handleSelectItem = (item) => {
    if (selectedOptionType === 'departments') {
      setFormData(prevData => ({
        ...prevData,
        departments: [...prevData.departments, item.id],
      }));
    } else if (selectedOptionType === 'roles') {
      setFormData(prevData => ({
        ...prevData,
        roles: [...prevData.roles, item.id],
      }));
  
      // Fetch permissions for the selected role
      const selectedRole = roles.find(role => role.id === item.id);
      if (selectedRole) {
        setPermissions(prevPermissions => [
          ...prevPermissions,
          ...selectedRole.permissions,
        ]);
      }
    }
    setSearchQuery(''); // Reset search query after selecting
    setDropdownVisible(false); // Hide dropdown
  };

  
  

  // Handle removing a selected item
  const removeSelectedItem = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].filter(item => item !== value),
    }));
  
    if (name === 'roles') {
      // Remove the permissions associated with the removed role
      const role = roles.find(r => r.id === value);
      if (role) {
        setPermissions(prevPermissions => 
          prevPermissions.filter(permission => !role.permissions.includes(permission))
        );
      }
    }
  };
  

  // Filter departments or roles based on search query
  const filterOptions = (options) => {
    return options.filter(option =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {

    const validationSchema = Yup.object({
      name: Yup.string().trim().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      roles: Yup.array().min(1, 'At least one role is required').required('Roles are required'),
      departments: Yup.array().min(1, 'At least one department is required').required('Departments are required'),
    });

    setFormData({
      name: '',
      email: '',
      password: '',
      departments: [],
      roles: [],
    });
    
    e.preventDefault();

    // Prepare the payload with the correct field names
    const payload = {
      ...formData,
      roleIds: formData.roles, 
      departmentIds: formData.departments, 
    };

    try {

      setErrors({});

      await validationSchema.validate(payload, { abortEarly: false });

      const response = await createUser(payload); // Pass the modified payload
      alert('User created successfully!');
      
    } catch (error) {
      if (error.name === 'ValidationSchema') {
        // Map errors to the form fields
        const validationErrors = error.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setErrors(validationErrors); // Set validation errors to state
      } else {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div>Loading departments and roles...</div>;
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleFormSubmit}>
        <h2>Add User</h2>
        
        {/* Name Input */}
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
  
        {/* Email Input */}
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
  
        {/* Password Input */}
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
  
        {/* Departments Field */}
        <div style={styles.formGroup}>
          <label htmlFor="departments">Departments:</label>
          <div
            style={styles.selectInput}
            onClick={() => handleInputClick('departments')}
          >
            {formData.departments.map(id => {
              const department = departments.find(d => d.id === id);
              return (
                department && (
                  <span key={id} style={styles.tag}>
                    {department.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent input field click
                        removeSelectedItem('departments', id); // Remove selected department
                      }}
                      style={styles.removeTagButton}
                    >
                      x
                    </button>
                  </span>
                )
              );
            })}
            {formData.departments.length === 0 && <span>Select Departments</span>}
          </div>
  
          {dropdownVisible && selectedOptionType === 'departments' && (
            <div style={styles.dropdown}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search departments"
                style={styles.dropdownSearch}
              />
              {filterOptions(departments).map(department => (
                <div
                  key={department.id}
                  style={styles.dropdownItem}
                  onClick={() => handleSelectItem(department)}
                >
                  {department.name}
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Roles Field */}
        <div style={styles.formGroup}>
          <label htmlFor="roles">Roles:</label>
          <div
            style={styles.selectInput}
            onClick={() => handleInputClick('roles')}
          >
            {formData.roles.map(id => {
              const role = roles.find(r => r.id === id);
              return (
                role && (
                  <span key={id} style={styles.tag}>
                    {role.name}
                    <button
                      type="button"
                      onClick={() => removeSelectedItem('roles', id)}
                      style={styles.removeTagButton}
                    >
                      x
                    </button>
                  </span>
                )
              );
            })}
            {formData.roles.length === 0 && <span>Select Roles</span>}
          </div>
  
          {dropdownVisible && selectedOptionType === 'roles' && (
            <div style={styles.dropdown}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search roles"
                style={styles.dropdownSearch}
              />
              {filterOptions(roles).map(role => (
                <div
                  key={role.id}
                  style={styles.dropdownItem}
                  onClick={() => handleSelectItem(role)}
                >
                  {role.name}
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
      
      {/* Permissions Div */}
    <div style={styles.permission}>
      <h2 style={{fontWeight: 'bold'}}></h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Permissions associated to user</th>
          </tr>
        </thead>
        <tbody>
          {permissions.length === 0 ? (
            <tr>
              <td>No permissions available</td>
            </tr>
          ) : (
            permissions.map((permission, index) => (
              <tr key={index}>
                <td>{permission.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    </div>
  );
  
};

export default AddUser;
