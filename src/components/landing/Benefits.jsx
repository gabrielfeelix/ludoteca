import React from 'react';
import { Wand2, Library, Link2, NotebookPen } from 'lucide-react';
import { Badge } from '../shared/Badge';
import './Benefits.css';

const iconMap = {
  'Mesa de Hoje': Wand2,
  'Minha Colecao': Library,
  'Link compartilhavel': Link2,
  'Registro de partidas': NotebookPen
};

export const Benefits = ({ cards }) => {
  // Separate featured card (Mesa de Hoje) from secondary cards
  const featuredCard = cards.find(card => card.title === 'Mesa de Hoje');
  const secondaryCards = cards.filter(card => card.title !== 'Mesa de Hoje');

  const renderCard = (card, isFeatured = false) => {
    const Icon = iconMap[card.title] || Wand2;

    return (
      <div
        key={card.title}
        className={`benefit-card ${isFeatured ? 'benefit-card--featured' : ''} ${card.badge ? 'benefit-card--soon' : ''}`}
        style={{ background: card.accent }}
      >
        {card.badge && (
          <Badge variant="red" className="benefit-badge">
            {card.badge}
          </Badge>
        )}
        {isFeatured && (
          <Badge variant="default" animated className="benefit-featured-badge">
            Destaque
          </Badge>
        )}
        <div className="benefit-icon">
          <Icon strokeWidth={2.5} />
        </div>
        <h4 className="benefit-title">{card.title}</h4>
        <p className="benefit-description">{card.description}</p>
      </div>
    );
  };

  return (
    <section className="benefits-section">
      <div className="ludo-container">
        <span className="section-title">Benefícios</span>
        <h2 className="section-heading">Cartas especiais da Ludoteca</h2>
        <div className="benefit-deck">
          <div className="benefit-featured-column">
            {featuredCard && renderCard(featuredCard, true)}
          </div>
          <div className="benefit-secondary-column">
            {secondaryCards.map(card => renderCard(card, false))}
          </div>
        </div>
      </div>
    </section>
  );
};
