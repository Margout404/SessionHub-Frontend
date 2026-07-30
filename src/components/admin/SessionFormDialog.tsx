import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

import type {
  SessionFormData,
  SessionStatus,
  TrainingSession,
} from "../../types/session";

type Option = {
  id: number;
  name: string;
};

type SessionFormDialogProps = {
  open: boolean;
  session?: TrainingSession | null;
  initialDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  trainers: Option[];
  rooms: Option[];
  trainingTypes: Option[];
  onClose: () => void;
  onSave: (data: SessionFormData) => void;
  onDelete?: (sessionId: number) => void;
};

const emptyForm: SessionFormData = {
  trainingTypeId: 0,
  trainerId: 0,
  roomId: 0,
  date: "",
  startTime: "",
  endTime: "",
  maxParticipants: 10,
  description: "",
  status: "DRAFT",
};

function createInitialForm(
  session?: TrainingSession | null,
  initialDate?: string,
  initialStartTime?: string,
  initialEndTime?: string,
): SessionFormData {
  if (session) {
    return {
      id: session.id,
      trainingTypeId: session.trainingTypeId,
      trainerId: session.trainerId,
      roomId: session.roomId,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      maxParticipants: session.maxParticipants,
      description: session.description ?? "",
      status: session.status,
    };
  }

  return {
    ...emptyForm,
    date: initialDate ?? "",
    startTime: initialStartTime ?? "",
    endTime: initialEndTime ?? "",
  };
}

function SessionFormDialog({
  open,
  session,
  initialDate,
  initialStartTime,
  initialEndTime,
  trainers,
  rooms,
  trainingTypes,
  onClose,
  onSave,
  onDelete,
}: SessionFormDialogProps) {
  const [form, setForm] = useState<SessionFormData>(() =>
    createInitialForm(
      session,
      initialDate,
      initialStartTime,
      initialEndTime,
    ),
  );

  const [error, setError] = useState("");

  const updateField = <K extends keyof SessionFormData>(
    field: K,
    value: SessionFormData[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };
  const validate = () => {
    if (
      !form.trainingTypeId ||
      !form.trainerId ||
      !form.roomId
    ) {
      setError(
        "Επίλεξε training type, trainer και αίθουσα.",
      );
      return false;
    }

    if (
      !form.date ||
      !form.startTime ||
      !form.endTime
    ) {
      setError(
        "Συμπλήρωσε ημερομηνία και ώρες.",
      );
      return false;
    }

    if (form.startTime >= form.endTime) {
      setError(
        "Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης.",
      );
      return false;
    }

    if (form.maxParticipants < 1) {
      setError(
        "Η χωρητικότητα πρέπει να είναι τουλάχιστον 1.",
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSave(form);
  };

  const handleDelete = () => {
    if (!session || !onDelete) {
      return;
    }

    onDelete(session.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {session
          ? "Επεξεργασία Session"
          : "Νέο Session"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          <FormControl fullWidth>
            <InputLabel>Training Type</InputLabel>

            <Select
              label="Training Type"
              value={form.trainingTypeId}
              onChange={(event) =>
                updateField(
                  "trainingTypeId",
                  Number(event.target.value),
                )
              }
            >
              <MenuItem value={0} disabled>
                Επίλεξε τύπο
              </MenuItem>

              {trainingTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Trainer</InputLabel>

            <Select
              label="Trainer"
              value={form.trainerId}
              onChange={(event) =>
                updateField(
                  "trainerId",
                  Number(event.target.value),
                )
              }
            >
              <MenuItem value={0} disabled>
                Επίλεξε trainer
              </MenuItem>

              {trainers.map((trainer) => (
                <MenuItem
                  key={trainer.id}
                  value={trainer.id}
                >
                  {trainer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Αίθουσα</InputLabel>

            <Select
              label="Αίθουσα"
              value={form.roomId}
              onChange={(event) =>
                updateField(
                  "roomId",
                  Number(event.target.value),
                )
              }
            >
              <MenuItem value={0} disabled>
                Επίλεξε αίθουσα
              </MenuItem>

              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Ημερομηνία"
            type="date"
            value={form.date}
            onChange={(event) =>
              updateField("date", event.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <TextField
              label="Ώρα έναρξης"
              type="time"
              value={form.startTime}
              onChange={(event) =>
                updateField(
                  "startTime",
                  event.target.value,
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Ώρα λήξης"
              type="time"
              value={form.endTime}
              onChange={(event) =>
                updateField(
                  "endTime",
                  event.target.value,
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>

          <TextField
            label="Μέγιστοι συμμετέχοντες"
            type="number"
            value={form.maxParticipants}
            onChange={(event) =>
              updateField(
                "maxParticipants",
                Number(event.target.value),
              )
            }
            slotProps={{
              htmlInput: {
                min: 1,
              },
            }}
          />

          <TextField
            label="Περιγραφή"
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value,
              )
            }
            multiline
            minRows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>

            <Select
              label="Status"
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as SessionStatus,
                )
              }
            >
              <MenuItem value="DRAFT">
                Draft
              </MenuItem>

              <MenuItem value="PUBLISHED">
                Published
              </MenuItem>

              <MenuItem value="CANCELLED">
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          justifyContent: "space-between",
        }}
      >
        <Box>
          {session && onDelete && (
            <Button
              color="error"
              onClick={handleDelete}
            >
              Διαγραφή
            </Button>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={onClose}>
            Ακύρωση
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {session
              ? "Αποθήκευση"
              : "Δημιουργία"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default SessionFormDialog;