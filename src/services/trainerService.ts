import apiClient from "../api/axios";
import type { TrainerResponse } from "../types/trainerResponse";

const getAll = async (): Promise<TrainerResponse[]> => {
  const response =
    await apiClient.get<TrainerResponse[]>("/trainers/all-trainers");

  return response.data;
};

export default {
  getAll,
};