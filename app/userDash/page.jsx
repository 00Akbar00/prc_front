'use client'; // Ensure this is a Client Component

import React from 'react';
import LogoutButton from '../../components/logoutButton';

export default function UserDash() {
  return (
    <div className="container">
      <div className="top-right">
        <LogoutButton
          label="Logout"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
      </div>
      <h1>UserDash</h1>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
          position: relative;
        }

        .top-right {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        h1 {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
  );
}
