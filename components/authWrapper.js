// components/AuthWrapper.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthWrapper = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setMounted(true); // Set mounted to true after component has mounted
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!mounted) return; // Prevent running this logic before the component is mounted

    if (!user) {
      router.push('/'); // Redirect to login if not logged in
    } else if (requiredRole && role !== requiredRole) {
      router.push('/unauthorized'); // Redirect if role doesn't match
    } else {
      setLoading(false); // Allow rendering of the page if user is authorized
    }
  }, [mounted, user, role, requiredRole, router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking
  }

  // Render children if authorized and role matches
  return user && role === requiredRole ? children : null;
};

export default AuthWrapper;
