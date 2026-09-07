import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  Typography,
  Button,
} from "@mui/material";

import type { DateSelectArg } from "@fullcalendar/core";

import AdminWeeklySchedule from "../../components/admin/AdminWeeklySchedule";
import SessionFormDialog from "../../components/admin/SessionFormDialog";

import sessionService from "../../services/sessionService";
import type {
  SelectedSessionRange,
  SessionFormData,
  TrainingSession,
} from "../../types/session";

import { useEffect, useState } from "react";

import trainerService from "../../services/trainerService";
import trainingRoomService from "../../services/trainingRoomService";
import trainingTypeService from "../../services/trainingTypeService";

import type { TrainerResponse } from "../../types/trainerResponse";
import type { TrainingRoomResponse } from "../../types/trainingRoomResponse";
import type { TrainingTypeResponse } from "../../types/trainingTypeResponse";

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");

  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(value: Date) {
  const hours = String(value.getHours()).padStart(2, "0");

  const minutes = String(value.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function AdminSessionsPage() {
  const [trainers, setTrainers] = useState<TrainerResponse[]>([]);

  const [rooms, setRooms] = useState<TrainingRoomResponse[]>([]);

  const [trainingTypes, setTrainingTypes] = useState<TrainingTypeResponse[]>(
    [],
  );

  const [optionsLoading, setOptionsLoading] = useState(true);

  const [optionsError, setOptionsError] = useState("");

  const [sessions, setSessions] = useState<TrainingSession[]>([]);

  const [sessionsLoading, setSessionsLoading] = useState(false);

  const [sessionsError, setSessionsError] = useState("");

  const [currentRange, setCurrentRange] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const handleDatesChange = (from: string, to: string) => {
    setCurrentRange({
      from,
      to,
    });

    void loadSessions(from, to);
  };

  const loadSessions = async (from: string, to: string) => {
    try {
      setSessionsLoading(true);
      setSessionsError("");

      const data = await sessionService.getAdminSessions(from, to);

      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions:", error);

      setSessionsError("Δεν ήταν δυνατή η φόρτωση των sessions.");
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setOptionsLoading(true);
        setOptionsError("");

        const [trainerData, roomData, trainingTypeData] = await Promise.all([
          trainerService.getAll(),
          trainingRoomService.getAll(),
          trainingTypeService.getAll(),
        ]);

        setTrainers(trainerData);
        setRooms(roomData);
        setTrainingTypes(trainingTypeData);
      } catch (error) {
        console.error("Failed to load admin options:", error);

        setOptionsError(
          "Δεν ήταν δυνατή η φόρτωση trainers, αιθουσών και τύπων προπόνησης.",
        );
      } finally {
        setOptionsLoading(false);
      }
    };

    void loadOptions();
  }, []);

  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);

  const [selectedRange, setSelectedRange] =
    useState<SelectedSessionRange | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectSlot = (selection: DateSelectArg) => {
    if (optionsLoading) {
      return;
    }

    setSelectedSession(null);

    setSelectedRange({
      date: formatDate(selection.start),
      startTime: formatTime(selection.start),
      endTime: formatTime(selection.end),
    });

    setDialogOpen(true);
  };

  const handleSessionClick = (session: TrainingSession) => {
    setSelectedRange(null);
    setSelectedSession(session);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSession(null);
    setSelectedRange(null);
  };

  const handleSave = async (formData: SessionFormData) => {
    try {
      const response = await sessionService.createSession({
        trainerId: formData.trainerId,
        roomId: formData.roomId,
        trainingTypeId: formData.trainingTypeId,

        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,

        maxParticipants: formData.maxParticipants,

        status: "DRAFT",
      });

      setSuccessMessage(response.message);

      handleCloseDialog();

if (currentRange) {
  await loadSessions(
    currentRange.from,
    currentRange.to,
  );
}
    } catch (error) {
      console.error("Create session failed:", error);

      setSessionsError("Δεν ήταν δυνατή η δημιουργία του session.");
    }
  };

  const handleDelete = async (sessionId: number) => {
    try {
      const message = await sessionService.deleteSession(sessionId);

      setSuccessMessage(message);

      handleCloseDialog();

if (currentRange) {
  await loadSessions(
    currentRange.from,
    currentRange.to,
  );
}
    } catch (error) {
      console.error("Delete session failed:", error);
    }
  };

  const handlePublishDrafts = async () => {
    const draftIds = sessions
      .filter((session) => session.status === "DRAFT")
      .map((session) => session.sessionId);

    if (draftIds.length === 0) {
      return;
    }

    try {
      await sessionService.publishSessions(draftIds);

      setSuccessMessage("Τα sessions δημοσιεύτηκαν επιτυχώς.");

if (currentRange) {
  await loadSessions(
    currentRange.from,
    currentRange.to,
  );
}    } catch (error) {
      console.error("Publish failed:", error);
    }
  };

  const dialogKey = selectedSession
    ? `session-${selectedSession.sessionId}`
    : `new-${selectedRange?.date}-${selectedRange?.startTime}-${selectedRange?.endTime}`;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Διαχείριση Sessions
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Πάτησε ή σύρε πάνω σε ένα κενό χρονικό διάστημα για να δημιουργήσεις
          session.
        </Typography>
      </Box>

      {optionsError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {optionsError}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={
            sessionsLoading ||
            !sessions.some((session) => session.status === "DRAFT")
          }
          onClick={handlePublishDrafts}
        >
          Δημοσίευση Draft Sessions
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 1,
            md: 3,
          },
          borderRadius: 2.5,
          border: "1px solid rgba(148, 163, 184, 0.16)",
          overflowX: "auto",
        }}
      >
        <AdminWeeklySchedule
          sessions={sessions}
          onSelectSlot={handleSelectSlot}
          onSessionClick={handleSessionClick}
          onDatesChange={handleDatesChange}
        />
      </Paper>

      {dialogOpen && (
        <SessionFormDialog
          key={dialogKey}
          open
          session={selectedSession}
          initialDate={selectedRange?.date}
          initialStartTime={selectedRange?.startTime}
          initialEndTime={selectedRange?.endTime}
          trainers={trainers}
          rooms={rooms}
          trainingTypes={trainingTypes}
          onClose={handleCloseDialog}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminSessionsPage;
