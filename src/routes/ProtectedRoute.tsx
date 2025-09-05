import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { paths } from "./paths";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to={paths.login} replace />;

  return <>{children}</>;
};
