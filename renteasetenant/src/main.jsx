import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Note: the original project referenced an Admin.jsx that wasn't part of
// the files shared for this redesign, so the /admin route has been left
// out for now. Add it back the same way once that page exists.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tenant" replace />} />
        <Route path="/tenant" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
