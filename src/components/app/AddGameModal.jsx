import React, { useMemo, useState } from "react";
import { Search, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SAMPLE_GAMES, WEIGHT_OPTIONS } from "../../data/mockData";
import { Toast } from "../shared/Toast";
import "./AddGameModal.css";

const steps = ["buscar", "personalizar", "confirmar"];

export const AddGameModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(steps[0]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    title: "",
    minPlayers: "",
    maxPlayers: "",
    time: "",
    weight: "Leve",
    vibe: "Party",
    video: "",
    notes: ""
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SAMPLE_GAMES.filter((g) => g.title.toLowerCase().includes(q)).slice(
      0,
      5
    );
  }, [query]);

  const goNext = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const goBack = () => {
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const chooseResult = (game) => {
    setSelected(game);
    setForm((prev) => ({
      ...prev,
      title: game.title,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      time: game.time,
      weight: game.weight,
      vibe: game.vibe,
      video: game.video || "",
      notes: game.notes || ""
    }));
    setStep("personalizar");
  };

  const handleSubmit = () => {
    if (!form.title || !form.minPlayers || !form.maxPlayers || !form.time) {
      setToast({ variant: "error", message: "Preencha os campos obrigatórios" });
      return;
    }
    const newGame = {
      id: Date.now(),
      title: form.title,
      players: `${form.minPlayers}-${form.maxPlayers}`,
      minPlayers: Number(form.minPlayers),
      maxPlayers: Number(form.maxPlayers),
      time: form.time,
      weight: form.weight,
      vibe: form.vibe,
      type: form.vibe,
      cover: selected?.cover || "linear-gradient(135deg,#A5B4FC,#F5D0FE)",
      notes: form.notes,
      video: form.video
    };
    onSave(newGame);
    setToast({ variant: "success", message: `${newGame.title} adicionado!` });
    window.setTimeout(onClose, 700);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card addgame-card" onClick={(e) => e.stopPropagation()}>
        <div className="addgame-header">
          <h3 className="addgame-title">Adicionar jogo</h3>
          <div className="addgame-steps" aria-label="Passos">
            {steps.map((s, i) => (
              <div key={s} className={`step-dot ${step === s ? "active" : ""}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {step === "buscar" && (
          <div className="addgame-step">
            <label className="addgame-label">
              Buscar jogo
              <div className="addgame-search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Digite o nome do jogo..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </label>

            {results.length > 0 ? (
              <div className="addgame-results">
                {results.map((game) => (
                  <button
                    key={game.id}
                    type="button"
                    className="addgame-result"
                    onClick={() => chooseResult(game)}
                  >
                    <div
                      className="addgame-result-cover"
                      style={{ background: game.cover }}
                      aria-hidden="true"
                    />
                    <div className="addgame-result-info">
                      <strong>{game.title}</strong>
                      <small>
                        {game.players} jogadores • {game.time}
                      </small>
                    </div>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            ) : (
              query && (
                <p className="muted">
                  Nenhum resultado. Você pode adicionar manualmente no próximo
                  passo.
                </p>
              )
            )}

            <div className="addgame-actions">
              <button className="btn btn-outline" type="button" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (!form.title) setForm((p) => ({ ...p, title: query }));
                  setStep("personalizar");
                }}
              >
                Adicionar manualmente <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === "personalizar" && (
          <div className="addgame-step">
            <label className="addgame-label">
              Nome do jogo *
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              />
            </label>

            <div className="addgame-grid">
              <label className="addgame-label">
                Mín jogadores *
                <input
                  type="number"
                  value={form.minPlayers}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, minPlayers: e.target.value }))
                  }
                />
              </label>
              <label className="addgame-label">
                Máx jogadores *
                <input
                  type="number"
                  value={form.maxPlayers}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, maxPlayers: e.target.value }))
                  }
                />
              </label>
              <label className="addgame-label">
                Tempo médio *
                <select
                  value={form.time}
                  onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                >
                  <option value="">Selecione</option>
                  {["15 min", "30 min", "45 min", "60 min", "90+ min"].map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <div className="addgame-grid addgame-grid--two">
              <label className="addgame-label">
                Complexidade
                <select
                  value={form.weight}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, weight: e.target.value }))
                  }
                >
                  {WEIGHT_OPTIONS.slice(0, 3).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
              <label className="addgame-label">
                Categoria/Vibe
                <select
                  value={form.vibe}
                  onChange={(e) => setForm((p) => ({ ...p, vibe: e.target.value }))}
                >
                  {[
                    "Party",
                    "Estrategia",
                    "Familia",
                    "Cooperativo",
                    "Competitivo"
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="addgame-label">
              Link de vídeo (opcional)
              <input
                type="url"
                value={form.video}
                onChange={(e) => setForm((p) => ({ ...p, video: e.target.value }))}
                placeholder="https://"
              />
            </label>

            <label className="addgame-label">
              Notas pessoais (opcional)
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              />
            </label>

            <div className="addgame-actions">
              <button className="btn btn-outline" type="button" onClick={goBack}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <button className="btn btn-primary" type="button" onClick={goNext}>
                Revisar <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === "confirmar" && (
          <div className="addgame-step">
            <div className="confirm-card">
              <div
                className="confirm-cover"
                style={{ background: selected?.cover || form.cover }}
              />
              <h4>{form.title}</h4>
              <p className="muted">
                {form.minPlayers}-{form.maxPlayers} jogadores • {form.time} •{" "}
                {form.weight}
              </p>
              <p className="muted">{form.vibe}</p>
            </div>

            <div className="addgame-actions">
              <button className="btn btn-outline" type="button" onClick={goBack}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                <CheckCircle2 size={16} /> Adicionar à coleção
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

