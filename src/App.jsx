import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  Clock,
  Sparkles,
  User,
  Layers,
  Link2,
  Wand2,
  Heart,
  Copy,
  Menu,
  Star,
  MoreHorizontal,
  Share2,
  Link as LinkIcon,
  Library,
  NotebookPen,
  Bell
} from "lucide-react";
const HOW_IT_WORKS = [
  {
    title: "Cadastre seus jogos",
    description: "Adicione capas, vibes e info essenciais como em um inventario magico.",
    icon: Layers,
    mascot: "assets/mascot-book"
  },
  {
    title: "Compartilhe com o grupo",
    description: "Gere um link encantado para mandar no WhatsApp ou Discord.",
    icon: Link2,
    mascot: "assets/mascot-share"
  },
  {
    title: "Descubra a Mesa de Hoje",
    description: "Use filtros inteligentes e deixe o app sugerir o jogo perfeito.",
    icon: Wand2,
    mascot: "assets/mascot-wand"
  }
];

const BENEFIT_CARDS = [
  { title: "Minha Colecao", description: "Controle total em cartas lindas.", accent: "#E5F3FF" },
  { title: "Mesa de Hoje", description: "Algoritmo inspirado em meeples conselheiros.", accent: "#F1E7FF" },
  { title: "Link compartilhavel", description: "Envie para o grupo com um toque.", accent: "#FFECDD" },
  { title: "Registro de partidas", description: "Em breve seu grimorio de historias.", accent: "#FFE9F2", badge: "Soon" }
];

const PERSONAS = [
  { title: "Host", description: "Mantem a estante impecavel e quer deixar tudo catalogado.", piece: "meeple" },
  { title: "Grupo", description: "Amigos indecisos que adoram votar e opinar.", piece: "token" },
  { title: "Casal", description: "Jogam de vez em quando e querem sugestoes rapidas.", piece: "heart" }
];

const TESTIMONIALS = [
  {
    quote: "Transformei minha estante em um portal digital. Agora escolher jogo virou parte da brincadeira.",
    author: "Lais, curadora de meeples"
  },
  {
    quote: "A Mesa de Hoje salvou minhas noites de sexta. O grupo aceita as sugestoes na hora.",
    author: "Rafa, mestre das jogatinas"
  }
];

const QUICK_FILTERS = [
  "Todos",
  "Favoritos",
  "Party",
  "Estrategia",
  "2 jogadores",
  "Jogos rapidos",
  "Pesados",
  "Cooperativos",
  "Familia"
];

const SAMPLE_GAMES = [
  {
    id: 1,
    title: "Catan",
    players: "3-4",
    minPlayers: 3,
    maxPlayers: 4,
    time: "60-90 min",
    weight: "Medio",
    vibe: "Estrategia",
    type: "Euro",
    cover: "linear-gradient(135deg,#59A5FF,#9AE6FF)",
    notes: "Otimo para apresentar aos amigos.",
    video: "https://youtu.be/1-0-0"
  },
  {
    id: 2,
    title: "Ticket to Ride",
    players: "2-5",
    minPlayers: 2,
    maxPlayers: 5,
    time: "45-60 min",
    weight: "Leve",
    vibe: "Familia",
    type: "Rota",
    cover: "linear-gradient(135deg,#FFC46B,#FFE3A2)",
    notes: "Combo perfeito com cafe e sobremesa.",
    video: "https://youtu.be/2-0-0"
  },
  {
    id: 3,
    title: "Dixit",
    players: "3-6",
    minPlayers: 3,
    maxPlayers: 6,
    time: "30 min",
    weight: "Leve",
    vibe: "Party",
    type: "Criativo",
    cover: "linear-gradient(135deg,#FF8BA7,#FFC2D4)",
    notes: "Reboots de imaginacao sem estresse.",
    video: "https://youtu.be/3-0-0"
  },
  {
    id: 4,
    title: "Pandemic",
    players: "2-4",
    minPlayers: 2,
    maxPlayers: 4,
    time: "45 min",
    weight: "Medio",
    vibe: "Cooperativo",
    type: "Coop",
    cover: "linear-gradient(135deg,#85E0FF,#D1FBFF)",
    notes: "Use para iniciar quem gosta de desafios cooperativos.",
    video: "https://youtu.be/4-0-0"
  }
];

const PLAYER_OPTIONS = ["2", "3-4", "5-6", "7+"];
const TIME_OPTIONS = ["30 min", "60 min", "90+ min", "Tanto faz"];
const WEIGHT_OPTIONS = ["Leve", "Medio", "Pesado", "Tanto faz"];
const APP_TABS = [
  { key: "colecao", label: "Colecao", icon: Library },
  { key: "mesa", label: "Mesa de Hoje", icon: Sparkles },
  { key: "partidas", label: "Partidas", icon: NotebookPen },
  { key: "perfil", label: "Perfil", icon: User }
];

const useMediaQuery = (query) => {
  const getMatch = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(getMatch);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQueryList = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", handler);
    return () => mediaQueryList.removeEventListener("change", handler);
  }, [query]);
  return matches;
};
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
}
* { box-sizing:border-box; }
body {
  margin:0;
  font-family:'Inter', sans-serif;
  background:var(--bg);
  color:var(--text);
  line-height:1.5;
}
a { color:inherit; text-decoration:none; }
img { max-width:100%; }
.ludo-shell { min-height:100vh; background:var(--bg); }
section { padding:72px 0; }
.ludo-container { width:min(1180px,92vw); margin:0 auto; }
button { font-family:'Inter', sans-serif; }
.btn {
  border:none;
  border-radius:999px;
  padding:14px 24px;
  font-weight:600;
  cursor:pointer;
  transition:all .22s ease;
}
.btn-primary { background:var(--primary); color:#fff; box-shadow:0 12px 32px rgba(89,165,255,0.35); }
.btn-primary:hover { filter:brightness(1.05); transform:translateY(-1px); }
.btn-outline { background:transparent; border:1px solid rgba(15,23,42,0.15); color:var(--navy); }
.btn-outline:hover { background:rgba(89,165,255,0.12); }
.btn-ghost { background:transparent; color:var(--navy); }
.landing-header {
  position:fixed;
  top:20px;
  left:50%;
  transform:translateX(-50%);
  width:84%;
  z-index:50;
  background:rgba(255,255,255,0.45);
  backdrop-filter:blur(20px);
  border-radius:32px;
  padding:14px 28px;
  box-shadow:0 4px 20px rgba(0,0,0,0.04);
  border:none;
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
.hero-grid { display:none; }
.hero {
  width:100%;
  min-height:90vh;
  background-image:url("/assets/hero-ludoteca-extra-bg.png");
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
  font-family:'Baloo 2','Plus Jakarta Sans',sans-serif;
  font-weight:700;
  font-size:clamp(2.4rem,4vw,3.2rem);
  line-height:1.05;
  color:#0F172A;
  margin:12px 0 16px;
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
@media (max-width:768px) {
  .landing-header {
    width:94%;
    padding:10px 16px;
    border-radius:22px;
  }
  .landing-header .btn.btn-primary { display:none; }
  .hero {
    background-image:url("/assets/hero-banner-mobile-extra-bg.png");
    background-position:center top;
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
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.2);
  overflow: hidden;
  min-height: 260px;
  border: 1px solid rgba(255, 255, 255, 0.6);
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
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.18);
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

.preview-card-1 { top: 20px; left: 14%; transform: rotate(-8deg); }
.preview-card-2 { top: 40px; right: 8%; transform: rotate(6deg); }
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
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
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
.tilt-stack {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:24px;
  position:relative;
  padding:20px;
  background-image:linear-gradient(0deg,rgba(15,23,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.03) 1px,transparent 1px);
  background-size:24px 24px;
  border-radius:36px;
}
.tilt-card {
  background:#fff;
  border-radius:32px;
  padding:24px;
  border:1px solid rgba(15,23,42,0.06);
  box-shadow:0 20px 40px rgba(15,23,42,0.08);
  transform:rotate(-3deg);
  transition:transform .25s ease, box-shadow .25s ease;
  position:relative;
}
.tilt-card:nth-child(even) { transform:rotate(3deg); }
.tilt-card:hover { transform:rotate(0deg) translateY(-8px); box-shadow:0 32px 70px rgba(15,23,42,0.2); }
.step-label {
  position:absolute;
  top:16px;
  left:16px;
  font-size:0.75rem;
  font-weight:700;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:rgba(15,23,42,0.6);
}
.benefit-deck {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:18px;
}
.benefit-card {
  border-radius:26px;
  padding:24px;
  box-shadow:0 20px 40px rgba(15,23,42,0.1);
  position:relative;
  transform:perspective(600px) rotateY(-6deg);
  transition:transform .3s ease;
}
.benefit-card:hover { transform:perspective(600px) rotateY(0deg) translateY(-6px); }
.benefit-card small {
  position:absolute;
  top:12px;
  right:16px;
  background:#0F172A;
  color:#fff;
  padding:4px 10px;
  border-radius:12px;
  font-size:0.7rem;
}
.benefit-card.soon small {
  background:#FF6B81;
  transform:rotate(-6deg);
  box-shadow:0 6px 12px rgba(255,107,129,0.4);
}
.benefit-icon {
  width:42px;
  height:42px;
  border-radius:14px;
  background:rgba(15,23,42,0.08);
  margin-bottom:14px;
}
.benefit-card h4 {
  font-size:1.2rem;
  font-family:'Plus Jakarta Sans', sans-serif;
}
.persona-pieces {
  display:flex;
  flex-wrap:wrap;
  gap:28px;
  margin-top:24px;
}
.persona-piece {
  width:120px;
  height:120px;
  border-radius:45% 55% 55% 45% / 35% 45% 55% 65%;
  background:linear-gradient(145deg,#FCE7F3,#DFF6FF);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  color:#0F172A;
  position:relative;
  cursor:pointer;
  box-shadow:0 18px 36px rgba(15,23,42,0.1);
  animation:breath 6s ease-in-out infinite;
  font-size:2.2rem;
}
@keyframes breath {
  0%,100% { transform:scale(1); }
  50% { transform:scale(1.05); }
}
.persona-piece:hover .piece-tooltip { opacity:1; transform:translate(-50%, -120%) scale(1); }
.piece-tooltip {
  position:absolute;
  left:50%;
  top:0;
  transform:translate(-50%, -100%) scale(0.9);
  background:#0F172A;
  color:#fff;
  padding:14px;
  border-radius:18px;
  width:200px;
  text-align:center;
  font-size:0.95rem;
  opacity:0;
  pointer-events:none;
  transition:all .2s ease;
}
.piece-tooltip::after {
  content:'';
  position:absolute;
  bottom:-10px;
  left:50%;
  transform:translateX(-50%);
  width:18px;
  height:18px;
  background:#0F172A;
  clip-path:polygon(50% 100%,0 0,100% 0);
}
.testimonial-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
}
.testimonial-card {
  border:3px solid #0F172A;
  border-radius:36px;
  padding:28px;
  background:#FFFCF3;
  box-shadow:8px 10px 0 rgba(15,23,42,0.8);
}
.bubble-quote {
  background:rgba(255,255,255,0.9);
  border-radius:24px 24px 12px 12px;
  padding:18px;
  margin-bottom:14px;
  position:relative;
}
.bubble-quote::after {
  content:'';
  position:absolute;
  bottom:-8px;
  left:28px;
  width:20px;
  height:12px;
  background:rgba(255,255,255,0.9);
  border-radius:0 0 12px 12px;
}
@media (max-width:640px) {
  .testimonial-card {
    box-shadow:6px 7px 0 rgba(15,23,42,0.65);
    border-width:2px;
  }
}
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
.app-header {
  position:sticky;
  top:0;
  backdrop-filter:blur(16px);
  background:rgba(247,249,252,0.96);
  border-bottom:1px solid rgba(15,23,42,0.05);
  z-index:30;
}
.app-header .header-inner {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  padding:18px 0;
}
.tab-group { display:flex; gap:10px; flex-wrap:wrap; }
.tab-pill {
  border:none;
  border-radius:999px;
  padding:10px 18px;
  background:transparent;
  color:var(--muted);
  font-weight:600;
  cursor:pointer;
}
.tab-pill.active { background:rgba(89,165,255,0.18); color:var(--navy); box-shadow:0 12px 30px rgba(15,23,42,0.1); }
.header-actions { display:flex; align-items:center; gap:16px; }
.profile-chip {
  display:flex;
  align-items:center;
  gap:12px;
  padding:8px 16px;
  border-radius:999px;
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  box-shadow:var(--shadow);
}
.profile-chip strong { font-size:0.95rem; color:var(--navy); }
.profile-chip small { color:var(--muted); font-size:0.82rem; }
.avatar-mini { width:40px; height:40px; border-radius:50%; background:rgba(89,165,255,0.2); display:flex; align-items:center; justify-content:center; font-weight:600; color:var(--navy); }
.dashboard-content { padding:36px 0 96px; }
.search-row {
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}
.search-row input { flex:1; border-radius:999px; border:1px solid rgba(15,23,42,0.12); padding:14px 18px; }
.filter-row { display:flex; flex-wrap:wrap; gap:10px; margin:20px 0 28px; }
.filter-chip {
  border-radius:999px;
  border:1px solid rgba(15,23,42,0.12);
  padding:8px 16px;
  background:#fff;
  color:var(--muted);
  font-weight:600;
  cursor:pointer;
  transition:all .2s ease;
}
.filter-chip.active { background:var(--primary); color:#fff; border-color:var(--primary); box-shadow:0 12px 32px rgba(89,165,255,0.35); }
.games-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px; }
.game-card {
  border-radius:30px;
  border:1px solid rgba(15,23,42,0.05);
  background:var(--card);
  padding:16px;
  box-shadow:var(--shadow);
  display:flex;
  flex-direction:column;
  gap:14px;
  transition:transform .2s ease, box-shadow .2s ease;
}
.game-card:hover { transform:translateY(-4px); box-shadow:0 22px 46px rgba(15,23,42,0.12); }
.game-cover { border-radius:24px; height:140px; cursor:pointer; }
.game-meta { display:flex; flex-wrap:wrap; gap:10px; font-size:0.85rem; color:var(--muted); }
.meta-tag { background:rgba(15,23,42,0.05); padding:6px 12px; border-radius:12px; display:flex; align-items:center; gap:4px; }
.more-menu { position:relative; }
.more-dropdown {
  position:absolute;
  top:110%;
  right:0;
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  border-radius:16px;
  box-shadow:var(--shadow);
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
  color:var(--muted);
}
.more-dropdown button:hover { background:rgba(89,165,255,0.08); color:var(--navy); }
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
  background:#fff;
  height:100%;
  padding:32px;
  overflow-y:auto;
  border-top-left-radius:28px;
  border-bottom-left-radius:28px;
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
  background:#fff;
  border-radius:32px;
  border:1px solid rgba(15,23,42,0.06);
  box-shadow:var(--shadow);
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
.profile-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
.profile-card {
  background:var(--card);
  border-radius:28px;
  padding:24px;
  border:1px solid rgba(15,23,42,0.06);
  box-shadow:var(--shadow);
}
.switch-row { display:flex; align-items:center; justify-content:space-between; margin-top:12px; }
.bottom-nav {
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:#fff;
  border-top:1px solid rgba(15,23,42,0.08);
  display:none;
  grid-template-columns:repeat(4,1fr);
  z-index:80;
}
.bottom-nav button {
  border:none;
  background:none;
  padding:12px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:4px;
  font-size:0.85rem;
  color:var(--muted);
}
.bottom-nav button.active { color:var(--primary); font-weight:600; }
@media (max-width:768px) {
  section { padding:56px 0; }
  .landing-nav { display:none; }
  .hero-grid { padding-top:24px; }
  .app-header .header-inner { flex-direction:column; align-items:flex-start; }
  .dashboard-content { padding-bottom:140px; }
  .games-grid { grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
  .detail-panel { width:100%; border-radius:32px 32px 0 0; }
  .panel-overlay { align-items:flex-end; justify-content:center; }
  .bottom-nav { display:grid; }
  .hero-headline { font-size:2.6rem; }
  .testimonial-card {
    box-shadow:6px 8px 0 rgba(15,23,42,0.7);
    border-width:2px;
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
  const [menuOpen, setMenuOpen] = useState(false);
  const personaSymbols = useMemo(() => ({ meeple: "🎲", token: "⭕", heart: "❤️" }), []);
  return (
    <>
      <header className="landing-header">
        <div className="ludo-container inner">
          <LogoMark showWordmark />
          <nav className="landing-nav">
            <a href="#demo">Demo</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#para-quem">Para quem e</a>
            <a href="#depoimentos">Depoimentos</a>
          </nav>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link className="btn btn-outline" to="/login">Entrar</Link>
            <Link className="btn btn-primary" to="/cadastro">Criar conta</Link>
            <button className="btn btn-ghost" style={{ display: "none", padding: 10 }} onClick={() => setMenuOpen((prev) => !prev)}>
              <Menu />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="ludo-container">
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 16 }}>
              <a href="#demo">Demo</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#para-quem">Para quem e</a>
              <a href="#depoimentos">Depoimentos</a>
            </div>
          </div>
        )}
      </header>
      <section className="hero">
        <div className="hero-text">
          <span className="hero-tag">Universo pastel da Ludoteca</span>
          <h1>Organize sua estante de jogos com magia e praticidade.</h1>
          <p>Mostre sua colecao, convide seus amigos e decida em minutos o que vai para a mesa.</p>
          <div className="hero-actions">
            <Link to="/cadastro" className="btn btn-primary">Criar minha Ludoteca</Link>
            <a href="#como-funciona" className="btn btn-secondary">Ver como funciona</a>
          </div>
        </div>
      </section>
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
              <strong>Coleção</strong>
              <span>Capas, vibes e filtros</span>
            </div>

            <div className="preview-floating preview-card-2">
              <strong>Mesa de Hoje</strong>
              <span>Sugestões inteligentes</span>
            </div>

            <div className="preview-floating preview-card-3">
              <strong>Partidas</strong>
              <span>Histórias em construção</span>
            </div>

            <div className="preview-card-collection">
              {SAMPLE_GAMES.slice(0, 4).map((game) => (
                <div key={game.id} className="preview-game-card">
                  <div className="preview-game-cover" style={{ background: game.cover }} />
                  <div className="preview-game-body">
                    <div className="preview-game-title-row">
                      <strong>{game.title}</strong>
                    </div>
                    <div className="preview-game-tags">
                      <span className="preview-game-chip">{game.players}</span>
                      <span className="preview-game-chip">{game.time}</span>
                      <span className="preview-game-chip">{game.weight}</span>
                    </div>
                  </div>
                </div>
              ))}
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

      <section id="como-funciona">
        <div className="ludo-container">
          <span className="section-title">Manual ilustrado</span>
          <h2 className="section-heading">Como funciona</h2>
          <div className="tilt-stack">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={item.title} className="tilt-card">
                <div className="step-label">Passo {index + 1}</div>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(89,165,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <item.icon color="#59A5FF" />
                </div>
                <h4 style={{ margin: "16px 0 8px" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "var(--muted)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="ludo-container">
          <span className="section-title">Beneficios</span>
          <h2 className="section-heading">Cartas especiais da Ludoteca</h2>
          <div className="benefit-deck">
            {BENEFIT_CARDS.map((card) => (
              <div key={card.title} className={`benefit-card ${card.badge ? "soon" : ""}`} style={{ background: card.accent }}>
                {card.badge && <small>{card.badge}</small>}
                <div className="benefit-icon" />
                <h4 style={{ margin: "6px 0 10px", fontSize: "1.4rem", fontWeight: 700 }}>{card.title}</h4>
                <p style={{ margin: 0, color: "var(--muted)" }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="para-quem">
        <div className="ludo-container">
          <span className="section-title">Para quem e</span>
          <h2 className="section-heading">Pecas que representam cada jogador</h2>
          <div className="persona-pieces">
            {PERSONAS.map((persona) => (
              <div key={persona.title} className="persona-piece">
                {personaSymbols[persona.piece]}
                <div className="piece-tooltip">
                  <strong>{persona.title}</strong>
                  <p style={{ margin: "6px 0 0" }}>{persona.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos">
        <div className="ludo-container">
          <span className="section-title">Depoimentos</span>
          <h2 className="section-heading">Jogadores apaixonados</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.author} className="testimonial-card">
                <div className="bubble-quote">
                  <p style={{ fontSize: "1rem", margin: 0 }}>&ldquo;{item.quote}&rdquo;</p>
                </div>
                <strong>{item.author}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="ludo-container landing-dark">
          <div className="meeple-walk" />
          <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "2.2rem", margin: 0 }}>Chegou a hora de criar sua Ludoteca?</h3>
          <p style={{ color: "rgba(226,232,240,0.9)" }}>Entre no universo pastel, convide o grupo e transforme o ritual de escolher jogos.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 24 }}>
            <Link to="/cadastro" className="btn btn-primary">Criar conta</Link>
            <Link to="/login" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>Entrar</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="ludo-container footer-row">
          <LogoMark showWordmark size={36} />
          <nav style={{ display: "flex", gap: "18px" }}>
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="#">Contato (futuro)</a>
          </nav>
          <small>(c) {new Date().getFullYear()} Ludoteca</small>
        </div>
      </footer>
    </>
  );
};

const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    mode === "login"
      ? { email: "", password: "", remember: true }
      : { name: "", email: "", password: "", confirm: "" }
  );
  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };
  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <Link to="/landingpage" style={{ textDecoration: "none" }}>
          <LogoMark showWordmark size={36} />
        </Link>
        <h4>{mode === "login" ? "Entrar" : "Criar conta"}</h4>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {mode === "signup" && (
            <label>
              Nome
              <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Seu nome" />
            </label>
          )}
          <label>
            E-mail
            <input type="email" required value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="seuemail@exemplo.com" />
          </label>
          <label>
            Senha
            <input type="password" required value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Digite sua senha" />
          </label>
          {mode === "login" ? (
            <label className="checkbox-row">
              <input type="checkbox" checked={form.remember} onChange={(e) => handleChange("remember", e.target.checked)} /> Manter conectado
            </label>
          ) : (
            <label>
              Confirmar senha
              <input type="password" required value={form.confirm} onChange={(e) => handleChange("confirm", e.target.value)} placeholder="Repita a senha" />
            </label>
          )}
          {mode === "signup" && <small style={{ color: "var(--muted)" }}>Com uma conta voce salva sua colecao, usa a Mesa de Hoje e compartilha um link com amigos.</small>}
          <button type="submit" className="btn btn-primary">{mode === "login" ? "Entrar" : "Criar conta"}</button>
          {mode === "login" ? (
            <div className="auth-links">
              <Link to="/cadastro">Criar conta</Link>
              <a href="#">Esqueci minha senha</a>
            </div>
          ) : (
            <Link to="/login" style={{ fontWeight: 600 }}>Ja tenho conta - Entrar</Link>
          )}
        </form>
      </div>
    </div>
  );
};

const FilterChip = ({ label, active, onClick }) => (
  <button type="button" className={`filter-chip ${active ? "active" : ""}`} onClick={onClick}>
    {label}
  </button>
);
const GameCard = ({ game, isFavorite, onToggleFavorite, onOpen, onQuickAction }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="game-card">
      <div className="game-cover" style={{ background: game.cover }} onClick={() => onOpen(game)} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{game.title}</strong>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => onToggleFavorite(game.id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
            <Heart size={18} color={isFavorite ? "#FF72A8" : "#B0B8CA"} fill={isFavorite ? "#FF72A8" : "none"} />
          </button>
          <div className="more-menu">
            <button style={{ border: "none", background: "transparent", cursor: "pointer" }} onClick={() => setMenuOpen((prev) => !prev)}>
              <MoreHorizontal size={18} />
            </button>
            {menuOpen && (
              <div className="more-dropdown">
                <button onClick={() => onQuickAction("editar", game)}>Editar jogo</button>
                <button onClick={() => onQuickAction("detalhes", game)}>Ver detalhes</button>
                <button onClick={() => onQuickAction("remover", game)} style={{ color: "#DC2626" }}>Remover</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="game-meta">
        <span className="meta-tag"><Users size={14} /> {game.players}</span>
        <span className="meta-tag"><Clock size={14} /> {game.time}</span>
        <span className="meta-tag">{game.weight}</span>
        <span className="meta-tag">{game.vibe}</span>
      </div>
    </div>
  );
};

const GameDetailPanel = ({ game, onClose, isMobile }) => (
  <div className="panel-overlay" role="dialog">
    <div className="detail-panel" style={isMobile ? { borderRadius: "32px 32px 0 0" } : undefined}>
      <button className="btn btn-ghost" style={{ alignSelf: "flex-end", padding: "6px 12px" }} onClick={onClose}>Fechar</button>
      <div className="game-cover" style={{ background: game.cover, height: 200, borderRadius: 28 }} />
      <h3 style={{ fontFamily: "Plus Jakarta Sans", marginTop: 24 }}>{game.title}</h3>
      <div className="game-meta" style={{ marginBottom: 24 }}>
        <span className="meta-tag"><Users size={14} /> {game.players}</span>
        <span className="meta-tag"><Clock size={14} /> {game.time}</span>
        <span className="meta-tag">{game.weight}</span>
        <span className="meta-tag">{game.type}</span>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <strong>Detalhes</strong>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>Jogadores: {game.minPlayers} - {game.maxPlayers}</p>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>Vibe: {game.vibe}</p>
        </div>
        <div>
          <strong>Como jogar rapido</strong>
          <p style={{ color: "var(--muted)" }}>Selecione um video curto para relembrar regras.</p>
          <a href={game.video} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Share2 size={16} /> Ver video de regras
          </a>
        </div>
        <div>
          <strong>Acoes</strong>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <button className="btn btn-primary">Adicionar a Mesa de Hoje</button>
            <button className="btn btn-outline">Marcar como jogado</button>
          </div>
        </div>
        <div>
          <strong>Notas pessoais</strong>
          <textarea rows={4} placeholder="Anote dicas e regras da casa" style={{ width: "100%", borderRadius: 18, border: "1px solid rgba(15,23,42,0.12)", padding: 14 }} defaultValue={game.notes}></textarea>
        </div>
      </div>
    </div>
  </div>
);

const AddGameModal = ({ onClose, onSave }) => {
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
  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field]) nextErrors[field] = "Campo obrigatorio";
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
    <div className="modal-overlay" role="dialog">
      <form className="modal-card" onSubmit={handleSubmit}>
        <h3 style={{ marginTop: 0 }}>Adicionar jogo</h3>
        <label>
          Nome do jogo
          <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} style={errors.title ? { borderColor: "#DC2626" } : undefined} />
          {errors.title && <small style={{ color: "#DC2626" }}>{errors.title}</small>}
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 }}>
          <label>
            Min jogadores
            <input type="number" value={form.minPlayers} onChange={(e) => handleChange("minPlayers", e.target.value)} style={errors.minPlayers ? { borderColor: "#DC2626" } : undefined} />
            {errors.minPlayers && <small style={{ color: "#DC2626" }}>{errors.minPlayers}</small>}
          </label>
          <label>
            Max jogadores
            <input type="number" value={form.maxPlayers} onChange={(e) => handleChange("maxPlayers", e.target.value)} style={errors.maxPlayers ? { borderColor: "#DC2626" } : undefined} />
            {errors.maxPlayers && <small style={{ color: "#DC2626" }}>{errors.maxPlayers}</small>}
          </label>
          <label>
            Tempo medio
            <select value={form.time} onChange={(e) => handleChange("time", e.target.value)} style={errors.time ? { borderColor: "#DC2626" } : undefined}>
              <option value="">Selecione</option>
              {['15 min','30 min','45 min','60 min','90+ min'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.time && <small style={{ color: "#DC2626" }}>{errors.time}</small>}
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
          <label>
            Complexidade
            <select value={form.weight} onChange={(e) => handleChange("weight", e.target.value)}>
              {WEIGHT_OPTIONS.slice(0, 3).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label>
            Vibe
            <select value={form.vibe} onChange={(e) => handleChange("vibe", e.target.value)}>
              {['Party','Estrategia','Familia','Cooperativo','Competitivo'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Link de video (opcional)
          <input type="url" value={form.video} onChange={(e) => handleChange("video", e.target.value)} placeholder="https://" />
        </label>
        <label>
          Notas pessoais (opcional)
          <textarea rows={3} value={form.notes} onChange={(e) => handleChange("notes", e.target.value)}></textarea>
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Salvar jogo</button>
        </div>
      </form>
    </div>
  );
};
const CollectionPage = ({ games, onAddGame }) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [favoriteIds, setFavoriteIds] = useState(new Set([1]));
  const [selectedGame, setSelectedGame] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (activeFilter === "Todos") return true;
      if (activeFilter === "Favoritos") return favoriteIds.has(game.id);
      if (activeFilter === "Party") return game.vibe === "Party";
      if (activeFilter === "Estrategia") return game.vibe === "Estrategia";
      if (activeFilter === "2 jogadores") return game.minPlayers <= 2 && game.maxPlayers >= 2;
      if (activeFilter === "Jogos rapidos") return game.time.includes("30") || game.time.includes("15");
      if (activeFilter === "Pesados") return game.weight === "Pesado";
      if (activeFilter === "Cooperativos") return game.vibe === "Cooperativo";
      if (activeFilter === "Familia") return game.vibe === "Familia";
      return true;
    });
  }, [games, activeFilter, favoriteIds]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p style={{ margin: 0, color: "var(--muted)" }}>Ola, Gabriel ??</p>
          <h2 style={{ margin: "4px 0", fontFamily: "Plus Jakarta Sans" }}>Sua colecao esta pronta para a proxima jogatina.</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setAddModalOpen(true)}><Plus size={18} /> Adicionar jogo</button>
      </div>
      <div className="search-row">
        <input type="text" placeholder="Buscar jogo na sua colecao..." />
        {!isMobile && (
          <button className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Star size={16} /> Favoritos
          </button>
        )}
      </div>
      <div className="filter-row">
        {QUICK_FILTERS.map((filter) => (
          <FilterChip key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
        ))}
      </div>
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
      {selectedGame && <GameDetailPanel game={selectedGame} onClose={() => setSelectedGame(null)} isMobile={isMobile} />}
      {addModalOpen && <AddGameModal onClose={() => setAddModalOpen(false)} onSave={onAddGame} />}
    </div>
  );
};

const MesaDeHojePage = ({ games }) => {
  const [criteria, setCriteria] = useState({ players: "3-4", time: "60 min", weight: "Medio" });
  const [suggestions, setSuggestions] = useState(games.slice(0, 3));
  const copyList = () => {
    const text = suggestions
      .map((game) => `${game.title} (${game.players} jogadores, ${game.time}, ${game.weight})`)
      .join(", ");
    navigator.clipboard?.writeText(`Mesa de hoje: ${text}.`);
    alert("Lista copiada!");
  };
  const handleSuggest = () => {
    const filtered = games.filter((game) => {
      const playerMatch = criteria.players === game.players || criteria.players === "7+";
      const timeMatch = criteria.time === "Tanto faz" || game.time.includes(criteria.time.slice(0, 2));
      const weightMatch = criteria.weight === "Tanto faz" || game.weight === criteria.weight;
      return playerMatch || timeMatch || weightMatch;
    });
    setSuggestions(filtered.slice(0, 4));
  };
  const renderChipGroup = (options, type) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map((option) => (
        <button key={option} type="button" className={`filter-chip ${criteria[type] === option ? "active" : ""}`} onClick={() => setCriteria((prev) => ({ ...prev, [type]: option }))}>
          {option}
        </button>
      ))}
    </div>
  );
  return (
    <div>
      <h2 style={{ fontFamily: "Plus Jakarta Sans", marginTop: 0 }}>Mesa de Hoje</h2>
      <p style={{ color: "var(--muted)", maxWidth: 520 }}>Escolha os criterios e deixe a Ludoteca sugerir os jogos da sua colecao.</p>
      <div className="mesa-grid">
        <div className="ludo-card">
          <strong>Numero de jogadores</strong>
          {renderChipGroup(PLAYER_OPTIONS, "players")}
          <strong style={{ marginTop: 18 }}>Tempo disponivel</strong>
          {renderChipGroup(TIME_OPTIONS, "time")}
          <strong style={{ marginTop: 18 }}>Complexidade</strong>
          {renderChipGroup(WEIGHT_OPTIONS, "weight")}
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={handleSuggest}>Sugerir jogos</button>
        </div>
        <div className="mesa-result">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles color="#59A5FF" />
            <strong>Sugestoes</strong>
          </div>
          <div style={{ marginTop: 20 }}>
            {suggestions.map((game) => (
              <div key={game.id} className="result-card">
                <strong>{game.title}</strong>
                <p style={{ margin: "6px 0", color: "var(--muted)" }}>{game.players} jogadores  -  {game.time}  -  {game.weight}</p>
                <button className="btn btn-outline" style={{ width: "100%" }}>Ver no catalogo</button>
              </div>
            ))}
          </div>
          <button className="btn btn-outline" style={{ width: "100%", marginTop: 12 }} onClick={copyList}>
            <Copy size={16} /> Copiar lista para compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};
const PartidasPage = () => (
  <div className="placeholder-card">
    <h2 style={{ fontFamily: "Plus Jakarta Sans", marginTop: 0 }}>Registro de partidas</h2>
    <p style={{ color: "var(--muted)", maxWidth: 560, margin: "12px auto" }}>Em breve voce podera salvar resultados, historias e momentos das suas sessoes de jogo.</p>
    <div style={{ background: "#F2E9FF", borderRadius: 32, padding: 40, margin: "32px auto", maxWidth: 420 }}>
      <p style={{ margin: 0 }}>Nenhuma partida registrada ainda.</p>
    </div>
  </div>
);

const PerfilPage = () => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
      <div className="avatar-mini" style={{ width: 70, height: 70, fontSize: 24 }}>GS</div>
      <div>
        <h2 style={{ margin: "4px 0", fontFamily: "Plus Jakarta Sans" }}>Gabriel Silva</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>gabriel@ludoteca.app</p>
      </div>
    </div>
    <div className="profile-grid">
      <div className="profile-card">
        <h4>Dados da conta</h4>
        <p>Nome: Gabriel Silva</p>
        <p>Email: gabriel@ludoteca.app</p>
        <button className="btn btn-outline">Editar informacoes</button>
      </div>
      <div className="profile-card">
        <h4>Preferencias da Ludoteca</h4>
        <p>Complexidade padrao: Medio</p>
        <p>Idioma das regras: Portugues</p>
        <div className="switch-row">
          <span>Mostrar tempo de jogo</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="switch-row">
          <span>Mostrar notas pessoais</span>
          <input type="checkbox" />
        </div>
      </div>
      <div className="profile-card">
        <h4>Link publico</h4>
        <p style={{ display: "flex", alignItems: "center", gap: 8 }}><LinkIcon size={16} /> ludoteca.app/gabriel</p>
        <button className="btn btn-outline" style={{ width: "100%" }}>Copiar link</button>
        <div className="switch-row" style={{ marginTop: 16 }}>
          <span>Colecao publica</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
      <div className="profile-card">
        <h4>Notificacoes</h4>
        <div className="switch-row">
          <span>Email quando amigos acessarem</span>
          <input type="checkbox" />
        </div>
        <div className="switch-row">
          <span>Resumo mensal</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  </div>
);

const AppHeader = ({ activeTab, onChangeTab }) => (
  <header className="app-header">
    <div className="ludo-container header-inner">
      <LogoMark showWordmark size={34} />
      <div className="tab-group">
        {APP_TABS.map((tab) => (
          <button key={tab.key} className={`tab-pill ${activeTab === tab.key ? "active" : ""}`} onClick={() => onChangeTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="header-actions">
        <button className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Bell size={16} /> Ajuda
        </button>
        <div className="profile-chip">
          <div>
            <strong>Gabriel Silva</strong>
            <small>gabriel@ludoteca.app</small>
          </div>
          <div className="avatar-mini">GS</div>
        </div>
      </div>
    </div>
  </header>
);

const BottomNav = ({ activeTab, onChangeTab }) => (
  <div className="bottom-nav">
    {APP_TABS.map((tab) => (
      <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => onChangeTab(tab.key)}>
        <tab.icon size={18} />
        {tab.label}
      </button>
    ))}
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("colecao");
  const [games, setGames] = useState(SAMPLE_GAMES);
  const renderTab = () => {
    if (activeTab === "colecao") return <CollectionPage games={games} onAddGame={(game) => setGames((prev) => [game, ...prev])} />;
    if (activeTab === "mesa") return <MesaDeHojePage games={games} />;
    if (activeTab === "partidas") return <PartidasPage />;
    return <PerfilPage />;
  };
  return (
    <div className="dashboard-shell">
      <AppHeader activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className="ludo-container dashboard-content">{renderTab()}</div>
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="ludo-shell">
        <style>{globalStyles}</style>
        <Routes>
          <Route path="/" element={<Navigate to="/landingpage" replace />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/cadastro" element={<AuthPage mode="signup" />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/landingpage" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
