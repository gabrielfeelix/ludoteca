import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const LogoMark = ({ showWordmark = false, size = 48 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <img src="/assets/logo.svg" alt="Ludoteca" style={{ width: size, height: size }} />
    {showWordmark && (
      <span style={{
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: 700,
        fontSize: "1.4rem",
        color: "var(--cuphead-black)"
      }}>
        Ludoteca
      </span>
    )}
  </div>
);

export const Header = () => {
  return (
    <header className="landing-header">
      <div className="ludo-container inner">
        <LogoMark showWordmark />
        <nav className="landing-nav">
          <a href="#demo">Demo</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#para-quem">Para quem é</a>
          <a href="#depoimentos">Depoimentos</a>
        </nav>
        <div className="landing-actions">
          <Link className="btn btn-outline" to="/login">Entrar</Link>
          <Link className="btn btn-primary" to="/cadastro">Criar conta</Link>
        </div>
      </div>
    </header>
  );
};
