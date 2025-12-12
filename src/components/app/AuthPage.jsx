import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../shared/Card";
import { Toast } from "../shared/Toast";
import "./AuthPage.css";

export const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState(
    mode === "login"
      ? { email: "", password: "", remember: true }
      : { name: "", email: "", password: "", confirm: "", terms: false }
  );

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === "signup" && form.password !== form.confirm) {
      setToast({ variant: "error", message: "Senhas não conferem" });
      return;
    }
    if (mode === "signup" && !form.terms) {
      setToast({ variant: "error", message: "Aceite os termos para continuar" });
      return;
    }

    setToast({ variant: "success", message: "Bem-vindo!" });
    window.setTimeout(() => {
      if (mode === "signup") navigate("/onboarding");
      else navigate("/home");
    }, 600);
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card" hover={false}>
        <Link to="/landingpage" className="auth-logo">
          <img src="/assets/logo.svg" alt="Ludoteca" width={44} height={44} />
          <span>Ludoteca</span>
        </Link>

        <h1 className="auth-title">{mode === "login" ? "Entrar" : "Criar conta"}</h1>

        <button type="button" className="btn btn-outline auth-google" onClick={() => setToast({ variant: "info", message: "Login Google em breve" })}>
          Continuar com Google
        </button>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <label>
              Nome completo
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Seu nome"
              />
            </label>
          )}

          <label>
            E-mail
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {mode === "signup" && (
            <label>
              Confirmar senha
              <input
                type="password"
                required
                value={form.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                placeholder="••••••••"
              />
            </label>
          )}

          {mode === "login" && (
            <div className="auth-row">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => handleChange("remember", e.target.checked)}
                />
                Lembrar de mim
              </label>
              <a href="#" className="auth-link">Esqueci minha senha</a>
            </div>
          )}

          {mode === "signup" && (
            <label className="check-row auth-terms">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => handleChange("terms", e.target.checked)}
              />
              Li e aceito os Termos de Uso e Política de Privacidade
            </label>
          )}

          <button type="submit" className="btn btn-primary auth-submit">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="auth-footer">
          {mode === "login" ? (
            <>
              Não tem conta? <Link to="/cadastro">Criar conta grátis</Link>
            </>
          ) : (
            <>
              Já tem conta? <Link to="/login">Entrar</Link>
            </>
          )}
        </div>
      </Card>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

