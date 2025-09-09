import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<LoginPage />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route
        path={paths.dashboard}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
