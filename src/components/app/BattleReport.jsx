import React from 'react';
import { X, Share2, RotateCcw, MoreVertical, MapPin, Clock, Trophy } from 'lucide-react';
import './BattleReport.css';

export const BattleReport = ({ partida, isOpen, onClose, onEdit, onDelete, onRevanche }) => {
  if (!isOpen || !partida) return null;

  const vencedor = partida.jogadores.find(j => j.id === partida.vencedorId);
  const partidasOrdenadas = [...partida.jogadores].sort((a, b) => {
    const scoreA = typeof a.pontuacao === 'number' ? a.pontuacao : 0;
    const scoreB = typeof b.pontuacao === 'number' ? b.pontuacao : 0;
    return scoreB - scoreA;
  });
  const maxScore = Math.max(...partidasOrdenadas.map(j => typeof j.pontuacao === 'number' ? j.pontuacao : 0));

  const handleShare = () => {
    const text = `🎲 ${partida.jogoNome}\n🏆 Vencedor: ${vencedor?.nome}\n📅 ${new Date(partida.data).toLocaleDateString('pt-BR')}\n\nPlacar:\n${partidasOrdenadas.map((j, i) => `${i + 1}. ${j.nome} - ${j.pontuacao}`).join('\n')}`;
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="battle-report-card" onClick={(e) => e.stopPropagation()}>
        <div className="battle-report-header">
          <button className="battle-back" onClick={onClose}>
            <X size={24} />
          </button>
          <div className="battle-menu">
            <button className="battle-menu-btn">
              <MoreVertical size={20} />
            </button>
            <div className="battle-dropdown">
              <button onClick={() => { onEdit?.(partida); onClose(); }}>Editar partida</button>
              <button className="danger" onClick={() => { onDelete?.(partida.id); onClose(); }}>Excluir partida</button>
            </div>
          </div>
        </div>

        <div className="battle-game-header">
          <h2>{partida.jogoNome}</h2>
          <p>
            📅 {new Date(partida.data).toLocaleDateString('pt-BR')} • 📍 {partida.local}
          </p>
        </div>

        <div className="battle-winner-card">
          <h3>👑 VENCEDOR 👑</h3>
          <div className="battle-winner-avatar">
            {vencedor?.nome?.charAt(0).toUpperCase()}
          </div>
          <h4>{vencedor?.nome}</h4>
          <p className="battle-winner-score">{vencedor?.pontuacao} pontos</p>
          <div className="battle-mvp-badge">🏆 MVP DA PARTIDA 🏆</div>
        </div>

        <div className="battle-section">
          <h3>PLACAR</h3>
          <div className="battle-placar">
            {partidasOrdenadas.map((jogador, index) => (
              <div key={jogador.id} className={`battle-placar-item ${jogador.isUsuario ? 'user' : ''}`}>
                <span className="battle-rank">#{index + 1}</span>
                <span className="battle-player-name">{jogador.nome}</span>
                <div className="battle-progress-bar">
                  <div
                    className="battle-progress-fill"
                    style={{ width: `${maxScore > 0 ? (typeof jogador.pontuacao === 'number' ? jogador.pontuacao / maxScore * 100 : 0) : 0}%` }}
                  />
                </div>
                <span className="battle-score">{jogador.pontuacao} pts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="battle-section">
          <h3>DETALHES</h3>
          <div className="battle-details-grid">
            <div className="battle-detail-card">
              <MapPin size={20} />
              <span className="battle-detail-label">Local</span>
              <span className="battle-detail-value">{partida.local || 'Não informado'}</span>
            </div>
            <div className="battle-detail-card">
              <Clock size={20} />
              <span className="battle-detail-label">Duração</span>
              <span className="battle-detail-value">{partida.duracao} min</span>
            </div>
          </div>
        </div>

        {partida.foto && (
          <div className="battle-section">
            <h3>📷 FOTO DA PARTIDA</h3>
            <img src={partida.foto} alt="Foto da partida" className="battle-photo" />
          </div>
        )}

        {partida.notas && (
          <div className="battle-section">
            <h3>📝 NOTAS</h3>
            <p className="battle-notes">{partida.notas}</p>
          </div>
        )}

        <div className="battle-actions">
          <button className="btn btn-outline" onClick={handleShare}>
            <Share2 size={18} /> Compartilhar
          </button>
          <button className="btn btn-primary" onClick={() => onRevanche?.(partida)}>
            <RotateCcw size={18} /> Revanche
          </button>
        </div>
      </div>
    </div>
  );
};
