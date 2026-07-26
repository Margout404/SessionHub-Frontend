import apiClient from "../api/axios";
import type { UserProfile } from "../types/user";

const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>(
    "/users/me",
  );

  return response.data;
};

const userService = {
  getCurrentUser,
};

export default userService;