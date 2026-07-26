import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { EventApi } from "@fullcalendar/core";

type SessionDetailsDialogProps = {
  open: boolean;
  session: EventApi | null;
  onClose: () => void;
  onEnroll: (sessionId: string) => void;
};

function SessionDetailsDialog({
  open,
  session,
  onClose,
  onEnroll,
}: SessionDetailsDialogProps) {
  if (!session) {
    return null;
  }

  const { roomName, trainerName, participants, capacity, description } =
    session.extendedProps;

  const availablePlaces = capacity - participants;
  const isFull = availablePlaces <= 0;

  const formatDate = (date: Date | null) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("el-GR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date | null) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("el-GR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleEnroll = () => {
    onEnroll(session.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            border: "1px solid rgba(148, 163, 184, 0.18)",
            background:
              "linear-gradient(180deg, rgba(18,24,38,0.99), rgba(9,13,22,0.99))",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          fontSize: "1.6rem",
          fontWeight: 700,
        }}
      >
        {session.title}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5}>
          {description && (
            <Typography color="text.secondary">{description}</Typography>
          )}

          <Divider />

          <Box>
            <Typography variant="overline" color="text.secondary">
              Ημερομηνία
            </Typography>

            <Typography sx={{ textTransform: "capitalize" }}>
              {formatDate(session.start)}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Ώρα
              </Typography>

              <Typography>
                {formatTime(session.start)} – {formatTime(session.end)}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Αίθουσα
              </Typography>

              <Typography>{roomName}</Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="overline" color="text.secondary">
              Προπονητής
            </Typography>

            <Typography>{trainerName}</Typography>
          </Box>

          <Box>
            <Typography variant="overline" color="text.secondary">
              Διαθεσιμότητα
            </Typography>

            <Box
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={`${participants}/${capacity} θέσεις`}
                color={isFull ? "error" : "primary"}
                variant="outlined"
              />

              {!isFull && (
                <Typography variant="body2" color="text.secondary">
                  Απομένουν {availablePlaces}
                </Typography>
              )}
            </Box>
          </Box>

          {isFull && (
            <Alert severity="warning">
              Η συγκεκριμένη προπόνηση είναι πλήρης.
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button type="button" color="inherit" onClick={onClose}>
          Κλείσιμο
        </Button>

        <Button
          type="button"
          variant="contained"
          disabled={isFull}
          onClick={handleEnroll}
        >
          Enroll
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SessionDetailsDialog;
