import { useState } from "react";
import Logo from "../components/layout/Logo";
import authService from "../services/authService";
import axios from "axios";
import { Alert, Box, Button, Container, Paper, TextField } from "@mui/material";
import type { LoginErrorResponse } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    try {
      const response = await authService.login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      await refreshUser();

      navigate("/schedule", { replace: true });
    } catch (error) {
      if (axios.isAxiosError<LoginErrorResponse>(error)) {
        const backendMessage = error.response?.data.message;

        setErrorMessage(
          backendMessage ?? "Something went wrong. Please try again.",
        );
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,

        background: `
        radial-gradient(
          circle at top left,
          rgba(59, 130, 246, 0.18),
          transparent 35%
        ),
        radial-gradient(
          circle at bottom right,
          rgba(139, 92, 246, 0.14),
          transparent 35%
        )
      `,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            padding: {
              xs: 3,
              sm: 5,
            },
            borderRadius: 4,
            backgroundColor: "rgba(18, 24, 38, 0.88)",
            backdropFilter: "blur(14px)",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
          }}
        >
          <Logo subtitle="Login to your SessionHub account" />


          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
            />

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>

            <Button type="button" onClick={() => navigate("/register")}>
              Register
            </Button>

            <Button
              type="button"
              variant="text"
              size="large"
              fullWidth
              sx={{
                color: "text.secondary",
              }}
            >
              Forgot Password?
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
