import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

export default function RequireAuth({ role, children }) {
  if (!isAuthenticated(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
