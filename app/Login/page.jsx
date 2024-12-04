// components/SignInForm.js
"use client";
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct Next.js router
import axios from 'axios';
import * as Yup from 'yup';
import styles from '../styles.module.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(
        'http://localhost:8082/login',
        values, // Send form values directly
        { withCredentials: false }
      );

      const data = response.data;

      // Check for successful login
      if (data.success) {
        // Redirect to appropriate dashboard
        if (data.dashboard === 'admin') {
          router.push('/adminDash');
        } else if (data.dashboard === 'user') {
          router.push('/userDash');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: handleLogin, // Use handleLogin as the form's submit handler
  });

  return (
    <div className={styles.centerContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Sign In</h2>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`${styles.input} ${
                formik.touched.email && formik.errors.email ? styles.errorInput : ''
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`${styles.input} ${
                formik.touched.password && formik.errors.password
                  ? styles.errorInput
                  : ''
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
