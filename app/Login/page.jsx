'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8082/login', {
      email,
      password,
    });

    // Log the entire response object to the terminal
    console.log('Response from server:', response);

    const data = response.data; // Axios automatically parses JSON
    console.log('Parsed response data:', data); // Log the parsed response data

    if (data.dashboard) {
      if (data.dashboard === 'admin') {
        console.log('Redirecting to admin dashboard...');
        router.push('/adminDash');
      } else {
        console.log('Redirecting to user dashboard...');
        router.push('/userDash');
      }
    } else {
      console.log('Invalid login credentials.');
      alert('Invalid login credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error logging in:', error.response || error.message);
    alert(
      error.response?.data?.message || 'An error occurred. Please try again.'
    );
  }
};
  return (
    <div className="container">
      <div className="form-container">
        <form className="signup-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
          color: black;
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
    </div>
  );
};

export default LoginPage;
