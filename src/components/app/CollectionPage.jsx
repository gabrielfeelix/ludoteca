import React, { useMemo, useState } from "react";
import { Plus, Star, Search, X } from "lucide-react";
import { QUICK_FILTERS } from "../../data/mockData";
import { useMediaQuery } from "../shared/useMediaQuery";
import { GameCard } from "./GameCard";
import { GameDetailDrawer } from "./GameDetailDrawer";
import { AddGameModal } from "./AddGameModal";
import { Card } from "../shared/Card";
import "./CollectionPage.css";

const FilterChip = ({ label, count, active, onClick }) => (
  <button
    type="button"
    className={`filter-chip ${active ? "active" : ""}`}
    onClick={onClick}
  >
    {label}
    {typeof count === "number" && (
      <span className="filter-count">({count})</span>
    )}
  </button>
);

export const CollectionPage = ({ games, onAddGame }) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [favoriteIds, setFavoriteIds] = useState(new Set([1]));
  const [selectedGame, setSelectedGame] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("recentes");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const filterCounts = useMemo(() => {
    const counts = {};
    QUICK_FILTERS.forEach((filter) => (counts[filter] = 0));
    games.forEach((game) => {
      counts["Todos"] += 1;
      if (favoriteIds.has(game.id)) counts["Favoritos"] += 1;
      if (game.vibe && counts[game.vibe] !== undefined) counts[game.vibe] += 1;
      if (game.minPlayers <= 2 && game.maxPlayers >= 2) counts["2 jogadores"] += 1;
      if (game.time?.includes("30") || game.time?.includes("15")) counts["Jogos rapidos"] += 1;
      if (game.weight === "Pesado") counts["Pesados"] += 1;
      if (game.vibe === "Cooperativo") counts["Cooperativos"] += 1;
      if (game.vibe === "Familia") counts["Familia"] += 1;
    });
    return counts;
  }, [games, favoriteIds]);

  const filteredGames = useMemo(() => {
    const base = games.filter((game) => {
      const matchesQuery =
        !query ||
        game.title.toLowerCase().includes(query.trim().toLowerCase());

      if (!matchesQuery) return false;
      if (activeFilter === "Todos") return true;
      if (activeFilter === "Favoritos") return favoriteIds.has(game.id);
      if (activeFilter === "Party") return game.vibe === "Party";
      if (activeFilter === "Estrategia") return game.vibe === "Estrategia";
      if (activeFilter === "2 jogadores")
        return game.minPlayers <= 2 && game.maxPlayers >= 2;
      if (activeFilter === "Jogos rapidos")
        return game.time?.includes("30") || game.time?.includes("15");
      if (activeFilter === "Pesados") return game.weight === "Pesado";
      if (activeFilter === "Cooperativos") return game.vibe === "Cooperativo";
      if (activeFilter === "Familia") return game.vibe === "Familia";
      return true;
    });

    const sorted = [...base];
    if (sortBy === "nome") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "tempo") sorted.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
    if (sortBy === "jogadores") sorted.sort((a, b) => a.minPlayers - b.minPlayers);
    if (sortBy === "recentes") sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }, [games, activeFilter, favoriteIds, query, sortBy]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFavoritesFilter = () => {
    setActiveFilter((prev) => (prev === "Favoritos" ? "Todos" : "Favoritos"));
  };

  return (
    <div className="collection-page">
      <div className="collection-header">
        <div>
          <p className="collection-greeting">Olá, Gabriel!</p>
          <h2 className="collection-subtitle">
            Sua coleção está pronta para a próxima jogatina.
          </h2>
        </div>

        {!isMobile && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus size={18} /> Adicionar jogo
          </button>
        )}
      </div>

      <div className="collection-toolbar">
        <div className="search-row collection-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar jogo na sua coleção..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="icon-btn clear-search"
              aria-label="Limpar busca"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {!isMobile && (
          <button
            className={`btn btn-outline ${activeFilter === "Favoritos" ? "active" : ""}`}
            type="button"
            onClick={toggleFavoritesFilter}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Star size={16} /> Favoritos
          </button>
        )}

        <select
          className="collection-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Ordenar por"
        >
          <option value="recentes">Ordenar por: Recém adicionados</option>
          <option value="nome">Ordenar por: Nome</option>
          <option value="tempo">Ordenar por: Tempo</option>
          <option value="jogadores">Ordenar por: Jogadores</option>
          <option value="mais-jogados">Ordenar por: Mais jogados</option>
        </select>
      </div>

      <div className="filter-row">
        {QUICK_FILTERS.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            count={filterCounts[filter]}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <Card className="collection-empty" hover={false}>
          <h3>Sua estante está esperando o primeiro jogo!</h3>
          <p>Adicione seus jogos e transforme sua coleção em algo mágico.</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setAddModalOpen(true)}
          >
            Adicionar primeiro jogo
          </button>
        </Card>
      ) : (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favoriteIds.has(game.id)}
              onToggleFavorite={toggleFavorite}
              onOpen={setSelectedGame}
              onQuickAction={(action) => {
                if (action === "detalhes") setSelectedGame(game);
              }}
            />
          ))}
        </div>
      )}

      {selectedGame && (
        <GameDetailDrawer
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          isMobile={isMobile}
        />
      )}
      {addModalOpen && (
        <AddGameModal
          onClose={() => setAddModalOpen(false)}
          onSave={onAddGame}
        />
      )}

      {isMobile && (
        <button
          className="fab-add"
          type="button"
          aria-label="Adicionar jogo"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};

