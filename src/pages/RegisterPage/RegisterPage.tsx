import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./RegisterPage.css";
import errorMessage from "../../components/ui/ErrorMessage";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

export const RegisterPage = () => {
  const {
    register,
    loading: authLoading,
    error: authError,
    clearError,
  } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      errorMessage({ message: "As senhas não coincidem" } as FirebaseError);
      return;
    }

    if (!acceptTerms) {
      errorMessage({
        message: "Você deve aceitar os termos de uso",
      } as FirebaseError);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "user",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
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
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Criar Conta</h1>
          <p className="register-subtitle">
            Preencha os dados para se registrar
          </p>
        </div>

        {authError && <div className="error-message">{authError}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <User className="form-icon" />
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onFocus={handleEdit}
              className="form-input"
              required
            />
          </div>

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
            <Phone className="form-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Digite seu telefone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
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
              minLength={6}
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

          <div className="form-group">
            <Lock className="form-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onFocus={handleEdit}
              className="form-input"
              required
              minLength={6}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="password-toggle-icon" />
              ) : (
                <Eye className="password-toggle-icon" />
              )}
            </button>
          </div>

          <div className="terms-container">
            <div className="terms-checkbox-container">
              <input
                type="checkbox"
                name="accept-terms"
                id="accept-terms"
                className="terms-checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="accept-terms">
                Aceito os{" "}
                <button type="button" className="terms-link">
                  termos de uso
                </button>{" "}
                e{" "}
                <button type="button" className="terms-link">
                  política de privacidade
                </button>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={authLoading}
          >
            {authLoading ? (
              <>
                <span className="loading-spinner"></span>
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )}
          </button>

          <div className="register-subtitle-container">
            <p className="register-subtitle">Já tem uma conta?</p>
            <button
              className="register-subtitle-button"
              onClick={() => navigate(paths.login)}
            >
              Faça login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
