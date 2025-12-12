import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SAMPLE_GAMES } from "../../data/mockData";
import { Card } from "../shared/Card";
import "./PublicCollectionPage.css";

const PublicGameModal = ({ game, onClose }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card public-modal">
        <button className="btn btn-ghost public-close" type="button" onClick={onClose}>
          Fechar
        </button>
        <div className="public-cover" style={{ background: game.cover }} />
        <h2>{game.title}</h2>
        <p className="muted">
          {game.players} jogadores • {game.time} • {game.weight}
        </p>
        {game.video && (
          <a href={game.video} target="_blank" rel="noreferrer" className="btn btn-outline">
            Ver vídeo de regras
          </a>
        )}
        <p className="muted" style={{ marginTop: 10 }}>
          {game.notes}
        </p>
        <div className="public-cta">
          <Link to="/cadastro" className="btn btn-primary">
            Gostou? Crie sua Ludoteca!
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PublicCollectionPage = () => {
  const { slug } = useParams();
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  const games = SAMPLE_GAMES;

  const filtered = useMemo(() => {
    if (!query) return games;
    const q = query.trim().toLowerCase();
    return games.filter((g) => g.title.toLowerCase().includes(q));
  }, [games, query]);

  return (
    <div className="public-page">
      <header className="public-header">
        <Link to="/landingpage" className="public-logo">
          <img src="/assets/logo.svg" alt="Ludoteca" width={36} height={36} />
          <span>Ludoteca</span>
        </Link>
        <Link to="/cadastro" className="btn btn-primary public-header-cta">
          Criar minha Ludoteca
        </Link>
      </header>

      <div className="ludo-container public-hero">
        <div className="public-avatar">GS</div>
        <div>
          <h1>Coleção de {slug || "Gabriel"}</h1>
          <p className="muted">
            {games.length} jogos • Maringá, PR
          </p>
        </div>
      </div>

      <div className="ludo-container public-toolbar">
        <input
          type="text"
          placeholder="Buscar jogo na coleção..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="ludo-container games-grid">
        {filtered.map((game) => (
          <Card key={game.id} className="public-game-card" onClick={() => setSelectedGame(game)}>
            <div className="public-game-cover" style={{ background: game.cover }} />
            <strong>{game.title}</strong>
            <p className="muted">
              {game.players} • {game.time} • {game.weight}
            </p>
          </Card>
        ))}
      </div>

      <footer className="public-footer">
        <div className="ludo-container">
          <small>
            Esta é a coleção de {slug || "Gabriel"}. Crie a sua em ludoteca.app
          </small>
        </div>
      </footer>

      {selectedGame && (
        <PublicGameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

