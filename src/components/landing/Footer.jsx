import React from "react";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="ludo-container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/logo.svg" alt="Ludoteca" width={44} height={44} />
            <span className="footer-wordmark">Ludoteca</span>
          </div>
          <p className="footer-tagline">Menos discussão. Mais jogo.</p>
        </div>

        <div className="footer-links">
          <h4>Links</h4>
          <a href="#">Termos</a>
          <a href="#">Privacidade</a>
          <a href="#">Contato</a>
        </div>

        <div className="footer-social">
          <h4>Redes</h4>
          <div className="footer-social-row">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter/X">
              <Twitter />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord">
              <MessageCircle />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="ludo-container">
          <small>Feito com ♥ em Maringá — © 2025 Ludoteca</small>
        </div>
      </div>
    </footer>
  );
};

