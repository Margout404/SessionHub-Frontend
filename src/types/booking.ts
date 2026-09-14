export type EnrollResponse = {
  sessionId: number;
  userId: number;
  userName: string;
  date: string;
  startTime: string;
  status: "CONFIRMED" | "WAITING_LIST";
};