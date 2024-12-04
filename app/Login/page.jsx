// pages/signup.js

'use client';
import React from 'react';

const LoginPage = () => {
  return (
    <body className="container">
      <div className="form-container">
        <form className="signup-form">
          <h2>Sign In</h2>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background: white;
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          width: 300px;
        }

        .signup-form h2 {
          margin-bottom: 1rem;
          text-align: center;
          color:black;
        }

        .signup-form input {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: black;
        }

        .signup-form button {
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          background-color: #0070f3;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        
        .signup-form button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </body>
  );
};

export default LoginPage;
