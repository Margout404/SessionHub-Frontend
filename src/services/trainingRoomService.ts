import apiClient from "../api/axios";
import type { TrainingRoomResponse } from "../types/trainingRoomResponse";

const getAll = async (): Promise<TrainingRoomResponse[]> => {
  const response =
    await apiClient.get<TrainingRoomResponse[]>(
      "/training-room/all-rooms",
    );

  return response.data;
};

export default {
  getAll,
};