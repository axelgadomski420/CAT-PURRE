import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(
          \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/me\`,
          { headers: { Authorization: \`Bearer \${token}\` } }
        );
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/login\`,
        { email, password }
      );
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/register\`,
        userData
      );
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isBreeder: user?.userType === 'breeder' || user?.userType === 'admin',
    isAdmin: user?.userType === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
