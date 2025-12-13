import React, { useMemo, useState } from "react";
import { Sparkles, Copy, Wand2, CheckCircle2, Dices } from "lucide-react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";
import { PLAYER_OPTIONS, TIME_OPTIONS, WEIGHT_OPTIONS } from "../../data/mockData";
import { useToast } from "../../context/ToastContext";
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
  const { showToast } = useToast();
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
  const [mesasHistorico, setMesasHistorico] = useState([]);

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

      // Save to history
      const mesaHistorica = {
        id: Date.now(),
        data: new Date(),
        criteria: { ...criteria },
        jogos: ranked.slice(0, 4).map(item => item.game.title)
      };
      setMesasHistorico(prev => [mesaHistorica, ...prev].slice(0, 5));

      setLoading(false);
    }, 700);
  };

  const sortearUm = () => {
    if (suggestions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const escolhido = suggestions[randomIndex];
    alert(`🎲 O jogo sorteado foi: ${escolhido.game.title}!\n\nBora jogar?`);
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
      showToast('Lista copiada! 📋', 'success');
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar para área de transferência:", error);
      showToast('Erro ao copiar lista', 'error');
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
                  data-rank={index + 1}
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
            <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
              <button
                className="btn btn-outline mesa-copy-btn"
                type="button"
                onClick={copyList}
                style={{flex: 1}}
              >
                <Copy size={16} />{" "}
                {copied ? "Lista copiada!" : "Copiar lista"}
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={sortearUm}
                style={{flex: 1}}
              >
                <Dices size={16} /> 🎲 SORTEAR UM
              </button>
            </div>
          )}
        </div>
      </div>

      {mesasHistorico.length > 0 && (
        <div className="mesa-historico-section">
          <h3 className="mesa-historico-title">MESAS ANTERIORES</h3>
          <div className="mesa-historico-list">
            {mesasHistorico.map((mesa) => (
              <Card key={mesa.id} className="mesa-historico-card" hover={false}>
                <div className="mesa-historico-header">
                  <strong>{new Date(mesa.data).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</strong>
                  <span className="mesa-historico-criteria">
                    {mesa.criteria.players} • {mesa.criteria.time} • {mesa.criteria.weight}
                  </span>
                </div>
                <div className="mesa-historico-jogos">
                  {mesa.jogos.slice(0, 3).map((jogo, i) => (
                    <span key={i} className="mesa-historico-jogo">{jogo}</span>
                  ))}
                  {mesa.jogos.length > 3 && (
                    <span className="mesa-historico-mais">+{mesa.jogos.length - 3}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
