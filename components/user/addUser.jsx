import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userServices';
import { getRoles } from '../../services/roleServices';
import { getDepartments } from '../../services/departmentServices';
import * as Yup from 'yup';
import { useFormik } from "formik";

const AddUser = ({ styles }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    departments: [], 
    roles: [], 
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
  const handleFormSubmit = async (formValues) => {
    setFormData({
      name: '',
      email: '',
      password: '',
      departments: [],
      roles: [],
    });
    
    setLoading(true);

    // Prepare the payload with correct field names
    const payload = {
      ...formValues,
      roleIds: formValues.roles, // Map roles to roleIds
      departmentIds: formValues.departments, // Map departments to departmentIds
    };

    try {
      setErrors({});
      setPermissions([]); // Reset permissions if needed

      const response = await createUser(payload); // Use your createUser API function

      if (response.success) {
        alert('User created successfully!');
        formik.resetForm(); // Reset Formik values
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrors(error.response?.data || { general: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      departments: [],
      roles: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      departments: Yup.array().min(1, 'Select at least one department'),
      roles: Yup.array().min(1, 'Select at least one role'),
    }),
    onSubmit: async (values) => {
      await handleFormSubmit(values); // Call handleFormSubmit with formik values
    },
  });
  

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <h2>Add User</h2>
        
         {/* Name Input */}
         <div style={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            className={formik.touched.name && formik.errors.name ? styles.errorInput : ''}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          )}
        </div>

        {/* Email Input */}
        <div style={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            className={formik.touched.email && formik.errors.email ? styles.errorInput : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
        </div>

        {/* Password Input */}
        <div style={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            className={formik.touched.password && formik.errors.password ? styles.errorInput : ''}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
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
             onClick={() => {
               removeSelectedItem('departments', id);
               formik.setFieldTouched('departments', true);  // Mark as touched when removing
               formik.setFieldValue(
                 'departments',
                 formData.departments.filter((departmentId) => departmentId !== id),
               );  // Update Formik value when removing
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
     {/* here code the formik */}

   </div>
     {formik.touched.departments && formik.errors.departments ? (
       <div style={{color:"red"}}>{formik.errors.departments}</div>
     ) : null}

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
           onClick={() => {
             handleSelectItem(department);
             formik.setFieldTouched('departments', true);  // Mark as touched when selecting
             formik.setFieldValue(
               'departments',
               [...formData.departments, department.id],
               true, // Ensure Formik revalidates on change
             );
           }}
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
   {formData.roles.map((id) => {
     const role = roles.find((r) => r.id === id);
     return (
       role && (
         <span key={id} style={styles.tag}>
           {role.name}
           <button
             type="button"
             onClick={() => {
               removeSelectedItem('roles', id);
               formik.setFieldTouched('roles', true);  // Mark as touched when removing
               formik.setFieldValue(
                 'roles',
                 formData.roles.filter((roleId) => roleId !== id),
               );  // Update Formik value when removing
             }}
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
     {filterOptions(roles).map((role) => (
       <div
         key={role.id}
         style={styles.dropdownItem}
         onClick={() => {
           handleSelectItem(role);
           formik.setFieldTouched('roles', true);  // Mark as touched when selecting
           formik.setFieldValue(
             'roles',
             [...formData.roles, role.id],
             true, // Ensure Formik revalidates on change
           );
         }}
       >
         {role.name}
       </div>
     ))}
   </div>
 )}
 {/* Error message for empty roles */}
 {formik.touched.roles && formik.errors.roles ? (
   <div style={{ color: 'red' }}>{formik.errors.roles}</div>
 ) : null}
</div>
  
       {loading ? (
          <div style={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <button type="submit" style={styles.submitButton} disabled={formik.isSubmitting}>
            Submit
          </button>
        )}
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
