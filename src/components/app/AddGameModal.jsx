import React, { useState } from "react";
import { WEIGHT_OPTIONS } from "../../data/mockData";
import "./AddGameModal.css";

export const AddGameModal = ({ onClose, onSave }) => {
  const initialState = {
    title: "",
    minPlayers: "",
    maxPlayers: "",
    time: "",
    weight: "Leve",
    vibe: "Party",
    video: "",
    notes: ""
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const requiredFields = ["title", "minPlayers", "maxPlayers", "time"];

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field]) nextErrors[field] = "Campo obrigatório";
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
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
      cover: "linear-gradient(135deg,#A5B4FC,#F5D0FE)",
      notes: form.notes,
      video: form.video
    };

    onSave(newGame);
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <form className="modal-card addgame-card" onSubmit={handleSubmit}>
        <h3 className="addgame-title">Adicionar jogo</h3>

        <label className="addgame-label">
          Nome do jogo
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <small>{errors.title}</small>}
        </label>

        <div className="addgame-grid">
          <label className="addgame-label">
            Min jogadores
            <input
              type="number"
              value={form.minPlayers}
              onChange={(e) => handleChange("minPlayers", e.target.value)}
              className={errors.minPlayers ? "error" : ""}
            />
            {errors.minPlayers && <small>{errors.minPlayers}</small>}
          </label>

          <label className="addgame-label">
            Max jogadores
            <input
              type="number"
              value={form.maxPlayers}
              onChange={(e) => handleChange("maxPlayers", e.target.value)}
              className={errors.maxPlayers ? "error" : ""}
            />
            {errors.maxPlayers && <small>{errors.maxPlayers}</small>}
          </label>

          <label className="addgame-label">
            Tempo médio
            <select
              value={form.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className={errors.time ? "error" : ""}
            >
              <option value="">Selecione</option>
              {["15 min", "30 min", "45 min", "60 min", "90+ min"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.time && <small>{errors.time}</small>}
          </label>
        </div>

        <div className="addgame-grid addgame-grid--two">
          <label className="addgame-label">
            Complexidade
            <select
              value={form.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            >
              {WEIGHT_OPTIONS.slice(0, 3).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>

          <label className="addgame-label">
            Vibe
            <select
              value={form.vibe}
              onChange={(e) => handleChange("vibe", e.target.value)}
            >
              {["Party", "Estrategia", "Familia", "Cooperativo", "Competitivo"].map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <label className="addgame-label">
          Link de vídeo (opcional)
          <input
            type="url"
            value={form.video}
            onChange={(e) => handleChange("video", e.target.value)}
            placeholder="https://"
          />
        </label>

        <label className="addgame-label">
          Notas pessoais (opcional)
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Salvar jogo
          </button>
        </div>
      </form>
    </div>
  );
};

