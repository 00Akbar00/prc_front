"use client";  // Marking the component as a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Importing from 'next/navigation' for App Router
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
        const response = await axios.post(
            'http://localhost:8082/login',
            { email, password },
            { withCredentials: true }
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
            error.response?.data?.message || 'An unexpected error occurred. Please try again.'
        );
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="container">
      <div className="form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
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

        .login-form {
          display: flex;
          flex-direction: column;
          width: 300px;
        }

        .login-form h2 {
          margin-bottom: 1rem;
          text-align: center;
          color: black;
        }

        .login-form input {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: black;
        }

        .login-form button {
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          background-color: #0070f3;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        .login-form button:hover {
          background-color: #005bb5;
        }

        .error {
          color: red;
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
