import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  const Home = () => {
    return <div>Home</div>;
  };
  const Login = () => {
    return <div>Login</div>;
  };
  const Register = () => {
    return <div>Register</div>;
  };
  const MenuAdmin = () => {
    return <div>MenuAdmin</div>;
  };

  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<Register />} />
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
