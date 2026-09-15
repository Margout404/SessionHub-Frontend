import apiClient from "../api/axios";
import type { EnrollResponse, MyBooking } from "../types/booking";

const bookingService = {
  enroll: async (sessionId: number): Promise<EnrollResponse> => {
    const response = await apiClient.post<EnrollResponse>(
      `/booking/enroll/${sessionId}`,
    );

    return response.data;
  },
  getMyBookings: async (): Promise<MyBooking[]> => {
    const response =
      await apiClient.get<MyBooking[]>(
        "/booking/my-bookings",
      );

    return response.data;
  },
};

export default bookingService;