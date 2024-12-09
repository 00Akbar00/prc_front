'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for App Router projects

const LogoutButton = ({ onLogout, label = "Logout", style = {}, className = "" }) => {
    const router = useRouter();

    const handleLogout = () => {
        if (onLogout) {
            onLogout(); // Execute custom logout logic
        }
        // Example: Redirect to the login page
        router.push('/');
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
