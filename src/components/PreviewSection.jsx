import React from "react";

const cardLayout = [
  { tilt: -4, lift: -12 },
  { tilt: 3, lift: 6 },
  { tilt: -2, lift: -4 },
  { tilt: 4, lift: 12 }
];

const PreviewSection = ({ games = [] }) => (
  <section id="demo" className="preview-wrapper">
    <div className="ludo-container">
      <div className="preview-box">
        <span className="section-title">Preview encantado</span>
        <h2 className="section-heading">Veja como sua Ludoteca vai ficar</h2>
        <div className="preview-stage">
          <div className="preview-mascot left">
            <div className="preview-face">
              <span />
              <span />
              <div className="preview-smile" />
            </div>
          </div>
          <div className="preview-mascot right">
            <div className="preview-face">
              <span />
              <span />
              <div className="preview-smile" />
            </div>
          </div>
          <div className="preview-token token-a" />
          <div className="preview-token token-b" />
          <span className="preview-shape shape-a" />
          <span className="preview-shape shape-b" />
          <span className="preview-shape shape-c" />
          <div className="preview-carousel">
            {games.map((game, index) => (
              <div
                key={game.id ?? game.title}
                className="preview-card"
                style={{
                  background: game.cover,
                  "--card-tilt": `${cardLayout[index]?.tilt ?? -2}deg`,
                  "--card-lift": `${cardLayout[index]?.lift ?? 0}px`
                }}
              >
                <h4>{game.title}</h4>
                <div className="preview-tags">
                  <span>{game.players} jogadores</span>
                  <span>{game.time}</span>
                  <span>{game.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PreviewSection;
