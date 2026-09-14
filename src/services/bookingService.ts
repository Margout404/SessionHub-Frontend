import apiClient from "../api/axios";
import type { EnrollResponse } from "../types/booking";

const bookingService = {
  enroll: async (sessionId: number): Promise<EnrollResponse> => {
    const response = await apiClient.post<EnrollResponse>(
      `/booking/enroll/${sessionId}`,
    );

    return response.data;
  },
};

export default bookingService;