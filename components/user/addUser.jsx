import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userServices';
import { getRoles } from '../../services/roleServices';
import { getDepartments } from '../../services/departmentServices';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await getDepartments();
        setDepartments(departmentsResponse?.data?.departments || []);

        const rolesResponse = await getRoles();
        console.log(rolesResponse);
        setRoles(rolesResponse?.data?.roles || []);
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
    e.preventDefault();

    // Prepare the payload with the correct field names
    const payload = {
      ...formData,
      roleIds: formData.roles, // Rename 'roles' to 'roleIds'
      departmentIds: formData.departments, // Rename 'departments' to 'departmentIds'
    };

    try {
      const response = await createUser(payload); // Pass the modified payload
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  if (loading) {
    return <div>Loading departments and roles...</div>;
  }

  return (
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
  );
};

export default AddUser;
