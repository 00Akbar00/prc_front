"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import styles from "../styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8082/login",
        values,
        { withCredentials: false }
      );

      const data = response.data;

      if (data.success) {
        console.log("Success toast triggered");
        toast.success("Login successful!", {
          position: "top-right", // Position toast on the top-right
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored", // Optional: Adds a colored theme to the toast
        });
        // Navigate based on the dashboard type
        if (data.dashboard === "admin") {
          router.push("/adminDash"); // Redirect to admin dashboard
        } else if (data.dashboard === "user") {
          router.push("/userDash"); // Redirect to user dashboard
        }

      } else {
        console.log("Error toast triggered");
        toast.error(data.message || "Login failed. Please try again.", {
          position: "top-right", // Position toast on the top-right
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored", // Optional: Adds a colored theme to the toast
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        {
          position: "top-right", // Position toast on the top-right
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored", // Optional: Adds a colored theme to the toast
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
