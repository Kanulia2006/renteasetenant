import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import RoleSelect from "./auth/RoleSelect.jsx";
import ComingSoon from "./auth/ComingSoon.jsx";
import RequireAuth from "./lib/RequireAuth.jsx";
import LandingPage from "./marketing/LandingPage.jsx";
import PropertyDetails from "./marketing/PropertyDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/get-started" element={<RoleSelect />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/tenant"
          element={
            <RequireAuth role="tenant">
              <App />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminApp />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
