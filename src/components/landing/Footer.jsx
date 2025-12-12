import React from "react";
import { MessageCircle } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  const whatsappLink = "https://wa.me/5544998775978?text=Olá,%20tenho%20interesse%20em%20conhecer%20a%20Ludoteca!";

  return (
    <footer className="landing-footer">
      <div className="ludo-container footer-grid">
        {/* MARCA */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/logo.svg" alt="Ludoteca" width={44} height={44} />
            <span className="footer-wordmark">Ludoteca</span>
          </div>
          <p className="footer-tagline">Transforme como seu grupo escolhe jogos. Menos discussão, mais jogo.</p>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="footer-section">
          <h4>NAVEGAÇÃO</h4>
          <a href="#beneficios">Benefícios</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#faq">FAQ</a>
          <a href="/landingpage">Início</a>
        </div>

        {/* CONTATO */}
        <div className="footer-section">
          <h4>CONTATO</h4>
          <p className="footer-contact-email">E-mail: contato@ludoteca.com</p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-whatsapp">
            <MessageCircle size={16} />
            Falar com a Ludoteca
          </a>
        </div>

        {/* COMPROMISSO */}
        <div className="footer-section">
          <h4>COMPROMISSO</h4>
          <p className="footer-commitment">Operação estratégica baseada em dados. Foco em crescimento real, não promessas vazias.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="ludo-container">
          <small>© 2025 Ludoteca — Todos os direitos reservados</small>
        </div>
      </div>
    </footer>
  );
};

