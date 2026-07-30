import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/layout/AppNavbar";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        backgroundImage: `
          radial-gradient(
            circle at top left,
            rgba(59, 130, 246, 0.12),
            transparent 32rem
          )
        `,
      }}
    >
      <AppNavbar />

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;