"use client";

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutButton from '../logoutButton'; // Import LogoutButton component

export default function SideBar({ onSectionChange }) {
  const handleButtonClick = (buttonName) => {
    onSectionChange(buttonName);
  };

  return (
    <div style={styles.sidebar}>
      <button
        style={styles.button}
        onClick={() => handleButtonClick("User")}
      >
        User
      </button>
      <button
        style={styles.button}
        onClick={() => handleButtonClick("Role")}
      >
        Role
      </button>
      <button
        style={styles.button}
        onClick={() => handleButtonClick("Department")}
      >
        Department
      </button>

      {/* Add LogoutButton here */}
      <LogoutButton
        label="Logout"
        style={styles.logoutButton}
        className="logout-button"
      />

      <ToastContainer />
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
    borderRight: "1px solid #e0e0e0",
  },
  button: {
    width: "90%",
    padding: "12px 20px",
    margin: "12px 0",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  logoutButton: {
    width: "90%",
    padding: "12px 20px",
    margin: "12px 0",
    backgroundColor: "#dc3545", // Red color for logout
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
