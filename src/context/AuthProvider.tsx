import {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";
import userService from "../services/userService";
import type { UserProfile } from "../types/user";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const currentUser =
        await userService.getCurrentUser();

      setUser(currentUser);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401
      ) {
        logout();
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;