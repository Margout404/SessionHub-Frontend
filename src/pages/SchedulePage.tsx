import { useState } from "react";
import {
  Alert,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import WeeklySchedule from "../components/schedule/WeeklySchedule";
import sessionService from "../services/sessionService";

import type { TrainingSession } from "../types/session";

function SchedulePage() {
  const [sessions, setSessions] =
    useState<TrainingSession[]>([]);

  const [error, setError] = useState("");

  const handleDatesChange = async (
    from: string,
    to: string,
  ) => {
    try {
      setError("");

      const data =
        await sessionService.getPublishedSessions(
          from,
          to,
        );

      setSessions(data);
    } catch (error) {
      console.error(
        "Failed to load published sessions:",
        error,
      );

      setError(
        "Δεν ήταν δυνατή η φόρτωση του προγράμματος.",
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 35%), #090D16",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Weekly Schedule
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Δες τις διαθέσιμες προπονήσεις και κάνε κράτηση.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, md: 3 },
            borderRadius: 4,
            border:
              "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.35)",
            overflow: "hidden",
          }}
        >
          <WeeklySchedule
            sessions={sessions}
            onDatesChange={handleDatesChange}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default SchedulePage;