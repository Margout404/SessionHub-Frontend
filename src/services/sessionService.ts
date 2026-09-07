import apiClient from "../api/axios";

import type {
  CreateSessionRequest,
  CreateSessionResponse,
  TrainingSession,
} from "../types/session";

const createSession = async (
  data: CreateSessionRequest,
): Promise<CreateSessionResponse> => {
  const response = await apiClient.post<CreateSessionResponse>(
    "/sessions/create-session",
    data,
  );

  return response.data;
};

const getAdminSessions = async (
  from: string,
  to: string,
): Promise<TrainingSession[]> => {
  const response = await apiClient.get<TrainingSession[]>("/sessions/admin", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};

const getPublishedSessions = async (
  from: string,
  to: string,
): Promise<TrainingSession[]> => {
  const response = await apiClient.get<TrainingSession[]>(
    "/sessions/published",
    {
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
};

const deleteSession = async (sessionId: number): Promise<string> => {
  const response = await apiClient.delete<string>(
    `/sessions/delete-session/${sessionId}`,
  );

  return response.data;
};

const publishSessions = async (ids: number[]) => {
  const response = await apiClient.post("/sessions/publish-sessions", ids);

  return response.data;
};

const sessionService = {
  createSession,
  getAdminSessions,
  getPublishedSessions,
  deleteSession,
  publishSessions
};

export default sessionService;
