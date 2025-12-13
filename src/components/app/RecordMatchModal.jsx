import React, { useState } from 'react';
import { X, Plus, Trash2, Trophy } from 'lucide-react';
import './RecordMatchModal.css';

export const RecordMatchModal = ({ isOpen, onClose, onSave, games, preSelectedGame = null, preSelectedPlayers = [] }) => {
  const [formData, setFormData] = useState({
    jogoId: preSelectedGame?.id || '',
    data: new Date().toISOString().split('T')[0],
    local: '',
    duracao: '',
    jogadores: preSelectedPlayers.length > 0 ? preSelectedPlayers : [{ nome: 'Gabriel', pontuacao: '', isVencedor: false, isUsuario: true }],
    foto: null,
    notas: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const addJogador = () => {
    if (formData.jogadores.length >= 20) return;
    setFormData({
      ...formData,
      jogadores: [...formData.jogadores, { nome: '', pontuacao: '', isVencedor: false, isUsuario: false }],
    });
  };

  const removeJogador = (index) => {
    if (formData.jogadores.length <= 1) return;
    setFormData({
      ...formData,
      jogadores: formData.jogadores.filter((_, i) => i !== index),
    });
  };

  const updateJogador = (index, field, value) => {
    const newJogadores = [...formData.jogadores];
    if (field === 'isVencedor' && value) {
      newJogadores.forEach((j, i) => (j.isVencedor = i === index));
    } else {
      newJogadores[index][field] = value;
    }
    setFormData({ ...formData, jogadores: newJogadores });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jogoId) newErrors.jogoId = 'Selecione um jogo';
    if (!formData.data) newErrors.data = 'Selecione uma data';
    if (new Date(formData.data) > new Date()) newErrors.data = 'Data não pode ser futura';
    if (formData.jogadores.some((j) => !j.nome.trim())) newErrors.jogadores = 'Todos os jogadores precisam de nome';
    if (!formData.jogadores.some((j) => j.isVencedor)) newErrors.vencedor = 'Marque o vencedor';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const vencedor = formData.jogadores.find((j) => j.isVencedor);
    const partida = {
      id: Date.now().toString(),
      jogoId: parseInt(formData.jogoId),
      jogoNome: games.find((g) => g.id === parseInt(formData.jogoId))?.title || '',
      jogoImagem: games.find((g) => g.id === parseInt(formData.jogoId))?.cover || '',
      data: new Date(formData.data),
      local: formData.local || 'Não informado',
      duracao: parseInt(formData.duracao) || 0,
      jogadores: formData.jogadores.map((j, i) => ({ ...j, id: (i + 1).toString() })),
      vencedorId: formData.jogadores.findIndex((j) => j.isVencedor) + 1 + '',
      foto: formData.foto,
      notas: formData.notas,
      criadoEm: new Date(),
    };

    onSave(partida);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registrar Partida</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="record-match-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">
              Jogo *
              <select
                value={formData.jogoId}
                onChange={(e) => setFormData({ ...formData, jogoId: e.target.value })}
                className={errors.jogoId ? 'input-error' : ''}
              >
                <option value="">Selecione um jogo</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
              {errors.jogoId && <span className="error-text">{errors.jogoId}</span>}
            </label>

            <label className="form-label">
              Data *
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className={errors.data ? 'input-error' : ''}
              />
              {errors.data && <span className="error-text">{errors.data}</span>}
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Local
              <input
                type="text"
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                placeholder="Ex: Minha casa, Bar do Jogo..."
              />
            </label>

            <label className="form-label">
              Duração (min)
              <input
                type="number"
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                placeholder="Ex: 60"
                min="1"
              />
            </label>
          </div>

          <div className="jogadores-section">
            <div className="jogadores-header">
              <h3>Jogadores ({formData.jogadores.length}/20)</h3>
              <button type="button" className="btn btn-outline btn-sm" onClick={addJogador} disabled={formData.jogadores.length >= 20}>
                <Plus size={16} /> Adicionar
              </button>
            </div>
            {errors.jogadores && <span className="error-text">{errors.jogadores}</span>}
            {errors.vencedor && <span className="error-text">{errors.vencedor}</span>}

            <div className="jogadores-list">
              {formData.jogadores.map((jogador, index) => (
                <div key={index} className="jogador-item">
                  <input
                    type="text"
                    value={jogador.nome}
                    onChange={(e) => updateJogador(index, 'nome', e.target.value)}
                    placeholder="Nome do jogador"
                    disabled={jogador.isUsuario}
                    className="jogador-nome"
                  />
                  <input
                    type="text"
                    value={jogador.pontuacao}
                    onChange={(e) => updateJogador(index, 'pontuacao', e.target.value)}
                    placeholder="Pontos"
                    className="jogador-pontuacao"
                  />
                  <label className="jogador-vencedor">
                    <input
                      type="radio"
                      name="vencedor"
                      checked={jogador.isVencedor}
                      onChange={() => updateJogador(index, 'isVencedor', true)}
                    />
                    <Trophy size={18} className={jogador.isVencedor ? 'trophy-active' : ''} />
                  </label>
                  {!jogador.isUsuario && formData.jogadores.length > 1 && (
                    <button type="button" className="jogador-remove" onClick={() => removeJogador(index)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <label className="form-label">
            Notas
            <textarea
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              placeholder="Como foi a partida? Momentos marcantes..."
              rows="3"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar Partida
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
