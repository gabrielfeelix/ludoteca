import React from "react";
import "./HowItWorks.css";

const IllustrationShelf = () => (
  <svg viewBox="0 0 200 160" className="howitworks-illustration" aria-hidden="true">
    <rect x="18" y="34" width="164" height="90" rx="16" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="6" />
    <line x1="18" y1="78" x2="182" y2="78" stroke="var(--cuphead-black)" strokeWidth="6" />

    <rect x="34" y="46" width="38" height="54" rx="8" fill="var(--cuphead-yellow)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <rect x="80" y="46" width="38" height="54" rx="8" fill="var(--cuphead-red)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <rect x="126" y="46" width="38" height="54" rx="8" fill="var(--cuphead-blue)" stroke="var(--cuphead-black)" strokeWidth="5" />

    <rect x="76" y="8" width="48" height="24" rx="6" fill="var(--cuphead-cream)" stroke="var(--cuphead-black)" strokeWidth="6" />
    <path d="M100 32v12" stroke="var(--cuphead-black)" strokeWidth="6" strokeLinecap="round" />
    <path d="M92 40l8 8 8-8" fill="none" stroke="var(--cuphead-black)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IllustrationShare = () => (
  <svg viewBox="0 0 200 160" className="howitworks-illustration" aria-hidden="true">
    <rect x="54" y="8" width="92" height="144" rx="18" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="6" />
    <rect x="66" y="28" width="68" height="82" rx="12" fill="var(--cuphead-cream)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <circle cx="82" cy="70" r="12" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <circle cx="118" cy="70" r="12" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <line x1="94" y1="70" x2="106" y2="70" stroke="var(--cuphead-black)" strokeWidth="5" strokeLinecap="round" />

    <circle cx="132" cy="118" r="18" fill="var(--cuphead-green)" stroke="var(--cuphead-black)" strokeWidth="6" />
    <path d="M124 118h16" stroke="var(--cuphead-white)" strokeWidth="4" strokeLinecap="round" />
    <path d="M124 112h16" stroke="var(--cuphead-white)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IllustrationWand = () => (
  <svg viewBox="0 0 200 160" className="howitworks-illustration" aria-hidden="true">
    <rect x="18" y="18" width="70" height="22" rx="11" fill="var(--cuphead-yellow)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <rect x="18" y="50" width="90" height="22" rx="11" fill="var(--cuphead-white)" stroke="var(--cuphead-black)" strokeWidth="5" />
    <rect x="18" y="82" width="60" height="22" rx="11" fill="var(--cuphead-cream)" stroke="var(--cuphead-black)" strokeWidth="5" />

    <path d="M132 118l36-36" stroke="var(--cuphead-black)" strokeWidth="8" strokeLinecap="round" />
    <circle cx="168" cy="82" r="10" fill="var(--cuphead-yellow)" stroke="var(--cuphead-black)" strokeWidth="6" />
    <polygon points="150,52 156,64 170,66 160,76 162,90 150,82 138,90 140,76 130,66 144,64"
      fill="var(--cuphead-red)" stroke="var(--cuphead-black)" strokeWidth="5" strokeLinejoin="round" />
  </svg>
);

const illustrations = [IllustrationShelf, IllustrationShare, IllustrationWand];

export const HowItWorks = ({ items }) => {
  return (
    <section id="como-funciona" className="howitworks-section">
      <div className="ludo-container">
        <span className="section-title">Manual ilustrado</span>
        <h2 className="section-heading">Como funciona</h2>
        <div className="howitworks-grid">
          {items.map((item, index) => {
            const Illustration = illustrations[index] || IllustrationShelf;
            return (
              <div key={item.title} className="howitworks-card">
                <div className="howitworks-step">Passo {index + 1}</div>
                <Illustration />
                <h3 className="howitworks-title">{item.title}</h3>
                <p className="howitworks-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

