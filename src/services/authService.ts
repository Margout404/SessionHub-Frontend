import apiClient from "../api/axios";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return response.data;
};

const register = async (
  registrationData: RegisterRequest,
): Promise<void> => {
  await apiClient.post(
    "/auth/register",
    registrationData,
  );
};

const authService = {
  login,
  register,
};


export default authService;