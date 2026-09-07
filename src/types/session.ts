export type TrainingSessionEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  classNames?: string[];

  extendedProps: {
    roomName: string;
    trainerName: string;
    participants: number;
    capacity: number;
    description?: string;
  };
};
export type SessionStatus = "DRAFT" | "SCHEDULED" | "CANCELLED";

export type TrainingSession = {
  sessionId: number;

  trainerId: number;
  trainerName: string;

  roomId: number;
  roomName: string;

  trainingTypeId: number;
  trainingTypeName: string;

  date: string;
  startTime: string;
  endTime: string;

  maxParticipants: number;

  status: SessionStatus;
};

export type SessionFormData = {
  id?: number;

  trainingTypeId: number;
  trainerId: number;
  roomId: number;

  date: string;
  startTime: string;
  endTime: string;

  maxParticipants: number;
  status: SessionStatus;
};

export type SelectedSessionRange = {
  date: string;
  startTime: string;
  endTime: string;
};

export type CreateSessionRequest = {
  trainerId: number;
  roomId: number;
  trainingTypeId: number;

  date: string;
  startTime: string;
  endTime: string;

  maxParticipants: number;

  status: "DRAFT";
};

export type CreateSessionResponse = {
  trainerId: number;
  roomId: number;
  trainingTypeId: number;

  date: string;
  startTime: string;
  endTime: string;

  maxParticipants: number;
  status: SessionStatus;

  sessionId: number;
  message: string;
};
