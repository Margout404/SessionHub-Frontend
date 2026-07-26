export type UserRole = "USER" | "ADMIN";

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};