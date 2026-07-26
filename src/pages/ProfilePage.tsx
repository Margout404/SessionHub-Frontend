import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { useAuth } from "../context/useAuth";

function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Φόρτωση προφίλ...</Typography>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  const initials =
    `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        Προφίλ
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 4,
          maxWidth: 650,
          borderRadius: 2.5,
          border:
            "1px solid rgba(148, 163, 184, 0.16)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "primary.main",
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
            >
              {user.firstName} {user.lastName}
            </Typography>

            <Typography color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          <ProfileField
            label="Όνομα"
            value={user.firstName}
          />

          <ProfileField
            label="Επώνυμο"
            value={user.lastName}
          />

          <ProfileField
            label="Email"
            value={user.email}
          />

          <ProfileField
            label="Ρόλος"
            value={user.role}
          />
        </Box>
      </Paper>
    </Container>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({
  label,
  value,
}: ProfileFieldProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography sx={{ mt: 0.5, fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default ProfilePage;