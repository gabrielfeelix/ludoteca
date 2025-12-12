import React, { useMemo, useState } from "react";
import { Users, Clock, Share2, Star } from "lucide-react";
import "./GameDetailDrawer.css";

export const GameDetailDrawer = ({ game, onClose, isMobile }) => {
  const [rating, setRating] = useState(0);

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className="panel-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="detail-panel"
        style={isMobile ? { borderRadius: "32px 32px 0 0" } : undefined}
      >
        <button
          className="btn btn-ghost detail-close"
          type="button"
          onClick={onClose}
        >
          Fechar
        </button>

        <div
          className="detail-cover"
          style={{ background: game.cover }}
          aria-hidden="true"
        />

        <h2 className="detail-title">{game.title}</h2>

        <div className="game-meta detail-meta">
          <span className="meta-tag">
            <Users size={14} /> {game.players}
          </span>
          <span className="meta-tag">
            <Clock size={14} /> {game.time}
          </span>
          <span className="meta-tag">{game.weight}</span>
          <span className="meta-tag">{game.type}</span>
        </div>

        <div className="detail-section">
          <h3>Detalhes</h3>
          <p>Jogadores: {game.minPlayers} - {game.maxPlayers}</p>
          <p>Vibe: {game.vibe}</p>
          <p>Categoria: {game.type}</p>
        </div>

        <div className="detail-section">
          <h3>Como jogar rápido</h3>
          <p>Selecione um vídeo curto para relembrar regras.</p>
          {game.video ? (
            <a
              href={game.video}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline detail-link"
            >
              <Share2 size={16} /> Ver vídeo de regras
            </a>
          ) : (
            <p className="muted">Nenhum vídeo cadastrado.</p>
          )}
        </div>

        <div className="detail-section">
          <h3>Ações</h3>
          <div className="detail-actions">
            <button className="btn btn-primary" type="button">
              Adicionar à Mesa de Hoje
            </button>
            <button className="btn btn-outline" type="button">
              Registrar partida
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Minha avaliação</h3>
          <div className="rating-row" role="radiogroup" aria-label="Avaliação">
            {stars.map((value) => (
              <button
                key={value}
                type="button"
                className={`rating-star ${rating >= value ? "active" : ""}`}
                onClick={() => setRating(value)}
                aria-checked={rating === value}
                role="radio"
              >
                <Star size={20} />
              </button>
            ))}
            <span className="rating-label">
              {rating ? `${rating}/5` : "Sem nota"}
            </span>
          </div>
        </div>

        <div className="detail-section">
          <h3>Notas pessoais</h3>
          <textarea
            rows={4}
            placeholder="Adicione observações sobre este jogo..."
            className="detail-notes"
            defaultValue={game.notes}
          />
        </div>

        <div className="detail-section muted">
          <h3>Galeria</h3>
          <p>Nenhuma foto ainda. Em breve você poderá adicionar imagens.</p>
        </div>

        <div className="detail-section muted">
          <h3>Histórico</h3>
          <p>Em breve: registre partidas e veja seu histórico aqui.</p>
        </div>

        <button className="detail-remove" type="button">
          Remover da coleção
        </button>
      </div>
    </div>
  );
};

