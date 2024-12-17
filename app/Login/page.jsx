"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import styles from "../styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from 'nookies'; 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        values,
        { withCredentials: true }
      );
      console.log(response.data);
      const data = response.data;
  
      if (data.success) {
        // Set cookies with an expiration time (1 week)
        const expiresIn = new Date();
        expiresIn.setTime(expiresIn.getTime() + 60 * 60 * 24 * 7 * 1000); // 1 week from now
  
        // Extract role name from nested data structure
        const roleName = data.role;
  
        // Set cookies for user and role
        setCookie(null, 'user', JSON.stringify(data.user), {
          path: '/',
          expires: expiresIn,
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false, // Allows JavaScript access to the cookie
          sameSite: 'Lax',
        });
  
        setCookie(null, 'role', roleName, {
          path: '/',
          expires: expiresIn,
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false,
          sameSite: 'Lax',
        });
  
        // Store user and role in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', roleName);
  
        // Success toast
        console.log("Success toast triggered");
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        });
  
        // Navigate based on the role
        if (roleName === "Admin") {
          
          router.push("/adminDash"); // Redirect to admin dashboard
        } else {
          router.push("/userDash"); 
        }
        console.log(roleName)
      } else {
        // Error toast for failed login
        console.log("Error toast triggered");
        toast.error(data.message || "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: handleLogin,
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
                formik.touched.email && formik.errors.email
                  ? styles.errorInput
                  : ""
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
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      {/* Toast Container - Make sure it has z-index and position */}
      <ToastContainer
        position="top-right" // Ensure it's positioned in the top-right
        autoClose={3000} // Set autoClose time
        hideProgressBar={true} // Hide the progress bar
        theme="colored" // Optional: Colored theme for the toast
        style={{
          zIndex: 9999, // Make sure toast is on top
        }}
      />
    </div>
  );
};

export default LoginPage;
