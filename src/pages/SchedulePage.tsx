import { Box, Container, Paper, Typography } from "@mui/material";
import WeeklySchedule from "../components/schedule/WeeklySchedule";

function SchedulePage() {
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

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, md: 3 },
            borderRadius: 4,
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
            overflow: "hidden",
          }}
        >
          <WeeklySchedule />
        </Paper>
      </Container>
    </Box>
  );
}

export default SchedulePage;