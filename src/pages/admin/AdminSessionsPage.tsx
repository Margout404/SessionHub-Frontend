import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import { useState } from "react";

import type { DateSelectArg } from "@fullcalendar/core";

import AdminWeeklySchedule from "../../components/admin/AdminWeeklySchedule";
import SessionFormDialog from "../../components/admin/SessionFormDialog";

import { useAdminSessions } from "../../hooks/useAdminSessions";

import type {
  SelectedSessionRange,
  SessionFormData,
  TrainingSession,
} from "../../types/session";
import { rooms, trainers, trainingTypes } from "../../data/adminSessionOptions";

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
  const { sessions, saveSession, deleteSession } = useAdminSessions();

  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);

  const [selectedRange, setSelectedRange] =
    useState<SelectedSessionRange | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectSlot = (selection: DateSelectArg) => {
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

  const handleSave = (formData: SessionFormData) => {
    const message = saveSession(formData);

    setSuccessMessage(message);
    handleCloseDialog();
  };

  const handleDelete = (sessionId: number) => {
    deleteSession(sessionId);

    setSuccessMessage("Το session διαγράφηκε.");

    handleCloseDialog();
  };

  const dialogKey = selectedSession
    ? `session-${selectedSession.id}`
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
