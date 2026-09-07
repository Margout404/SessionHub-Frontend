import apiClient from "../api/axios";
import type { TrainingTypeResponse } from "../types/trainingTypeResponse";

const getAll = async (): Promise<TrainingTypeResponse[]> => {
  const response =
    await apiClient.get<TrainingTypeResponse[]>(
      "/training-type/get-all-types",
    );

  return response.data;
};

export default {
  getAll,
};