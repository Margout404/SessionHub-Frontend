import { Box, Container, Typography } from "@mui/material";

function MyBookingsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Οι κρατήσεις μου
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Εδώ θα εμφανίζονται οι προπονήσεις στις οποίες έχεις κάνει enroll.
        </Typography>
      </Container>
    </Box>
  );
}

export default MyBookingsPage;
