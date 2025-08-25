"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  enterDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS = {
  email: "demo@navscope.com",
  password: "demo123",
  user: {
    id: "demo-user",
    name: "Capitão Demo",
    email: "demo@navscope.com",
    role: "Operador Marítimo",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("navscope-user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", email, password);
    if (
      email === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      console.log("Login successful");
      setUser(DEMO_CREDENTIALS.user);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "navscope-user",
          JSON.stringify(DEMO_CREDENTIALS.user)
        );
      }
      return true;
    }
    console.log("Login failed");
    return false;
  };

  const logout = () => {
    console.log("Logout");
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("navscope-user");
    }
  };

  const enterDemoMode = () => {
    console.log("Entering demo mode");
    const demoUser = {
      id: "demo-guest",
      name: "Visitante Demo",
      email: "guest@navscope.com",
      role: "Modo Demonstração",
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("navscope-user", JSON.stringify(demoUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        enterDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
