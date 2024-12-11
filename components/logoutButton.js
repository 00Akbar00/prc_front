'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // For App Router projects
import axios from 'axios';

const LogoutButton = ({ label = "Logout", style = {}, className = "" }) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Log the logout attempt
            console.log("Logging out...");

            // Clear cookies from the frontend
            document.cookie = 'user=; path=/; max-age=0'; // Clear the user cookie
            document.cookie = 'role=; path=/; max-age=0'; // Clear the role cookie

            // Optionally, you can call the backend to handle session invalidation
            // const response = await axios.get('http://localhost:8082/logout', { withCredentials: true });

            // Redirect to the homepage or login page after logout
            router.push('/');
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={style}
            className={className}
        >
            {label}
        </button>
    );
};

export default LogoutButton;
