import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import bookingService from "../services/bookingService";
import type { BookingStatus, MyBooking } from "../types/booking";

function getStatusColor(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "success";

    case "WAITING_LIST":
      return "warning";

    case "CANCELLED":
      return "default";
  }
}

function getStatusLabel(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "Επιβεβαιωμένη";

    case "WAITING_LIST":
      return "Λίστα αναμονής";

    case "CANCELLED":
      return "Ακυρωμένη";
  }
}

function MyBookingsPage() {
  const [bookings, setBookings] = useState<MyBooking[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await bookingService.getMyBookings();

        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings:", error);

        setError("Δεν ήταν δυνατή η φόρτωση των κρατήσεών σου.");
      } finally {
        setLoading(false);
      }
    };

    void loadBookings();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Οι κρατήσεις μου
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Δες τις προπονήσεις στις οποίες έχεις κάνει κράτηση.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && bookings.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid rgba(148, 163, 184, 0.16)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Δεν έχεις κρατήσεις ακόμη
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Επίλεξε μια προπόνηση από το εβδομαδιαίο πρόγραμμα.
          </Typography>
        </Paper>
      )}

      <Stack spacing={2}>
        {bookings.map((booking) => (
          <Paper
            key={booking.bookingId}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(148, 163, 184, 0.16)",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {booking.trainingTypeName}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {booking.trainerName}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  {booking.date}
                  {" • "}
                  {booking.startTime.slice(0, 5)}
                  {" – "}
                  {booking.endTime.slice(0, 5)}
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mt: 0.5 }}
                >
                  {booking.roomName}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label={getStatusLabel(booking.bookingStatus)}
                  color={getStatusColor(booking.bookingStatus)}
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default MyBookingsPage;
