"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

// Types
export type UserRole = "super_admin" | "admin" | "sheikh" | "student";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("etqaan_token");
      const storedUser = localStorage.getItem("etqaan_user");

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          setToken(storedToken);
          setUser(parsedUser);
        } else {
          // Invalid user data, clear storage
          localStorage.removeItem("etqaan_token");
          localStorage.removeItem("etqaan_user");
        }
      }
    } catch (error) {
      // Invalid JSON in localStorage, clear it
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("etqaan_token");
      localStorage.removeItem("etqaan_user");
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "فشل تسجيل الدخول");
        }

        const data = await response.json();
        // Backend returns: { name, role, accessToken }
        const { name, role, accessToken } = data;

        // Construct user data from response
        const userData: User = {
          id: 0, // ID not returned by login, but not critical for frontend
          name,
          email,
          role,
        };

        // Store in localStorage
        localStorage.setItem("etqaan_token", accessToken);
        localStorage.setItem("etqaan_user", JSON.stringify(userData));

        setToken(accessToken);
        setUser(userData);

        // Redirect based on role
        switch (role) {
          case "super_admin":
          case "admin":
            router.push("/admin");
            break;
          case "sheikh":
            router.push("/sheikh");
            break;
          case "student":
            router.push("/student/dashboard");
            break;
          default:
            router.push("/");
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("etqaan_token");
    localStorage.removeItem("etqaan_user");
    setToken(null);
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper hook for role checks
export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  return { user, isLoading, isAuthenticated };
}
