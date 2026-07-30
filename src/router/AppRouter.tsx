import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import SchedulePage from "../pages/SchedulePage";
import MyBookingsPage from "../pages/MyBookingsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import AdminRoute from "../components/auth/AdminRoute";
import AdminSessionsPage from "../pages/admin/AdminSessionsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/schedule"
            element={<SchedulePage />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookingsPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route
          path="/admin/sessions"
          element={
            <AdminRoute>
              <AdminSessionsPage />
            </AdminRoute>
          }
        />
        </Route>
      


        <Route
          path="/"
          element={<Navigate to="/schedule" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/schedule" replace />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;