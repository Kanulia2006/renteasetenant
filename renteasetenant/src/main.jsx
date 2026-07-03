import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from "./App.jsx"
import Admin from "./Admin.jsx";

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tenant" replace />} />
        <Route path="/tenant" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)  