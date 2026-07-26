import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ksp_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userProfile = await apiService.getCurrentUser();
          setUser(userProfile);
        } catch (err) {
          console.error("Failed to load user profile:", err);
          logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await apiService.login(username, password);
      localStorage.setItem('ksp_token', data.access_token);
      setToken(data.access_token);
      setUser({
        id: data.user_id,
        username: data.username,
        email: `${data.username}@ksp.gov.in`,
        full_name: data.full_name,
        badge_number: "KSP-DEMO-BADGE",
        role: data.role as UserRole,
        station_id: data.station_id
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ksp_token');
    setToken(null);
    setUser(null);
  };

  const switchDemoRole = async (role: UserRole) => {
    const roleUsernameMap: Record<UserRole, string> = {
      CONSTABLE: 'constable_kumar',
      INSPECTOR: 'inspector_patil',
      SUPERINTENDENT: 'sp_gowda',
      ADMIN: 'admin_sys'
    };
    await login(roleUsernameMap[role], 'Password123!');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchDemoRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
