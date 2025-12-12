import React from "react";
import { Quote } from "lucide-react";
import { Card } from "../shared/Card";
import "./TestimonialsSection.css";

export const TestimonialsSection = ({ items }) => {
  return (
    <section id="depoimentos" className="testimonials-section">
      <div className="ludo-container">
        <span className="section-title">Depoimentos</span>
        <h2 className="section-heading">Jogadores apaixonados</h2>
        <div className="testimonials-grid">
          {items.map((item) => (
            <Card key={item.author} className="testimonial-card">
              <div className="testimonial-quote">
                <Quote className="quote-icon" aria-hidden="true" />
                <p>&ldquo;{item.quote}&rdquo;</p>
              </div>
              <div className="testimonial-author">{item.author}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

