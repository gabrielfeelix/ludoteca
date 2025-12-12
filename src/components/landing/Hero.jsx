import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="hero-tag">Universo pastel da Ludoteca</span>
        <h1>Organize sua estante de jogos com magia e praticidade.</h1>
        <p>Mostre sua coleção, convide seus amigos e decida em minutos o que vai para a mesa.</p>
        <div className="hero-actions">
          <Link to="/cadastro" className="btn btn-primary">
            Criar minha Ludoteca
          </Link>
          <a href="#como-funciona" className="btn btn-secondary">
            Ver como funciona
          </a>
        </div>
      </div>
    </section>
  );
};
