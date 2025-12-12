import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { PERSONAS } from "../../data/mockData";
import "./TestimonialsSection.css";

export const TestimonialsSection = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = items.slice(currentIndex, currentIndex + 2);
  const hasNext = currentIndex + 2 < items.length;
  const hasPrev = currentIndex > 0;

  const goNext = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const goPrev = () => {
    if (hasPrev) {
      setCurrentIndex(Math.max(0, currentIndex - 2));
    }
  };

  const getPersonaForItem = (item) => {
    return PERSONAS.find(p => p.key === item.persona);
  };

  return (
    <section id="depoimentos" className="testimonials-section">
      <div className="ludo-container">
        <span className="section-title">Depoimentos</span>
        <h2 className="section-heading">Jogadores apaixonados</h2>

        <div className="testimonials-carousel-wrapper">
          <div className="testimonials-carousel">
            {visibleItems.map((item) => {
              const persona = getPersonaForItem(item);
              return (
                <div key={item.author} className="testimonial-card-large">
                  <div className="testimonial-card-content">
                    {/* Avatar e Info à esquerda */}
                    <div className="testimonial-left">
                      <img
                        src={item.avatarImage}
                        alt={item.author}
                        className="testimonial-avatar-img"
                      />
                      <div className="testimonial-info">
                        <h4 className="testimonial-author">{item.author}</h4>
                        <p className="testimonial-role">{item.role}</p>

                        <div className="testimonial-rating">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="star-icon" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                  </div>

                  {/* Persona Card à direita */}
                  {persona && (
                    <div className="testimonial-persona-preview">
                      <img
                        src={`/assets/carta-personagem-${PERSONAS.indexOf(persona) + 1}.png`}
                        alt={persona.title}
                        className="persona-card-thumbnail"
                      />
                      <div className="persona-badge">{persona.title}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Controles de navegação */}
          <div className="carousel-controls">
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={goPrev}
              disabled={!hasPrev}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="carousel-dots">
              {Array.from({ length: Math.ceil(items.length / 2) }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === Math.floor(currentIndex / 2) ? "active" : ""}`}
                  onClick={() => setCurrentIndex(i * 2)}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-btn carousel-btn-next"
              onClick={goNext}
              disabled={!hasNext}
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

