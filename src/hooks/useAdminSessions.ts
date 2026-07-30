import { useState } from "react";

import type {
  SessionFormData,
  TrainingSession,
} from "../types/session";

import {
  rooms,
  trainers,
  trainingTypes,
} from "../data/adminSessionOptions";

const initialSessions: TrainingSession[] = [
  {
    id: 1,
    description: "Beginner-friendly yoga class.",
    date: "2026-07-27",
    startTime: "18:00",
    endTime: "19:00",

    trainerId: 1,
    trainerName: "Maria Papadopoulou",

    roomId: 1,
    roomName: "Room A",

    trainingTypeId: 1,
    trainingTypeName: "Yoga",

    maxParticipants: 12,
    participants: 6,

    status: "PUBLISHED",
  },
  {
    id: 2,
    description: "High intensity training.",
    date: "2026-07-28",
    startTime: "19:00",
    endTime: "20:00",

    trainerId: 2,
    trainerName: "Nikos Georgiou",

    roomId: 2,
    roomName: "Room B",

    trainingTypeId: 2,
    trainingTypeName: "CrossFit",

    maxParticipants: 10,
    participants: 8,

    status: "DRAFT",
  },
];

export function useAdminSessions() {
  const [sessions, setSessions] =
    useState<TrainingSession[]>(initialSessions);

  const createSession = (
    formData: SessionFormData,
  ) => {
    const trainer = trainers.find(
      (item) => item.id === formData.trainerId,
    );

    const room = rooms.find(
      (item) => item.id === formData.roomId,
    );

    const trainingType = trainingTypes.find(
      (item) =>
        item.id === formData.trainingTypeId,
    );

    if (!trainer || !room || !trainingType) {
      throw new Error(
        "Δεν βρέθηκαν τα στοιχεία του session.",
      );
    }

    const newSession: TrainingSession = {
      id: Date.now(),

      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,

      trainerId: trainer.id,
      trainerName: trainer.name,

      roomId: room.id,
      roomName: room.name,

      trainingTypeId: trainingType.id,
      trainingTypeName: trainingType.name,

      maxParticipants:
        formData.maxParticipants,

      participants: 0,
      status: formData.status,
    };

    setSessions((currentSessions) => [
      ...currentSessions,
      newSession,
    ]);
  };

  const updateSession = (
    formData: SessionFormData,
  ) => {
    if (!formData.id) {
      return;
    }

    const trainer = trainers.find(
      (item) => item.id === formData.trainerId,
    );

    const room = rooms.find(
      (item) => item.id === formData.roomId,
    );

    const trainingType = trainingTypes.find(
      (item) =>
        item.id === formData.trainingTypeId,
    );

    if (!trainer || !room || !trainingType) {
      throw new Error(
        "Δεν βρέθηκαν τα στοιχεία του session.",
      );
    }

    setSessions((currentSessions) =>
      currentSessions.map((session) => {
        if (session.id !== formData.id) {
          return session;
        }

        return {
          ...session,

          description: formData.description,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,

          trainerId: trainer.id,
          trainerName: trainer.name,

          roomId: room.id,
          roomName: room.name,

          trainingTypeId: trainingType.id,
          trainingTypeName:
            trainingType.name,

          maxParticipants:
            formData.maxParticipants,

          status: formData.status,
        };
      }),
    );
  };

  const deleteSession = (sessionId: number) => {
    setSessions((currentSessions) =>
      currentSessions.filter(
        (session) => session.id !== sessionId,
      ),
    );
  };

  const saveSession = (
    formData: SessionFormData,
  ) => {
    if (formData.id) {
      updateSession(formData);
      return "Το session ενημερώθηκε.";
    }

    createSession(formData);
    return "Το session δημιουργήθηκε.";
  };

  return {
    sessions,
    saveSession,
    deleteSession,
  };
}