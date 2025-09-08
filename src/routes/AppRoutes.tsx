import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";

export const AppRoutes = () => {
  const MenuAdmin = () => {
    return <div>MenuAdmin</div>;
  };

  return (
    <Routes>
      <Route path={paths.home} element={<LoginPage />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route
        path={paths.menuAdmin}
        element={
          <ProtectedRoute>
            <MenuAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
