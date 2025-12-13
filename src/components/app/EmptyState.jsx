import React from 'react';
import { PackageOpen, SearchX } from 'lucide-react';
import './EmptyState.css';

export const EmptyState = ({ type, onAction }) => {
  if (type === 'empty-collection') {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <PackageOpen size={80} strokeWidth={2} />
        </div>
        <h3 className="empty-state-title">Sua coleção está vazia</h3>
        <p className="empty-state-description">
          Adicione seu primeiro jogo e comece a organizar sua ludoteca!
        </p>
        <button
          className="btn btn-primary empty-state-btn"
          onClick={onAction}
          type="button"
        >
          + ADICIONAR PRIMEIRO JOGO
        </button>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <SearchX size={80} strokeWidth={2} />
        </div>
        <h3 className="empty-state-title">Nenhum jogo encontrado</h3>
        <p className="empty-state-description">
          Tente mudar os filtros ou buscar por outro nome.
        </p>
        <button
          className="btn btn-outline empty-state-btn"
          onClick={onAction}
          type="button"
        >
          LIMPAR FILTROS
        </button>
      </div>
    );
  }

  return null;
};
