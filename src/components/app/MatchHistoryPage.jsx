import React, { useState, useMemo } from 'react';
import { Plus, Trophy, Clock, TrendingUp, Gamepad2 } from 'lucide-react';
import { MOCK_PARTIDAS } from '../../data/mockData';
import { RecordMatchModal } from './RecordMatchModal';
import { BattleReport } from './BattleReport';
import { useToast } from '../../context/ToastContext';
import './MatchHistoryPage.css';

export const PartidasPage = ({ games = [] }) => {
  const [partidas, setPartidas] = useState(MOCK_PARTIDAS);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const [battleReportOpen, setBattleReportOpen] = useState(false);
  const [filterJogo, setFilterJogo] = useState('all');
  const [filterPeriodo, setFilterPeriodo] = useState('all');
  const { showToast } = useToast();

  const stats = useMemo(() => {
    const total = partidas.length;
    const vitorias = partidas.filter(p => {
      const vencedor = p.jogadores.find(j => j.id === p.vencedorId);
      return vencedor?.isUsuario;
    }).length;
    const tempoTotal = Math.round(partidas.reduce((acc, p) => acc + (p.duracao || 0), 0) / 60);
    const winRate = total > 0 ? Math.round((vitorias / total) * 100) : 0;

    return { total, vitorias, tempoTotal, winRate };
  }, [partidas]);

  const filteredPartidas = useMemo(() => {
    let filtered = [...partidas];

    if (filterJogo !== 'all') {
      filtered = filtered.filter(p => p.jogoId === parseInt(filterJogo));
    }

    if (filterPeriodo !== 'all') {
      const now = new Date();
      const cutoff = new Date();

      if (filterPeriodo === 'week') cutoff.setDate(now.getDate() - 7);
      else if (filterPeriodo === 'month') cutoff.setMonth(now.getMonth() - 1);
      else if (filterPeriodo === '3months') cutoff.setMonth(now.getMonth() - 3);
      else if (filterPeriodo === 'year') cutoff.setFullYear(now.getFullYear() - 1);

      filtered = filtered.filter(p => new Date(p.data) >= cutoff);
    }

    return filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [partidas, filterJogo, filterPeriodo]);

  const jogosComPartidas = useMemo(() => {
    const jogosMap = new Map();
    partidas.forEach(p => {
      const count = jogosMap.get(p.jogoId) || 0;
      jogosMap.set(p.jogoId, count + 1);
    });
    return Array.from(jogosMap.entries()).map(([id, count]) => {
      const partida = partidas.find(p => p.jogoId === id);
      return { id, nome: partida?.jogoNome || '', count };
    });
  }, [partidas]);

  const handleSavePartida = (novaPartida) => {
    setPartidas([novaPartida, ...partidas]);
    showToast('Partida registrada com sucesso! 🎲', 'success');
  };

  const handleDeletePartida = (id) => {
    if (confirm('Tem certeza que deseja excluir esta partida?')) {
      setPartidas(partidas.filter(p => p.id !== id));
      showToast('Partida excluída', 'info');
    }
  };

  const handleRevanche = (partida) => {
    setRecordModalOpen(true);
  };

  if (partidas.length === 0) {
    return (
      <div className="partidas-empty-container">
        <div className="partidas-empty">
          <div className="partidas-empty-icon">
            <Trophy size={80} strokeWidth={2} />
          </div>
          <h2>Nenhuma partida registrada</h2>
          <p>Registre suas sessões de jogo e acompanhe seu histórico de vitórias!</p>
          <button className="btn btn-primary" onClick={() => setRecordModalOpen(true)}>
            + REGISTRAR PRIMEIRA PARTIDA
          </button>
        </div>
        <RecordMatchModal
          isOpen={recordModalOpen}
          onClose={() => setRecordModalOpen(false)}
          onSave={handleSavePartida}
          games={games}
        />
      </div>
    );
  }

  return (
    <div className="partidas-page">
      <div className="partidas-stats-header">
        <div className="partidas-stat-card">
          <Gamepad2 size={32} />
          <div className="partidas-stat-value">{stats.total}</div>
          <div className="partidas-stat-label">Partidas</div>
        </div>
        <div className="partidas-stat-card">
          <Trophy size={32} />
          <div className="partidas-stat-value">{stats.vitorias}</div>
          <div className="partidas-stat-label">Vitórias</div>
        </div>
        <div className="partidas-stat-card">
          <Clock size={32} />
          <div className="partidas-stat-value">{stats.tempoTotal}h</div>
          <div className="partidas-stat-label">Tempo jogado</div>
        </div>
        <div className="partidas-stat-card">
          <TrendingUp size={32} />
          <div className="partidas-stat-value">{stats.winRate}%</div>
          <div className="partidas-stat-label">Win Rate</div>
        </div>
      </div>

      <button className="btn btn-primary partidas-record-btn" onClick={() => setRecordModalOpen(true)}>
        <Plus size={20} /> REGISTRAR PARTIDA
      </button>

      <div className="partidas-filters">
        <select value={filterJogo} onChange={(e) => setFilterJogo(e.target.value)} className="partidas-filter-select">
          <option value="all">Todos os jogos</option>
          {jogosComPartidas.map(jogo => (
            <option key={jogo.id} value={jogo.id}>{jogo.nome} ({jogo.count})</option>
          ))}
        </select>
        <select value={filterPeriodo} onChange={(e) => setFilterPeriodo(e.target.value)} className="partidas-filter-select">
          <option value="all">Todo o período</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mês</option>
          <option value="3months">Últimos 3 meses</option>
          <option value="year">Este ano</option>
        </select>
      </div>

      <h3 className="partidas-list-title">ÚLTIMAS PARTIDAS</h3>

      <div className="partidas-list">
        {filteredPartidas.map(partida => {
          const vencedor = partida.jogadores.find(j => j.id === partida.vencedorId);
          const usuarioVenceu = vencedor?.isUsuario;

          return (
            <div
              key={partida.id}
              className={`partida-card ${usuarioVenceu ? 'partida-card--vitoria' : 'partida-card--derrota'}`}
              onClick={() => { setSelectedPartida(partida); setBattleReportOpen(true); }}
            >
              <img src={partida.jogoImagem} alt={partida.jogoNome} className="partida-card-img" />
              <div className="partida-card-content">
                <div className="partida-card-header">
                  <h4>{partida.jogoNome}</h4>
                  {usuarioVenceu ? <Trophy size={20} className="partida-trophy" /> : <span className="partida-defeat">💀</span>}
                </div>
                <p className="partida-card-meta">
                  📅 {new Date(partida.data).toLocaleDateString('pt-BR')} • ⏱️ {partida.duracao}min
                </p>
                <p className="partida-card-jogadores">
                  👥 {partida.jogadores.map((j, i) => (
                    <span key={j.id} className={j.isUsuario ? 'partida-usuario' : ''}>
                      {j.nome} ({j.pontuacao}){i < partida.jogadores.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </p>
                {partida.local && <p className="partida-card-local">📍 {partida.local}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <RecordMatchModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSave={handleSavePartida}
        games={games}
      />

      <BattleReport
        partida={selectedPartida}
        isOpen={battleReportOpen}
        onClose={() => { setBattleReportOpen(false); setSelectedPartida(null); }}
        onDelete={handleDeletePartida}
        onRevanche={handleRevanche}
      />
    </div>
  );
};
