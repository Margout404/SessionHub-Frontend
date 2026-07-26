import { Box, Typography } from "@mui/material";

type LogoProps = {
  subtitle?: string;
};

function Logo({ subtitle }: LogoProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
        }}
      >
        <Box component="span" sx={{ color: "common.white" }}>
          Session
        </Box>

        <Box component="span" sx={{ color: "primary.main" }}>
          Hub
        </Box>
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1.5,
            textAlign: "center",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default Logo;