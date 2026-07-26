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