import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { ROLES, hasPermission, canAccessModule } from '../utils/rbac';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('tms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password && u.active
    );
    
    if (foundUser) {
      const userSession = {
        ...foundUser,
        loginTime: new Date().toISOString()
      };
      delete userSession.password; // Remove password from session
      
      setUser(userSession);
      localStorage.setItem('tms_user', JSON.stringify(userSession));
      return { success: true, user: userSession };
    } else {
      return { success: false, error: 'Invalid credentials or inactive account' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tms_user');
  };

  const hasUserPermission = (module, permission) => {
    if (!user) return false;
    return hasPermission(user.role, module, permission);
  };

  const canUserAccessModule = (module) => {
    if (!user) return false;
    return canAccessModule(user.role, module);
  };

  const isAdmin = () => {
    return user?.role === ROLES.SYSTEM_ADMIN;
  };

  const isCoordinator = () => {
    return user?.role === ROLES.TRAINING_COORDINATOR;
  };

  const isTrainer = () => {
    return user?.role === ROLES.TRAINER;
  };

  const isTrainee = () => {
    return user?.role === ROLES.TRAINEE;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    hasUserPermission,
    canUserAccessModule,
    isAdmin,
    isCoordinator,
    isTrainer,
    isTrainee
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};