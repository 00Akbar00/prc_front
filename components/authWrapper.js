// components/AuthWrapper.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthWrapper = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setMounted(true); 
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!mounted) return; 

    if (!user) {
      router.push('/'); 
    } else if (requiredRole && role !== requiredRole) {
      router.push('/unauthorized'); 
    } else {
      setLoading(false); 
    }
  }, [mounted, user, role, requiredRole, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Render children if authorized and role matches
  return user && role === requiredRole ? children : null;
};

export default AuthWrapper;
