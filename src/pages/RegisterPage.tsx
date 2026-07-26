import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import authService from "../services/authService";
import type { LoginErrorResponse } from "../types/auth";
import Logo from "../components/layout/Logo";

function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage(
        "Οι κωδικοί πρόσβασης δεν ταιριάζουν.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await authService.register({
        firstName,
        lastName,
        email,
        password,
      });

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
        },
      });
    } catch (error: unknown) {
      if (
        axios.isAxiosError<LoginErrorResponse>(error)
      ) {
        setErrorMessage(
          error.response?.data.message ??
            "Η εγγραφή απέτυχε.",
        );
      } else {
        setErrorMessage("Η εγγραφή απέτυχε.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.14), transparent 35%), #090D16",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border:
              "1px solid rgba(148, 163, 184, 0.18)",
            background:
              "linear-gradient(180deg, rgba(18,24,38,0.98), rgba(9,13,22,0.98))",
            boxShadow:
              "0 28px 80px rgba(0,0,0,0.45)",
          }}
        >
          <Logo
            subtitle="Create your account"
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {errorMessage && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}

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
                label="Όνομα"
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                label="Επώνυμο"
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                required
                fullWidth
              />
            </Box>

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              fullWidth
              autoComplete="email"
            />

            <TextField
              label="Κωδικός πρόσβασης"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              fullWidth
              autoComplete="new-password"
            />

            <TextField
              label="Επιβεβαίωση κωδικού"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
              fullWidth
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                py: 1.3,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {isSubmitting
                ? "Γίνεται εγγραφή..."
                : "Δημιουργία λογαριασμού"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: "center",
                mt: 1,
              }}
            >
              Έχεις ήδη λογαριασμό;{" "}
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Σύνδεση
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;