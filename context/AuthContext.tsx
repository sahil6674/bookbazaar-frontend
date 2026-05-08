"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// TypeScript type for user
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
};

// TypeScript type for context value
type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component — wraps the whole app
export function AuthProvider({ children }: { children: ReactNode }) {

  // On app load, check if token exists in localStorage
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading] = useState(false);

  // Called after successful login/register
  function login(token: string, user: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  // Called when user logs out
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isLoggedIn: !!token,  // true if token exists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}