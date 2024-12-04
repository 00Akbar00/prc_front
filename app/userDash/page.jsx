'use client'; // Ensure this is a Client Component

import React from 'react';

export default function UserDash() {
  return (
    <div className="container">
      <h1>userDash</h1>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
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
