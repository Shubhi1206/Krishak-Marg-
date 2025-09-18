import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Farmer {
  id?: string;
  phoneNumber: string;
  name: string;
  location: string;
  farmSize?: number;
  cropsGrown?: string[];
  language: string;
  isVerified?: boolean;
}

interface AuthContextType {
  farmer: Farmer | null;
  setFarmer: (farmer: Farmer | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const savedFarmer = localStorage.getItem('krishakMargFarmer');
    if (savedFarmer) {
      setFarmer(JSON.parse(savedFarmer));
    }
  }, []);

  // Save farmer to localStorage when it changes
  useEffect(() => {
    if (farmer) {
      localStorage.setItem('krishakMargFarmer', JSON.stringify(farmer));
    } else {
      localStorage.removeItem('krishakMargFarmer');
    }
  }, [farmer]);

  const logout = () => {
    setFarmer(null);
    localStorage.removeItem('krishakMargFarmer');
  };

  const value = {
    farmer,
    setFarmer,
    isAuthenticated: !!farmer,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}