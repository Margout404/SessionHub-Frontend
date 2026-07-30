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
export type SessionStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "CANCELLED";

export type TrainingSession = {
  id: number;
  description?: string;

  date: string;
  startTime: string;
  endTime: string;

  trainerId: number;
  trainerName: string;

  roomId: number;
  roomName: string;

  trainingTypeId: number;
  trainingTypeName: string;

  maxParticipants: number;
  participants: number;

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
  description: string;
  status: SessionStatus;
};

export type SelectedSessionRange = {
  date: string;
  startTime: string;
  endTime: string;
};