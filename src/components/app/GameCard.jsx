import React, { useState } from "react";
import { Heart, MoreHorizontal, Users, Clock } from "lucide-react";
import "./GameCard.css";

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onOpen,
  onQuickAction
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="game-card">
      <button
        className="game-cover"
        style={{ background: game.cover }}
        onClick={() => onOpen(game)}
        aria-label={`Abrir detalhes de ${game.title}`}
        type="button"
      />

      <div className="game-card-header">
        <strong className="game-title">{game.title}</strong>
        <div className="game-actions">
          <button
            type="button"
            onClick={() => onToggleFavorite(game.id)}
            className="icon-btn"
            aria-label={isFavorite ? "Remover dos favoritos" : "Favoritar"}
          >
            <Heart
              size={18}
              color={isFavorite ? "var(--cuphead-red)" : "var(--muted)"}
              fill={isFavorite ? "var(--cuphead-red)" : "none"}
            />
          </button>

          <div className="more-menu">
            <button
              type="button"
              className="icon-btn"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <MoreHorizontal size={18} />
            </button>
            {menuOpen && (
              <div className="more-dropdown">
                <button type="button" onClick={() => onQuickAction("editar", game)}>
                  Editar jogo
                </button>
                <button type="button" onClick={() => onQuickAction("detalhes", game)}>
                  Ver detalhes
                </button>
                <button
                  type="button"
                  onClick={() => onQuickAction("remover", game)}
                  className="danger"
                >
                  Remover
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="game-meta">
        <span className="meta-tag">
          <Users size={14} /> {game.players}
        </span>
        <span className="meta-tag">
          <Clock size={14} /> {game.time}
        </span>
        <span className="meta-tag">{game.weight}</span>
        <span className="meta-tag">{game.vibe}</span>
      </div>
    </div>
  );
};

