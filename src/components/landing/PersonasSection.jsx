import React from "react";
import { Card } from "../shared/Card";
import "./PersonasSection.css";

const colorFillMap = {
  yellow: "var(--cuphead-yellow)",
  red: "var(--cuphead-red)",
  cream: "var(--cuphead-cream)"
};

const MeepleIllustration = ({ color = "yellow", accessory, label }) => {
  const fill = colorFillMap[color] || colorFillMap.yellow;

  return (
    <div className="meeple-illustration" aria-hidden="true">
      <svg viewBox="0 0 120 150" className="meeple-svg" role="img" aria-label={label}>
        {accessory === "chef" && (
          <g className="meeple-accessory">
            <path
              d="M40 24c0-9 8-16 18-16 4 0 8 1 11 4 3-3 7-4 11-4 10 0 18 7 18 16 0 8-6 15-14 16H54c-8-1-14-8-14-16z"
              fill="var(--cuphead-white)"
              stroke="var(--cuphead-black)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <rect
              x="46"
              y="38"
              width="28"
              height="12"
              rx="6"
              fill="var(--cuphead-white)"
              stroke="var(--cuphead-black)"
              strokeWidth="6"
            />
          </g>
        )}

        {accessory === "crown" && (
          <g className="meeple-accessory">
            <path
              d="M36 32l10-16 14 16 12-16 12 16v16H36z"
              fill="var(--cuphead-yellow)"
              stroke="var(--cuphead-black)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <circle cx="46" cy="22" r="4" fill="var(--cuphead-red)" stroke="var(--cuphead-black)" strokeWidth="3" />
            <circle cx="60" cy="16" r="4" fill="var(--cuphead-blue)" stroke="var(--cuphead-black)" strokeWidth="3" />
            <circle cx="74" cy="22" r="4" fill="var(--cuphead-red)" stroke="var(--cuphead-black)" strokeWidth="3" />
          </g>
        )}

        {accessory === "question" && (
          <g className="meeple-question">
            <circle cx="92" cy="28" r="16" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="6" />
            <text x="92" y="34" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--cuphead-black)">?</text>
          </g>
        )}

        <path
          d="M60 8c-17 0-31 14-31 31 0 11 5 21 12 27l-9 48c-2 11 6 21 17 21h22c11 0 19-10 17-21l-9-48c7-6 12-16 12-27 0-17-14-31-31-31z"
          fill={fill}
          stroke="var(--cuphead-black)"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        <circle cx="48" cy="46" r="10" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="5" />
        <circle cx="72" cy="46" r="10" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="5" />
        <circle cx="48" cy="48" r="4" fill="var(--cuphead-black)" />
        <circle cx="72" cy="48" r="4" fill="var(--cuphead-black)" />
        <path d="M44 60c6 7 26 7 32 0" fill="none" stroke="var(--cuphead-black)" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const PersonasSection = ({ personas }) => {
  return (
    <section id="para-quem" className="personas-section">
      <div className="ludo-container">
        <span className="section-title">Para quem é</span>
        <h2 className="section-heading">Peças que representam cada jogador</h2>
        <div className="personas-grid">
          {personas.map((persona, index) => (
            <div key={persona.key || persona.title} className="persona-card-wrapper">
              <img
                src={`/assets/carta-personagem-${index + 1}.png`}
                alt={persona.title}
                className="persona-card-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

