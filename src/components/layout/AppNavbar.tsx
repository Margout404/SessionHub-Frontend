import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useAuth } from "../../context/useAuth";

function AppNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "?";

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Χρήστης";

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isProfileMenuOpen = Boolean(anchorElement);

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseProfileMenu();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
        background: "rgba(9, 13, 22, 0.88)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 68,
            px: { xs: 1.5, md: 2.5 },
            gap: 2,
          }}
        >
          <Typography
            component={NavLink}
            to="/schedule"
            variant="h5"
            sx={{
              mr: 2,
              color: "text.primary",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textDecoration: "none",
            }}
          >
            Session
            <Box component="span" sx={{ color: "primary.main" }}>
              Hub
            </Box>
          </Typography>

          <Box
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
            }}
          >
            <Button
              component={NavLink}
              to="/schedule"
              sx={{
                px: 2,
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 2.5,

                "&.active": {
                  color: "primary.main",
                  backgroundColor: "rgba(109, 40, 217, 0.12)",
                },

                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Weekly Schedule
            </Button>

            <Button
              component={NavLink}
              to="/my-bookings"
              sx={{
                px: 2,
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 2.5,

                "&.active": {
                  color: "primary.main",
                  backgroundColor: "rgba(109, 40, 217, 0.12)",
                },

                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Οι κρατήσεις μου
            </Button>

            {user?.role === "ADMIN" && (
              <Button
                component={NavLink}
                to="/admin/sessions"
                sx={{
                  px: 2,
                  color: "text.secondary",
                  textTransform: "none",
                  borderRadius: 2.5,

                  "&.active": {
                    color: "primary.main",
                    backgroundColor: "rgba(109, 40, 217, 0.12)",
                  },

                  "&:hover": {
                    color: "text.primary",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                Διαχείριση Sessions
              </Button>
            )}
          </Box>

          <Tooltip title="Άνοιγμα προφίλ">
            <IconButton
              onClick={handleOpenProfileMenu}
              size="small"
              aria-controls={isProfileMenuOpen ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isProfileMenuOpen ? "true" : undefined}
              sx={{
                p: 0.5,
                border: "1px solid rgba(148, 163, 184, 0.16)",
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="profile-menu"
            anchorEl={anchorElement}
            open={isProfileMenuOpen}
            onClose={handleCloseProfileMenu}
            onClick={handleCloseProfileMenu}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  minWidth: 230,
                  borderRadius: 3,
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  background: "#121826",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography sx={{ fontWeight: 700 }}>{fullName}</Typography>

              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>

              <Typography variant="caption" color="primary.main">
                {user?.role}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={() => navigate("/profile")} sx={{ py: 1.25 }}>
              Προφίλ
            </MenuItem>

            <MenuItem
              onClick={() => navigate("/my-bookings")}
              sx={{ py: 1.25 }}
            >
              Οι κρατήσεις μου
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.25,
                color: "error.main",
              }}
            >
              Αποσύνδεση
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavbar;
