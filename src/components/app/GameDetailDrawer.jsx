import React, { useMemo, useState } from "react";
import { Users, Clock, Share2, Star, Calendar, Trophy } from "lucide-react";
import { MOCK_PARTIDAS } from "../../data/mockData";
import "./GameDetailDrawer.css";

export const GameDetailDrawer = ({ game, onClose, isMobile, onRegisterMatch, onRemove }) => {
  const [rating, setRating] = useState(0);
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  const gamePartidas = useMemo(() =>
    MOCK_PARTIDAS.filter(p => p.jogoId === game.id).sort((a, b) => new Date(b.data) - new Date(a.data)),
    [game.id]
  );

  const ultimaPartida = gamePartidas[0];
  const totalPartidas = gamePartidas.length;

  const getUltimaVezJogado = () => {
    if (!ultimaPartida) return "Nunca jogado";
    const diff = Date.now() - new Date(ultimaPartida.data).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Hoje";
    if (days === 1) return "Ontem";
    if (days < 7) return `Há ${days} dias`;
    if (days < 30) return `Há ${Math.floor(days / 7)} semanas`;
    if (days < 365) return `Há ${Math.floor(days / 30)} meses`;
    return `Há ${Math.floor(days / 365)} anos`;
  };

  const getCoverStyle = () => {
    if (game.cover && (game.cover.startsWith("/") || game.cover.startsWith("http"))) {
      return {
        backgroundImage: `url(${game.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
    return { background: game.cover };
  };

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
          style={getCoverStyle()}
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
          <h3>Sobre o jogo</h3>
          <p>{game.description || "Descrição não disponível."}</p>
        </div>

        <div className="detail-section">
          <h3>Detalhes</h3>
          <p>Jogadores: {game.minPlayers} - {game.maxPlayers}</p>
          <p>Vibe: {game.vibe}</p>
          <p>Categoria: {game.type}</p>
          <p><Calendar size={16} style={{display: 'inline', marginRight: '4px'}} />Última partida: {getUltimaVezJogado()}</p>
          <p><Trophy size={16} style={{display: 'inline', marginRight: '4px'}} />Partidas: {totalPartidas} {totalPartidas === 1 ? 'partida registrada' : 'partidas registradas'}</p>
        </div>

        <div className="detail-section">
          <h3>Como jogar rápido</h3>
          <p>Selecione um vídeo curto para relembrar regras.</p>
          {game.video && game.video.trim() !== '' ? (
            <a
              href={game.video}
              target="_blank"
              rel="noreferrer noopener"
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
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                // TODO: Implement Mesa de Hoje logic
                alert('Funcionalidade "Adicionar à Mesa de Hoje" será implementada em breve!');
              }}
            >
              Adicionar à Mesa de Hoje
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                if (onRegisterMatch) {
                  onRegisterMatch(game);
                }
              }}
            >
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

        <div className="detail-section">
          <h3>Histórico</h3>
          {gamePartidas.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              <p className="muted">Nenhuma partida registrada ainda.</p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (onRegisterMatch) {
                    onRegisterMatch(game);
                  }
                }}
                style={{marginTop: '12px'}}
              >
                + REGISTRAR PRIMEIRA PARTIDA
              </button>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {gamePartidas.slice(0, 3).map((partida) => {
                const vencedor = partida.jogadores.find(j => j.id === partida.vencedorId);
                const usuarioVenceu = vencedor?.isUsuario;
                return (
                  <div
                    key={partida.id}
                    style={{
                      padding: '12px',
                      background: usuarioVenceu ? 'linear-gradient(90deg, #FFF8E7 0%, var(--cuphead-white) 100%)' : '#F5F5F5',
                      border: '3px solid var(--cuphead-black)',
                      borderLeft: usuarioVenceu ? '6px solid var(--cuphead-yellow)' : '6px solid #CCCCCC',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                      <strong>{new Date(partida.data).toLocaleDateString('pt-BR')}</strong>
                      {usuarioVenceu ? <Trophy size={16} style={{color: 'var(--cuphead-yellow)'}} /> : <span>💀</span>}
                    </div>
                    <div style={{fontSize: '0.85rem', color: 'var(--muted)'}}>
                      🏆 {vencedor?.nome} • ⏱️ {partida.duracao}min
                    </div>
                  </div>
                );
              })}
              {gamePartidas.length > 3 && (
                <p className="muted" style={{textAlign: 'center', fontSize: '0.85rem', marginTop: '8px'}}>
                  + {gamePartidas.length - 3} partidas antigas
                </p>
              )}
            </div>
          )}
        </div>

        <button
          className="detail-remove"
          type="button"
          onClick={() => {
            if (confirm(`Tem certeza que deseja remover "${game.title}" da sua coleção?`)) {
              if (onRemove) {
                onRemove(game.id);
                onClose();
              }
            }
          }}
        >
          Remover da coleção
        </button>
      </div>
    </div>
  );
};

