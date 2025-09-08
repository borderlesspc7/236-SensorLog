import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";
import errorMessage from "../../components/ui/ErrorMessage";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export const LoginPage = () => {
  const {
    login,
    loading: authLoading,
    error: authError,
    clearError,
  } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      setFormData((prev) => ({ ...prev, email: "", password: "" }));
    } catch (error) {
      errorMessage(error as FirebaseError);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    clearError();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Bem-vindo</h1>
          <p className="login-subtitle">Faça login para continuar</p>
        </div>

        {authError && <div className="error-message">{authError}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Mail className="form-icon" />
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onFocus={handleEdit}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <Lock className="form-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onFocus={handleEdit}
              className="form-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="password-toggle-icon" />
              ) : (
                <Eye className="password-toggle-icon" />
              )}
            </button>
          </div>

          <div className="remember-me-container">
            <div className="remember-me-checkbox-container">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="remember-me-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Lembrar-me</label>
            </div>

            <button type="button" className="forgot-password-button">
              Esqueceu sua senha?
            </button>
          </div>

          <button type="submit" className="login-button" disabled={authLoading}>
            {authLoading ? (
              <>
                <span className="loading-spinner"></span>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <div className="login-subtitle-container">
            <p className="login-subtitle">Não tem uma conta?</p>
            <button
              className="login-subtitle-button"
              onClick={() => navigate(paths.register)}
            >
              Registre-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
