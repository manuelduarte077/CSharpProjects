import React, { PropsWithChildren, useEffect, useState } from "react";
import { createContext, useContext } from "react";

enum AuthAction {
  "checking",
  "authenticated",
  "unauthenticated",
}

interface AuthState {
  status: AuthAction;
  token: string | null;
  errorMessage: string | null;

  
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;

  loginWithEmailPassword: (email: string, password: string) => void;
  logout: () => void;
}

interface User {
  name: string;
  email: string;
}

export const AuthContext = createContext<Partial<AuthState>>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(AuthAction.checking);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setTimeout(() => {
      setAuthState(AuthAction.authenticated);
    }, 2000);
  }, []);

  const loginWithEmailPassword = (email: string, password: string) => {
    console.log("Logging in...");
    console.log("Email: ", email);
    console.log("Password: ", password);

    // Call login API
    setUser({
      name: "John Doe",
      email: email,
    });

    setAuthState(AuthAction.authenticated);
  };

  const logout = () => {
    setUser(undefined);
    setAuthState(AuthAction.unauthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        status: authState,
        user: user,
        isChecking: authState === AuthAction.checking,
        isAuthenticated: authState === AuthAction.authenticated,

        /// Methods
        loginWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
