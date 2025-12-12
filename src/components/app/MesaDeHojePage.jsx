import React, { useMemo, useState } from "react";
import { Sparkles, Copy, Wand2, CheckCircle2 } from "lucide-react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";
import { PLAYER_OPTIONS, TIME_OPTIONS, WEIGHT_OPTIONS } from "../../data/mockData";
import "./MesaDeHojePage.css";

const normalizeMinutes = (timeLabel) => {
  if (!timeLabel) return null;
  const match = timeLabel.match(/\d+/);
  return match ? Number(match[0]) : null;
};

const scoreGame = (game, criteria) => {
  const reasons = [];
  let score = 0;

  if (criteria.players && criteria.players !== "7+") {
    if (criteria.players === game.players) {
      score += 2;
      reasons.push(`${game.players} jogadores`);
    }
  } else if (criteria.players === "7+") {
    if (game.maxPlayers >= 7) {
      score += 2;
      reasons.push("comporta 7+ jogadores");
    }
  }

  if (criteria.time && criteria.time !== "Qualquer duração") {
    const desired = normalizeMinutes(criteria.time);
    const actual = normalizeMinutes(game.time);
    if (desired && actual) {
      const delta = Math.abs(desired - actual);
      if (delta <= 15) {
        score += 2;
        reasons.push(`~${game.time}`);
      } else if (delta <= 30) {
        score += 1;
        reasons.push(`tempo próximo (${game.time})`);
      }
    } else if (game.time?.includes(criteria.time.slice(0, 2))) {
      score += 1;
      reasons.push(game.time);
    }
  }

  if (criteria.weight && criteria.weight !== "Qualquer") {
    if (game.weight === criteria.weight) {
      score += 2;
      reasons.push(`peso ${game.weight.toLowerCase()}`);
    }
  }

  return { score, reasons };
};

export const MesaDeHojePage = ({ games }) => {
  const initialCriteria = useMemo(
    () => ({ players: "3-4", time: "60 min", weight: "Medio" }),
    []
  );

  const [criteria, setCriteria] = useState(initialCriteria);
  const [suggestions, setSuggestions] = useState(() => {
    const ranked = games
      .map((game) => {
        const { score, reasons } = scoreGame(game, initialCriteria);
        return { game, score, reasons };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
    return ranked.slice(0, 3);
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const suggestGames = () => {
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      const ranked = games
        .map((game) => {
          const { score, reasons } = scoreGame(game, criteria);
          return { game, score, reasons };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      setSuggestions(ranked.slice(0, 4));
      setLoading(false);
    }, 700);
  };

  const copyList = async () => {
    const header = "🎲 Mesa de Hoje — Ludoteca\n\n";
    const criteriaText = `Sugestões para ${criteria.players} jogadores, ${criteria.time.toLowerCase()}, peso ${criteria.weight.toLowerCase()}:\n`;
    const lines = suggestions
      .map((item) => `• ${item.game.title} (${item.game.time}, ${item.game.weight})`)
      .join("\n");
    const footer = `\n\nVeja minha coleção: ludoteca.app/gabriel`;
    const text = header + criteriaText + lines + footer;

    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar para área de transferência:", error);
      setCopied(false);
    }
  };

  const renderChipGroup = useMemo(
    () => (options, type) => (
      <div className="criteria-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`filter-chip ${criteria[type] === option ? "active" : ""}`}
            onClick={() => setCriteria((prev) => ({ ...prev, [type]: option }))}
          >
            {option}
          </button>
        ))}
      </div>
    ),
    [criteria]
  );

  return (
    <div className="mesa-page">
      <h2 className="mesa-title">Mesa de Hoje</h2>
      <p className="mesa-subtitle">
        Escolha os critérios e deixe a Ludoteca sugerir os jogos da sua coleção.
      </p>

      <div className="mesa-grid">
        <Card className="mesa-filters" hover={false}>
          <h3>Filtros</h3>

          <div className="criteria-block">
            <strong>Número de jogadores</strong>
            {renderChipGroup(PLAYER_OPTIONS, "players")}
          </div>

          <div className="criteria-block">
            <strong>Tempo disponível</strong>
            {renderChipGroup(TIME_OPTIONS, "time")}
          </div>

          <div className="criteria-block">
            <strong>Complexidade</strong>
            {renderChipGroup(WEIGHT_OPTIONS, "weight")}
          </div>

          <button
            className="btn btn-primary mesa-suggest-btn"
            type="button"
            onClick={suggestGames}
            disabled={loading}
          >
            {loading ? "Consultando os meeples..." : "Sugerir jogos"}
          </button>
        </Card>

        <div className="mesa-results">
          <div className="mesa-results-header">
            <div className="mesa-results-title">
              <Sparkles color="var(--cuphead-blue)" />
              <strong>Sugestões</strong>
            </div>
            {!!suggestions.length && (
              <Badge variant="default">{suggestions.length} jogos</Badge>
            )}
          </div>

          {suggestions.length === 0 ? (
            <Card className="mesa-empty" hover={false}>
              <h3>Nenhum jogo combina com esses critérios</h3>
              <p>Tente ajustar o número de jogadores ou o tempo disponível.</p>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => {
                  setCriteria(initialCriteria);
                  setSuggestions([]);
                }}
              >
                Limpar filtros
              </button>
            </Card>
          ) : (
            <div className="mesa-list">
              {suggestions.map((item, index) => (
                <Card
                  key={item.game.id}
                  className={`mesa-result-card ${
                    index === 0 ? "mesa-result-card--best" : ""
                  }`}
                >
                  {index === 0 && (
                    <Badge animated className="mesa-best-badge">
                      Melhor opção
                    </Badge>
                  )}
                  <div className="mesa-result-top">
                    <div>
                      <strong className="mesa-game-title">
                        {item.game.title}
                      </strong>
                      <p className="mesa-game-meta">
                        {item.game.players} jogadores — {item.game.time} —{" "}
                        {item.game.weight}
                      </p>
                    </div>
                    <Wand2 className="mesa-wand" aria-hidden="true" />
                  </div>
                  {item.reasons.length > 0 && (
                    <p className="mesa-match">
                      <CheckCircle2 size={16} />
                      Combina porque: {item.reasons.join(", ")}
                    </p>
                  )}
                  <div className="mesa-result-actions">
                    <button className="btn btn-outline" type="button">
                      Ver no catálogo
                    </button>
                    <button className="btn btn-primary" type="button">
                      Escolher esse!
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!!suggestions.length && (
            <button
              className="btn btn-outline mesa-copy-btn"
              type="button"
              onClick={copyList}
            >
              <Copy size={16} />{" "}
              {copied ? "Lista copiada!" : "Copiar lista para compartilhar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
