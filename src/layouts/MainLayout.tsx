import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/layout/AppNavbar";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <AppNavbar />

      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;