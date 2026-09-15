export type EnrollResponse = {
  sessionId: number;
  userId: number;
  userName: string;
  date: string;
  startTime: string;
  status: "CONFIRMED" | "WAITING_LIST";
};

export type BookingStatus =
  | "CONFIRMED"
  | "WAITING_LIST"
  | "CANCELLED";

export type MyBooking = {
  bookingId: number;
  sessionId: number;

  trainingTypeName: string;
  trainerName: string;
  roomName: string;

  date: string;
  startTime: string;
  endTime: string;

  bookingStatus: BookingStatus;
};