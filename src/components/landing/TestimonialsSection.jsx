import React from "react";
import { Star } from "lucide-react";
import "./TestimonialsSection.css";

const avatarColorMap = {
  yellow: "#F4B41A",
  red: "#E63946",
  pink: "#E91E63",
  blue: "#1E3A5F",
  orange: "#FF9500"
};

export const TestimonialsSection = ({ items }) => {
  return (
    <section id="depoimentos" className="testimonials-section">
      <div className="ludo-container">
        <span className="section-title">Depoimentos</span>
        <h2 className="section-heading">Jogadores apaixonados</h2>
        <div className="testimonials-grid">
          {items.map((item) => (
            <div key={item.author} className="testimonial-card">
              <div className="testimonial-header">
                <div
                  className="testimonial-avatar"
                  style={{ background: avatarColorMap[item.avatarColor] || avatarColorMap.yellow }}
                >
                  <span className="avatar-initials">{item.initials}</span>
                </div>
                <div className="testimonial-meta">
                  <h4 className="testimonial-author">{item.author}</h4>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="star-icon" fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

