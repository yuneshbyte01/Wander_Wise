import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // stored during login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "ADMIN") {
    return <Navigate to="/" replace />; // Optional: change to /403 if you add a Forbidden page
  }

  return children;
}
