import { createContext } from "react";
import type { UserProfile } from "../types/user";

export type AuthContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );