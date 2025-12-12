import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { Sparkles, User, Library, NotebookPen } from "lucide-react";
import { UserProvider } from "./context/UserContext";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { FAQSection } from "./components/landing/FAQSection";
import { Benefits } from "./components/landing/Benefits";
import { PersonasSection } from "./components/landing/PersonasSection";
import { TestimonialsSection } from "./components/landing/TestimonialsSection";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Footer } from "./components/landing/Footer";
import { CollectionPage } from "./components/app/CollectionPage";
import { MesaDeHojePage } from "./components/app/MesaDeHojePage";
import { ProfilePage } from "./components/app/ProfilePage";
import { AuthPage } from "./components/app/AuthPage";
import { OnboardingPage } from "./components/app/OnboardingPage";
import { PartidasPage } from "./components/app/PartidasPage";
import { HelpPage } from "./components/app/HelpPage";
import { PublicCollectionPage } from "./components/app/PublicCollectionPage";
import { NotFoundPage } from "./components/app/NotFoundPage";
import { SettingsPage } from "./components/app/SettingsPage";
import { AppHeader } from "./components/app/AppHeader";
import { BottomNav } from "./components/app/BottomNav";
import { SAMPLE_GAMES, HOW_IT_WORKS, BENEFIT_CARDS, PERSONAS, TESTIMONIALS, FAQ_ITEMS, APP_TABS as APP_TABS_DATA } from "./data/mockData";

// Mapeando ícones para os dados importados
const APP_TABS = APP_TABS_DATA.map(tab => ({
  ...tab,
  icon: tab.icon === "Library" ? Library : tab.icon === "Sparkles" ? Sparkles : tab.icon === "NotebookPen" ? NotebookPen : User
}));
const NAV_TABS = APP_TABS.filter(tab => tab.key !== "perfil");

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap');
:root {
  --bg:#F7F9FC;
  --primary:#59A5FF;
  --navy:#0F172A;
  --text:#1F2A44;
  --muted:#5F6B81;
  --card:#FFFFFF;
  --radius:28px;
  --shadow:0 18px 40px rgba(15,23,42,0.08);
  --cuphead-yellow:#F4B41A;
  --cuphead-red:#E63946;
  --cuphead-black:#1D1D1B;
  --cuphead-cream:#FFF8E7;
  --cuphead-blue:#1E3A5F;
  --cuphead-orange:#FF9500;
  --cuphead-pink:#E91E63;
  --cuphead-green:#4CAF50;
  --cuphead-white:#FFFFFF;
  --font-display:'Baloo 2',cursive;
  --font-body:'Inter',sans-serif;
}
* { box-sizing:border-box; }
body {
  margin:0;
  font-family:'Inter', sans-serif;
  background:var(--cuphead-cream);
  color:var(--text);
  line-height:1.5;
}
a { color:inherit; text-decoration:none; }
img { max-width:100%; }
.ludo-shell { min-height:100vh; background:var(--cuphead-cream); }
section { padding:72px 0; }
.ludo-container { width:min(1180px,92vw); margin:0 auto; padding:0 16px; }
button { font-family:'Inter', sans-serif; }
.btn {
  border:4px solid var(--cuphead-black);
  border-radius:999px;
  padding:11px 24px;
  font-weight:700;
  font-family:var(--font-display);
  text-transform:uppercase;
  letter-spacing:1px;
  cursor:pointer;
  transition:all .2s ease;
  box-shadow:4px 4px 0px var(--cuphead-black);
  font-size:0.9rem;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
}
.btn:disabled {
  opacity:0.6;
  cursor:not-allowed;
}
.btn-primary {
  background:var(--cuphead-yellow);
  color:var(--cuphead-black);
}
.btn-primary:hover:not(:disabled) {
  background:#FFB800;
  transform:translateY(-2px);
  box-shadow:6px 6px 0px var(--cuphead-black);
}
.btn-outline {
  background:transparent;
  border:3px solid var(--cuphead-black);
  color:var(--cuphead-black);
  box-shadow:3px 3px 0px var(--cuphead-black);
}
.btn-outline:hover:not(:disabled) {
  background:rgba(15,23,42,0.04);
  transform:translateY(-2px);
}
.btn-ghost { background:transparent; color:var(--cuphead-black); border:none; box-shadow:none; padding:8px 12px; }
.btn-ghost:hover { background:rgba(15,23,42,0.08); }
.landing-header {
  position:fixed;
  top:20px;
  left:50%;
  transform:translateX(-50%);
  width:84%;
  z-index:50;
  background:rgba(255,255,255,0.95);
  backdrop-filter:blur(20px);
  border-radius:32px;
  padding:14px 28px;
  box-shadow:8px 8px 0px var(--cuphead-black);
  border:4px solid var(--cuphead-black);
}
.landing-header .inner {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  width:100%;
}
.landing-nav { display:flex; gap:28px; font-weight:600; color:var(--muted); flex:1; justify-content:center; }
.landing-nav a:hover { color:var(--navy); }
.landing-actions {
  display:flex;
  align-items:center;
  gap:12px;
}
.hero-grid { display:none; }
.hero {
  width:100%;
  min-height:90vh;
  background-image:url("/assets/img-ludoteca-retro-lg.png");
  background-size:cover;
  background-position:center right;
  background-repeat:no-repeat;
  display:flex;
  align-items:flex-start;
  position:relative;
}
.hero-text {
  max-width:480px;
  margin-left:5%;
  margin-top:10vh;
  padding:40px 0;
}
.hero-tag {
  text-transform:uppercase;
  letter-spacing:0.25em;
  font-size:0.8rem;
  color:var(--muted);
}
.hero-text h1 {
  font-family:var(--font-display);
  font-weight:700;
  font-size:clamp(2.8rem,5vw,4.2rem);
  line-height:1.1;
  color:var(--cuphead-black);
  margin:12px 0 16px;
  text-transform:uppercase;
  text-shadow:
    4px 4px 0px var(--cuphead-yellow),
    6px 6px 0px var(--cuphead-black);
  letter-spacing:2px;
}
.hero-text p {
  color:#475569;
  font-size:1.05rem;
  line-height:1.45;
  max-width:440px;
}
.hero-actions {
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:24px;
}
.btn-primary {
  background:linear-gradient(135deg,#22D3EE,#0EA5E9);
  color:#fff;
  padding:14px 26px;
  border-radius:12px;
  font-weight:600;
  box-shadow:none;
}
.btn-secondary {
  background:#fff;
  color:#0F172A;
  padding:14px 26px;
  border-radius:12px;
  border:1px solid #CBD5E1;
}
.hero-actions .btn { min-width:180px; border-radius:12px; }
@media (max-width:1024px) {
  .preview-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .preview-board,
  .preview-copy {
    width: 100%;
  }
  .cards-grid,
  .persona-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .games-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width:768px) {
  .landing-header {
    width:94%;
    padding:10px 16px;
    border-radius:22px;
  }
  .landing-nav { display:none; }
  .landing-header .inner {
    justify-content:space-between;
  }
  .landing-actions {
    margin-left:auto;
    gap:10px;
  }
  .landing-actions .btn-primary {
    display:none;
  }
  .hero {
    background-image:url("/assets/img-ludoteca-retro-sm.png");
    background-position:center 80%;
    padding:0 18px;
  }
  .hero-text {
    margin-left:0;
    margin-top:12vh;
    padding:32px 18px;
    text-align:left;
  }
  .hero-text p { margin:0; }
  .hero-actions { justify-content:flex-start; }
  .hero-actions .btn { flex:1 1 auto; }

  .preview-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .preview-board {
    margin-top: 8px;
  }

  .preview-meep {
    left: 50%;
    transform: translate(-50%, 0);
  }

  .preview-card-1 { left: 8%; }
  .preview-card-2 { right: 6%; }
  .preview-card-3 { right: 14%; }

  .preview-mini-list {
    font-size: 0.78rem;
  }

  .preview-card-collection {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}
.preview-enchanted {
  padding: 80px 0 96px;
}

.preview-layout {
  display: grid;
  grid-template-columns: minmax(260px, 420px) minmax(320px, 1fr);
  gap: 40px;
  align-items: center;
}

.preview-copy .section-heading {
  margin-bottom: 10px;
}

.preview-sub {
  color: var(--muted);
  font-size: 1.02rem;
  max-width: 420px;
  margin: 8px 0 20px;
}

.preview-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.preview-chips span {
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.preview-note {
  font-size: 0.9rem;
  color: #64748B;
  max-width: 380px;
}

.preview-board {
  position: relative;
  border-radius: 40px;
  padding: 26px 26px 30px;
  background: radial-gradient(circle at top left, #FFE4F0 0, #FFE9C8 26%, #CDEBFF 60%, #F3F0FF 100%);
  box-shadow: 10px 10px 0px var(--cuphead-black);
  overflow: hidden;
  min-height: 260px;
  border: 6px solid var(--cuphead-black);
}

.preview-glow {
  position: absolute;
  inset: 18% 10% auto 10%;
  height: 130px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 70%);
  opacity: 0.9;
  pointer-events: none;
}

.preview-track {
  position: absolute;
  inset: auto 8% 30px 8%;
  height: 72px;
  border-radius: 999px;
  background: linear-gradient(90deg, #F97373, #FBBF24, #34D399, #60A5FA, #A855F7);
  filter: saturate(1.1);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.25);
}

.preview-meep {
  position: absolute;
  bottom: 52px;
  left: 18%;
  width: 90px;
  height: 90px;
  border-radius: 40% 40% 30% 30%;
  background: linear-gradient(145deg, #F97373, #FB7185);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 32px rgba(248, 113, 113, 0.55);
  transform: translateY(0);
  animation: meep-bob 3.4s ease-in-out infinite;
}

.preview-face {
  position: relative;
  width: 50px;
  height: 32px;
}

.preview-face .eye {
  position: absolute;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #0F172A;
}

.preview-face .eye:first-child {
  left: 8px;
}

.preview-face .eye:last-child {
  right: 8px;
}

.preview-face .smile {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 22px;
  height: 10px;
  border-radius: 0 0 14px 14px;
  border-bottom: 3px solid #0F172A;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  transform: translateX(-50%);
}

.preview-floating {
  position: absolute;
  padding: 10px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 6px 6px 0px var(--cuphead-black);
  border: 4px solid var(--cuphead-black);
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-floating strong {
  font-size: 0.9rem;
  color: #0F172A;
}

.preview-floating span {
  color: #64748B;
}

.preview-cards-title {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cuphead-black);
  text-align: center;
  max-width: 300px;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.preview-floating img {
  display: block;
  border: 4px solid var(--cuphead-black);
  border-radius: inherit;
  box-shadow: 6px 6px 0px var(--cuphead-black);
}

.preview-card-1 { top: 180px; left: 14%; transform: rotate(-8deg); }
.preview-card-2 { top: 200px; right: 8%; transform: rotate(6deg); }
.preview-card-3 { bottom: 24%; right: 18%; transform: rotate(-4deg); }

.preview-mini-list {
  position: absolute;
  left: 14%;
  right: 14%;
  bottom: 26px;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(10px);
  border-radius: 26px;
  padding: 12px 16px 10px;
  display: grid;
  gap: 6px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.55);
}

.preview-mini-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 4px;
}

.preview-mini-pill {
  align-self: flex-start;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(248, 250, 252, 0.16);
  color: #E5E7EB;
}

.preview-mini-label {
  font-size: 0.78rem;
  color: #9CA3AF;
}

.preview-mini-item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 0;
  align-items: center;
  font-size: 0.8rem;
}

.preview-mini-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #FBBF24;
}

.preview-mini-title {
  color: #F9FAFB;
  font-weight: 600;
}

.preview-mini-meta {
  grid-column: 2 / 3;
  color: #D1D5DB;
  font-size: 0.75rem;
}

.preview-card-collection {
  position: absolute;
  top: 12%;
  left: 8%;
  right: 8%;
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  gap: 10px;
  z-index: 1;
}

.preview-game-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  overflow: hidden;
  border: 5px solid var(--cuphead-black);
  box-shadow: 6px 6px 0px var(--cuphead-black);
  display: flex;
  flex-direction: column;
}

.preview-game-cover {
  height: 70px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
}

.preview-game-body {
  padding: 10px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preview-game-title-row strong {
  display: inline-block;
  font-size: 0.95rem;
  color: #0F172A;
}

.preview-game-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preview-game-chip {
  font-size: 0.7rem;
  color: #475569;
  background: #F1F5F9;
  padding: 4px 8px;
  border-radius: 999px;
}

@keyframes meep-bob {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
.section-title {
  text-transform:uppercase;
  letter-spacing:0.3em;
  font-weight:600;
  font-size:0.8rem;
  color:var(--muted);
}
.section-heading {
  font-family:'Plus Jakarta Sans', sans-serif;
  font-size:2.4rem;
  color:var(--navy);
  margin:10px 0 12px;
}
.cards-grid, .persona-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:22px;
}
.ludo-card {
  background:var(--card);
  border-radius:var(--radius);
  padding:28px;
  border:1px solid rgba(15,23,42,0.05);
  box-shadow:var(--shadow);
  transition:transform .22s ease, box-shadow .22s ease;
}
.ludo-card:hover { transform:translateY(-4px); box-shadow:0 20px 46px rgba(15,23,42,0.12); }
.landing-dark .btn-primary {
  transition:transform .2s ease;
}
.landing-dark .btn-primary:hover {
  animation:bounce .4s ease;
}
@keyframes bounce {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-4px); }
}
.cta-block {
  background:linear-gradient(135deg,#0F172A,#1E2C4D);
  color:#fff;
  border-radius:40px;
  padding:56px;
  text-align:center;
}
.landing-dark {
  background:#0F172A;
  color:#fff;
  border-radius:48px;
  padding:64px;
  position:relative;
  overflow:hidden;
}
.landing-cta-section {
  padding: 100px 0 120px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
}
.landing-cta-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(244, 180, 26, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}
.landing-cta-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}
.landing-cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}
.landing-cta-title {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;
}
.landing-cta-description {
  font-size: 1.15rem;
  color: rgba(226,232,240,0.95);
  margin: 0 0 40px;
  line-height: 1.7;
  font-weight: 500;
}
.landing-cta-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.landing-cta-actions .btn-primary {
  background: var(--cuphead-yellow) !important;
  color: var(--cuphead-black) !important;
  border: 4px solid var(--cuphead-black) !important;
  box-shadow: 8px 8px 0px var(--cuphead-black) !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 16px 32px !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.landing-cta-actions .btn-primary:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 12px 12px 0px var(--cuphead-black) !important;
}
.landing-cta-outline {
  color: #ffffff !important;
  border: 4px solid var(--cuphead-yellow) !important;
  border-radius: 999px !important;
  box-shadow: 6px 6px 0px rgba(244, 180, 26, 0.4) !important;
  background: rgba(244, 180, 26, 0.1) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  padding: 14px 28px !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.landing-cta-outline:hover {
  background: rgba(244, 180, 26, 0.2) !important;
  border-color: #ffffff !important;
  box-shadow: 8px 8px 0px rgba(255,255,255,0.3) !important;
  transform: translateY(-4px);
}
.meeple-walk {
  position:absolute;
  bottom:20px;
  left:-60px;
  width:52px;
  height:60px;
  background:#F6C84F;
  border-radius:45% 45% 30% 30% / 55% 55% 45% 45%;
  animation:walk 12s linear infinite;
}
.meeple-walk::before {
  content:'';
  position:absolute;
  top:-22px;
  left:50%;
  transform:translateX(-50%);
  width:30px;
  height:30px;
  background:#F6C84F;
  border-radius:50%;
}
.meeple-walk::after {
  content:'';
  position:absolute;
  bottom:-10px;
  left:50%;
  transform:translateX(-50%);
  width:48px;
  height:12px;
  background:rgba(0,0,0,0.15);
  border-radius:999px;
  filter:blur(2px);
}
@keyframes walk {
  0% { transform:translateX(0); }
  100% { transform:translateX(120%); }
}
footer {
  border-top:1px solid rgba(15,23,42,0.05);
  padding:48px 0;
}
footer .footer-row {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;
  gap:18px;
}
.auth-wrapper {
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:64px 16px;
}
.form-card {
  width:min(460px,94vw);
  background:var(--card);
  border-radius:36px;
  border:1px solid rgba(15,23,42,0.08);
  box-shadow:var(--shadow);
  padding:40px;
}
.form-card h4 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.8rem; margin-bottom:12px; }
.form-card label { display:flex; flex-direction:column; gap:8px; font-weight:600; color:var(--muted); }
.form-card input, .form-card textarea, .modal-card input, .modal-card select {
  border-radius:18px;
  border:1px solid rgba(15,23,42,0.12);
  padding:14px 16px;
  font-size:1rem;
}
.form-card input:focus, .modal-card input:focus, .modal-card select:focus, textarea:focus {
  outline:2px solid rgba(89,165,255,0.4);
}
.checkbox-row { display:flex; align-items:center; gap:10px; font-size:0.9rem; color:var(--muted); }
.auth-links { display:flex; justify-content:space-between; margin-top:16px; font-size:0.9rem; }
.dashboard-shell { min-height:100vh; background:var(--bg); padding-bottom:120px; }
.dashboard-content { padding:40px 0 100px; }
.search-row {
  display:flex;
  gap:12px;
  flex-wrap:wrap;
  align-items:center;
}
.search-row input {
  flex:1;
  border-radius:999px;
  border:4px solid var(--cuphead-black);
  padding:14px 18px;
  background:var(--cuphead-white);
  box-shadow:4px 4px 0px var(--cuphead-black);
  font-weight:600;
}
.search-row input:focus {
  outline:none;
  box-shadow:0 0 0 4px var(--cuphead-yellow), 4px 4px 0px var(--cuphead-black);
}
.search-icon {
  flex-shrink:0;
  color:var(--cuphead-black);
}
.filter-row { display:flex; flex-wrap:wrap; gap:10px; margin:20px 0 28px; }
.filter-chip {
  border-radius:999px;
  border:4px solid var(--cuphead-black);
  padding:8px 16px;
  background:var(--cuphead-white);
  color:var(--cuphead-black);
  font-family:var(--font-display);
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:1px;
  cursor:pointer;
  transition:transform .2s ease, background .2s ease, color .2s ease;
  box-shadow:4px 4px 0px var(--cuphead-black);
}
.filter-chip:hover { transform:translateY(-2px); }
.filter-chip.active {
  background:var(--cuphead-blue);
  color:var(--cuphead-white);
  border-color:var(--cuphead-black);
  transform:translateY(-2px);
}
.games-grid {
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  gap:20px;
}
.game-card {
  border-radius:30px;
  border:6px solid var(--cuphead-black);
  background:var(--cuphead-white);
  padding:16px;
  box-shadow:var(--shadow-cuphead-large);
  display:flex;
  flex-direction:column;
  gap:14px;
  transition:transform .2s ease, box-shadow .2s ease;
}
.game-card:hover { transform:translateY(-6px) rotate(-1deg); box-shadow:12px 12px 0px var(--cuphead-black); }
.game-cover {
  border-radius:24px;
  height:140px;
  cursor:pointer;
  border:4px solid var(--cuphead-black);
  box-shadow:4px 4px 0px var(--cuphead-black);
}
.game-meta { display:flex; flex-wrap:wrap; gap:10px; font-size:0.85rem; color:var(--muted); }
.meta-tag {
  background:var(--cuphead-cream);
  padding:6px 10px;
  border-radius:12px;
  display:flex;
  align-items:center;
  gap:4px;
  border:3px solid var(--cuphead-black);
  box-shadow:3px 3px 0px var(--cuphead-black);
  font-weight:700;
}
.more-menu { position:relative; }
.more-dropdown {
  position:absolute;
  top:110%;
  right:0;
  background:var(--cuphead-white);
  border:4px solid var(--cuphead-black);
  border-radius:16px;
  box-shadow:6px 6px 0px var(--cuphead-black);
  min-width:180px;
  padding:8px 0;
  z-index:10;
}
.more-dropdown button {
  width:100%;
  background:none;
  border:none;
  padding:10px 16px;
  text-align:left;
  cursor:pointer;
  color:var(--cuphead-black);
  font-family:var(--font-display);
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:1px;
}
.more-dropdown button:hover { background:var(--cuphead-cream); color:var(--cuphead-black); }
.panel-overlay {
  position:fixed;
  inset:0;
  background:rgba(15,23,42,0.45);
  display:flex;
  justify-content:flex-end;
  z-index:60;
}
.detail-panel {
  width:min(420px,90vw);
  background:var(--cuphead-white);
  height:100%;
  padding:32px;
  overflow-y:auto;
  border-top-left-radius:28px;
  border-bottom-left-radius:28px;
  border-left:6px solid var(--cuphead-black);
  border-top:6px solid var(--cuphead-black);
  border-bottom:6px solid var(--cuphead-black);
  animation:slideIn .28s ease;
}
@keyframes slideIn { from { transform:translateX(30px); opacity:0; } to { transform:translateX(0); opacity:1; } }
.modal-overlay {
  position:fixed;
  inset:0;
  background:rgba(15,23,42,0.55);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:70;
}
.modal-card {
  width:min(640px,94vw);
  background:var(--cuphead-white);
  border-radius:32px;
  border:6px solid var(--cuphead-black);
  box-shadow:var(--shadow-cuphead-large);
  padding:32px;
}
.modal-actions { display:flex; justify-content:flex-end; gap:12px; margin-top:24px; }
.mesa-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
.mesa-result { border-radius:28px; padding:24px; border:1px solid rgba(15,23,42,0.08); background:#fff; box-shadow:var(--shadow); }
.result-card { border:1px solid rgba(15,23,42,0.08); border-radius:20px; padding:16px; margin-bottom:16px; }
.placeholder-card {
  background:var(--card);
  border-radius:40px;
  padding:48px;
  text-align:center;
  border:1px solid rgba(15,23,42,0.08);
  box-shadow:var(--shadow);
}
@media (max-width:768px) {
  section { padding:56px 0; }
  .landing-nav { display:none; }
  .hero-grid { padding-top:24px; }
  .dashboard-content { padding-bottom:140px; }
  .games-grid { grid-template-columns:repeat(1, minmax(0, 1fr)); }
  .detail-panel { width:100%; border-radius:32px 32px 0 0; }
  .panel-overlay { align-items:flex-end; justify-content:center; }
  .hero-headline { font-size:2.6rem; }
  .testimonial-card {
    box-shadow:6px 8px 0 rgba(15,23,42,0.7);
    border-width:2px;
  }
  .preview-cards-title {
    font-size: 0.9rem;
    top: 100px;
    max-width: 260px;
  }
  .preview-card-1 { top: 160px; left: 8%; transform: rotate(-8deg) scale(0.8); }
  .preview-card-2 { top: 180px; right: 8%; transform: rotate(6deg) scale(0.8); }
  .preview-card-3 { bottom: 28%; right: 12%; transform: rotate(-4deg) scale(0.8); }
  .landing-cta-section {
    padding: 80px 0 100px;
  }
  .landing-cta-title {
    font-size: 2rem;
    margin-bottom: 16px;
  }
  .landing-cta-description {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  .landing-cta-actions {
    gap: 14px;
    flex-direction: column;
  }
  .landing-cta-actions .btn {
    width: 100%;
    max-width: 280px;
  }
  .meeple-walk {
    bottom: 12px;
    left: -70px;
    width: 48px;
    height: 56px;
  }
  .meeple-walk::before {
    top: -20px;
    width: 28px;
    height: 28px;
  }
}

@media (max-width:640px) {
  section { padding:48px 0; }
  .ludo-container {
    width:min(1140px,96vw);
    padding:0 12px;
  }
  .hero {
    min-height:auto;
    padding:0 12px 48px;
  }
  .hero-text {
    padding:24px 12px;
  }
  .hero-actions .btn {
    min-width:0;
    width:100%;
  }
  .preview-board {
    padding:18px;
  }
  .preview-card-collection {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap:8px;
  }
  .preview-mini-list {
    font-size:0.7rem;
    padding:10px 12px 8px;
  }
  .dashboard-content {
    padding:28px 0 160px;
  }
  .landing-cta-section {
    padding: 60px 0 80px;
  }
  .landing-cta-content {
    max-width: 90vw;
    padding: 0 16px;
  }
  .landing-cta-title {
    font-size: 1.6rem;
    margin-bottom: 14px;
    letter-spacing: 0.8px;
  }
  .landing-cta-description {
    font-size: 0.95rem;
    margin-bottom: 28px;
  }
  .landing-cta-actions {
    gap: 12px;
  }
  .landing-cta-actions .btn {
    padding: 14px 20px !important;
    font-size: 0.9rem;
    width: 100%;
  }
  .meeple-walk {
    display: none;
  }
}
`;
const LogoMark = ({ showWordmark = false, size = 48 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <img src="/assets/logo.svg" alt="Ludoteca" style={{ width: size, height: size }} />
    {showWordmark && <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#0F172A" }}>Ludoteca</span>}
  </div>
);

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <section id="demo" className="preview-enchanted">
        <div className="ludo-container preview-layout">
          <div className="preview-copy">
            <span className="section-title">Preview encantado</span>
            <h2 className="section-heading">Veja como sua Ludoteca vai ficar</h2>
            <p className="preview-sub">
              Uma visão mágica da sua coleção: cartas flutuando, meeples sorrindo e um tabuleiro
              pronto para a próxima jogatina.
            </p>

            <div className="preview-chips">
              <span>Coleção viva</span>
              <span>Mesa de Hoje</span>
              <span>Link compartilhável</span>
            </div>

            <p className="preview-note">
              Esses jogos são apenas um exemplo — sua Ludoteca ganha vida com os títulos que você cadastrar.
            </p>
          </div>

          <div className="preview-board">
            <div className="preview-glow" />

            <div className="preview-track" />

            <div className="preview-meep">
              <div className="preview-face">
                <span className="eye" />
                <span className="eye" />
                <span className="smile" />
              </div>
            </div>

            <div className="preview-floating preview-card-1">
              <img src="/assets/carta-personagem-1.png" alt="Carta de personalidade jogador" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>

            <div className="preview-floating preview-card-2">
              <img src="/assets/carta-personagem-2.png" alt="Carta de personalidade jogador" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>

            <div className="preview-floating preview-card-3">
              <img src="/assets/carta-personagem-3.png" alt="Carta de personalidade jogador" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>

            <div className="preview-mini-list">
              <div className="preview-mini-header">
                <span className="preview-mini-pill">Jogos da sua estante</span>
                <span className="preview-mini-label">Exemplo de como a Ludoteca organiza tudo</span>
              </div>

              {SAMPLE_GAMES.slice(0, 4).map((game) => (
                <div key={game.id} className="preview-mini-item">
                  <span className="preview-mini-dot" />
                  <span className="preview-mini-title">{game.title}</span>
                  <span className="preview-mini-meta">
                    {game.players} • {game.time} • {game.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorks items={HOW_IT_WORKS} />

      <Benefits cards={BENEFIT_CARDS} />

      <PersonasSection personas={PERSONAS} />

      <TestimonialsSection items={TESTIMONIALS} />

      <FAQSection items={FAQ_ITEMS} />

      <section className="landing-cta-section">
        <div className="ludo-container landing-dark">
          <div className="meeple-walk" />
          <div className="landing-cta-content">
            <h3 className="landing-cta-title">Chegou a hora de criar sua Ludoteca?</h3>
            <p className="landing-cta-description">Entre no universo pastel, convide o grupo e transforme o ritual de escolher jogos.</p>
            <div className="landing-cta-actions">
              <Link to="/cadastro" className="btn btn-primary">Criar conta</Link>
              <Link to="/login" className="btn btn-outline landing-cta-outline">Entrar</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("colecao");
  const [games, setGames] = useState(SAMPLE_GAMES);
  const navigate = useNavigate();
  const renderTab = () => {
    if (activeTab === "colecao") return <CollectionPage games={games} onAddGame={(game) => setGames((prev) => [game, ...prev])} />;
    if (activeTab === "mesa") return <MesaDeHojePage games={games} />;
    if (activeTab === "partidas") return <PartidasPage />;
    return <ProfilePage />;
  };
  const openProfile = () => setActiveTab("perfil");
  const openSettings = () => {
    navigate("/home/settings");
  };
  return (
    <div className="dashboard-shell">
      <AppHeader
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        tabs={NAV_TABS}
        onOpenHelp={() => navigate("/ajuda")}
        onOpenProfile={openProfile}
        onOpenSettings={openSettings}
      />
      <div className="ludo-container dashboard-content">{renderTab()}</div>
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} tabs={NAV_TABS} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <UserProvider>
        <div className="ludo-shell">
          <style>{globalStyles}</style>
          <Routes>
            <Route path="/" element={<Navigate to="/landingpage" replace />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/cadastro" element={<AuthPage mode="signup" />} />
            <Route path="/onboarding" element={<OnboardingPage onDone={() => window.location.assign("/home")} />} />
            <Route path="/ajuda" element={<HelpPage />} />
            <Route path="/public/:slug" element={<PublicCollectionPage />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/home/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}
