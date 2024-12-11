'use client'; // Ensure this is a Client Component

import React from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from '../../components/logoutButton';

export default function AdminDash() {
  // Handling form submission with Formik
  const formik = useFormik({
    initialValues: {
      user: '',
      role: '',
      department: ''
    },
    onSubmit: values => {
      toast.success('Form submitted successfully!');
      console.log(values);
    },
  });

  return (
    <div>
      {/* Toastify container */}
      <ToastContainer />

      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <button onClick={() => toast.info('User button clicked')}>
              Users
            </button>
          </li>
          <li>
            <button onClick={() => toast.info('Roles button clicked')}>
              Roles
            </button>
          </li>
          <li>
            <button onClick={() => toast.info('Departments button clicked')}>
              Departments
            </button>
          </li>
        </ul>
      </nav>

      {/* Form (using Formik) */}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="user">User</label>
          <input
            id="user"
            name="user"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.user}
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.role}
          />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.department}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
}
