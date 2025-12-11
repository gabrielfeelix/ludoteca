import React, { useState, useMemo, forwardRef } from 'react';
import { Search, Filter, Play, Star, Clock, Users, Heart, MoreHorizontal, Dice5, Trophy, Crown, Sparkles, Hexagon, Ghost, Train, Map, ChevronLeft, Plus, Calendar, Medal, X, Share2, Camera, MapPin, RefreshCw, Zap, Skull, Brain, Smile, Settings, LogOut, TrendingUp, User, Bell, Moon, Shield, Download, ChevronRight, HelpCircle, FileText, Mail, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* --- 1. CONSTANTES E DADOS (ATOMS) --- */

const CATEGORIES = ["Todos", "Party", "EstratÃ©gia", "FamÃ­lia", "Abstrato"];

const FILTER_OPTIONS = {
    difficulty: ["Leve", "MÃ©dio", "Pesado"],
    time: ["RÃ¡pido (<30m)", "MÃ©dio (30-60m)", "Longo (>60m)"],
    vibes: ["Competitivo", "Cooperativo", "Rir", "Pensar"]
};

// Ãcones definidos como funÃ§Ãµes para evitar erro de objeto no render
const GAME_THEMES = {
  catan: {
    gradient: "from-[#FF9A9E] to-[#FECFEF]", 
    shadow: "shadow-pink-500/20",
    accent: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
    barColor: "bg-[#FF9A9E]",
    IconBig: (props) => <Hexagon {...props} />,
    IconSmall: (props) => <Hexagon {...props} />
  },
  dixit: {
    gradient: "from-[#a18cd1] to-[#fbc2eb]",
    shadow: "shadow-purple-500/20",
    accent: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    barColor: "bg-[#a18cd1]",
    IconBig: (props) => <Ghost {...props} />,
    IconSmall: (props) => <Ghost {...props} />
  },
  azul: {
    gradient: "from-[#4FACFE] to-[#00F2FE]",
    shadow: "shadow-cyan-500/20",
    accent: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    barColor: "bg-[#4FACFE]",
    IconBig: (props) => <Sparkles {...props} />,
    IconSmall: (props) => <Sparkles {...props} />
  },
  ttr: {
    gradient: "from-[#43e97b] to-[#38f9d7]",
    shadow: "shadow-emerald-500/20",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    barColor: "bg-[#43e97b]",
    IconBig: (props) => <Train {...props} />,
    IconSmall: (props) => <Train {...props} />
  },
  coup: {
    gradient: "from-[#667eea] to-[#764ba2]",
    shadow: "shadow-indigo-500/20",
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    barColor: "bg-[#667eea]",
    IconBig: (props) => <Crown {...props} />,
    IconSmall: (props) => <Crown {...props} />
  },
  mars: {
    gradient: "from-[#ff0844] to-[#ffb199]",
    shadow: "shadow-red-500/20",
    accent: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    barColor: "bg-[#ff0844]",
    IconBig: (props) => <Map {...props} />,
    IconSmall: (props) => <Map {...props} />
  }
};

const GAMES_DB = [
  { id: 1, title: "Catan", themeId: "catan", category: "EstratÃ©gia", players: "3-4", minP: 3, maxP: 4, time: "60-90m", timeVal: 60, rating: 4.8, difficulty: "MÃ©dio", vibes: ["Competitivo", "Pensar"], description: "Colete recursos, construa estradas e negocie como se nÃ£o houvesse amanhÃ£." },
  { id: 2, title: "Dixit", themeId: "dixit", category: "Party", players: "3-6", minP: 3, maxP: 6, time: "30m", timeVal: 30, rating: 4.9, difficulty: "Leve", vibes: ["Rir", "Criativo"], description: "Um jogo de narrativas onÃ­ricas onde uma imagem vale mais que mil palavras." },
  { id: 3, title: "Azul", themeId: "azul", category: "Abstrato", players: "2-4", minP: 2, maxP: 4, time: "45m", timeVal: 45, rating: 4.7, difficulty: "MÃ©dio", vibes: ["Pensar", "Competitivo"], description: "Seja um azulejista portuguÃªs e crie a parede mais bonita." },
  { id: 4, title: "Ticket to Ride", themeId: "ttr", category: "FamÃ­lia", players: "2-5", minP: 2, maxP: 5, time: "60m", timeVal: 60, rating: 4.6, difficulty: "Leve", vibes: ["Competitivo", "Pensar"], description: "Construa rotas de trem atravÃ©s da AmÃ©rica do Norte." },
  { id: 5, title: "Coup", themeId: "coup", category: "Party", players: "2-6", minP: 2, maxP: 6, time: "15m", timeVal: 15, rating: 4.5, difficulty: "Leve", vibes: ["Competitivo", "Rir", "Blefe"], description: "Blefe, suborno e manipulaÃ§Ã£o em um futuro distÃ³pico." },
  { id: 6, title: "Terraforming Mars", themeId: "mars", category: "EstratÃ©gia", players: "1-5", minP: 1, maxP: 5, time: "120m", timeVal: 120, rating: 4.9, difficulty: "Pesado", vibes: ["Pensar", "EstratÃ©gico"], description: "Lidere uma corporaÃ§Ã£o e compete para transformar Marte." }
];

const MATCH_HISTORY = [
    { id: 101, gameId: 1, date: "Ontem, 20:30", winner: "Gabriel", location: "Casa do Pedro", duration: "90m", scoreboard: [{ name: "Gabriel", score: 10, avatar: "GabrielUX" }, { name: "Pedro", score: 8, avatar: "Pedro" }, { name: "Ana", score: 6, avatar: "Ana" }], photo: "https://images.unsplash.com/photo-1610890716171-6b1c9f204038?q=80&w=1000&auto=format&fit=crop" },
    { id: 102, gameId: 3, date: "SÃ¡b, 15:00", winner: "Ana", location: "Luderia Central", duration: "45m", scoreboard: [{ name: "Ana", score: 85, avatar: "Ana" }, { name: "Gabriel", score: 72, avatar: "GabrielUX" }] },
    { id: 103, gameId: 5, date: "SÃ¡b, 14:00", winner: "Pedro", location: "Luderia Central", duration: "15m", scoreboard: [{ name: "Pedro", score: "Win", avatar: "Pedro" }, { name: "Gabriel", score: "Elim", avatar: "GabrielUX" }, { name: "Ana", score: "Elim", avatar: "Ana" }, { name: "Lucas", score: "Elim", avatar: "Lucas" }] }, 
    { id: 104, gameId: 6, date: "01 Out", winner: "Gabriel", location: "Minha Casa", duration: "130m", scoreboard: [{ name: "Gabriel", score: 120, avatar: "GabrielUX" }, { name: "Lucas", score: 98, avatar: "Lucas" }], photo: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1000&auto=format&fit=crop" },
];

/* --- 2. COMPONENTES VISUAIS (MOLECULES) --- */

const GameAsset = ({ type, themeId, title }) => {
  const theme = GAME_THEMES[themeId];
  if (!theme) return null;
  
  if (type === 'logo') {
    return (
      <div className={`w-full h-full bg-gradient-to-tr ${theme.gradient} flex flex-col items-center justify-center text-white p-4 relative overflow-hidden`}>
        <div className="absolute top-2 right-2 w-8 h-8 bg-white opacity-20 rounded-full blur-sm"></div>
        <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 bg-white opacity-10 rounded-full blur-md"></div>
        <div className="relative z-10 transform hover:scale-110 transition-transform duration-500 ease-out drop-shadow-xl">
            <theme.IconBig size={48} className="text-white drop-shadow-md" strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (type === 'box') {
    return (
      <div className="relative w-full h-full group perspective-1000">
         <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 rounded-[100%] blur-xl`}></div>
        <div className={`relative w-full h-full bg-gradient-to-tr ${theme.gradient} rounded-[32px] shadow-2xl flex flex-col items-center justify-center text-white p-6 border-4 border-white/20 z-10`}>
          <div className="absolute inset-0 bg-white/10 opacity-50 rounded-[28px]"></div>
          <div className="absolute top-4 left-4 right-4 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-[20px]"></div>
          <div className="transform scale-150 mb-3 drop-shadow-2xl z-20">
             <theme.IconBig size={64} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="font-black text-2xl uppercase tracking-wider text-center leading-none drop-shadow-md z-20 text-white/90">{title}</h2>
        </div>
      </div>
    );
  }
  return null;
};

const InfoIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

const SettingRow = ({ icon: Icon, label, value, type = "arrow", color = "text-slate-600" }) => (
    <div className="flex items-center justify-between p-4 hover:bg-blue-50 active:bg-blue-100 transition-colors cursor-pointer border-b border-slate-50 last:border-0 rounded-2xl mx-2 my-1">
        <div className="flex items-center gap-4"><div className={`p-2.5 rounded-full bg-white shadow-sm ${color}`}><Icon size={18} /></div><span className="text-sm font-bold text-slate-600">{label}</span></div>
        {type === "arrow" && <ChevronRight size={18} className="text-slate-300" />}
        {type === "toggle" && (<div className={`w-12 h-7 rounded-full flex items-center p-1 duration-300 ${value ? 'bg-[#4FACFE]' : 'bg-slate-200'}`}><div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${value ? 'translate-x-5' : ''}`}></div></div>)}
        {type === "value" && (<span className="text-xs font-bold text-slate-400">{value}</span>)}
    </div>
);

const SettingsSection = ({ title, children }) => (
    <div className="mb-8"><h3 className="px-6 text-xs font-black text-slate-300 uppercase tracking-widest mb-3">{title}</h3><div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden py-2">{children}</div></div>
);

const PillSelect = ({ options, selected, onSelect, multi = false }) => (
    <div className="flex flex-wrap gap-3">
        {options.map(opt => {
            const isActive = multi ? selected.includes(opt) : selected === opt;
            return (
                <button key={opt} onClick={() => onSelect(opt)} className={`px-5 py-3 rounded-full text-xs font-bold transition-all border-2 ${isActive ? 'bg-[#4FACFE] text-white border-[#4FACFE] shadow-lg shadow-blue-200 scale-105' : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:text-blue-400'}`}>{opt}</button>
            );
        })}
    </div>
);

const DNAProgressBar = ({ label, value, color, icon: Icon }) => (
    <div className="mb-5">
        <div className="flex justify-between items-center mb-2"><div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Icon size={16} className={color.replace('bg-', 'text-')} /> {label}</div><span className="text-xs font-black text-slate-400">{value}%</span></div>
        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full rounded-full ${color} shadow-lg`} /></div>
    </div>
);

const Badge = ({ icon: Icon, label, gradient }) => (
    <div className="flex flex-col items-center gap-3 min-w-[90px] group cursor-pointer">
        <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-tr ${gradient} flex items-center justify-center text-white shadow-xl shadow-slate-100 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 border-4 border-white`}><Icon size={28} strokeWidth={2.5} /></div>
        <span className="text-[10px] font-bold text-slate-400 text-center leading-tight group-hover:text-blue-500 transition-colors">{label}</span>
    </div>
);

const WinRateChart = ({ wins, total }) => {
    const percentage = Math.round((wins / total) * 100);
    const radius = 30; const circumference = 2 * Math.PI * radius; const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div><span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Win Rate</span><div className="flex items-baseline gap-1"><span className="text-4xl font-black text-slate-800 font-jakarta">{percentage}%</span><span className="text-xs font-bold text-slate-400">/ {total} jogos</span></div></div>
            <div className="relative w-20 h-20 flex items-center justify-center"><svg className="transform -rotate-90 w-full h-full"><circle cx="40" cy="40" r={radius} stroke="#F1F5F9" strokeWidth="8" fill="transparent" /><circle cx="40" cy="40" r={radius} stroke="#4FACFE" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" /></svg><Trophy size={18} className="text-[#4FACFE] absolute" /></div>
        </div>
    );
};

/* --- 3. COMPONENTES ESTRUTURAIS --- */

const Header = ({ title = "OlÃ¡, Gabriel ðŸ‘‹", showProfile = true }) => (
  <header className="flex justify-between items-center mb-8 px-2 mt-4">
      <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{showProfile ? "Let's Play!" : "Seu HistÃ³rico"}</p><h1 className="text-3xl font-black text-slate-800 font-jakarta tracking-tight">{title}</h1></div>
      {showProfile && (<div className="relative cursor-pointer hover:scale-105 transition-transform"><div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#4FACFE] to-[#00F2FE] p-[2px] shadow-lg shadow-blue-200"><div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielUX" alt="Profile" /></div></div></div>)}
  </header>
);

const SearchBar = ({ searchTerm, setSearchTerm, onOpenFilters, hasActiveFilters, placeholder = "Busque sua prÃ³xima aventura..." }) => (
  <div className="flex gap-3 mb-8">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none"><Search className="h-5 w-5 text-slate-300 group-focus-within:text-[#4FACFE] transition-colors" /></div>
        <input type="text" placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white rounded-[24px] shadow-sm text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:shadow-md transition-all font-bold text-sm" />
      </div>
      <button onClick={onOpenFilters} className={`w-14 rounded-[24px] flex items-center justify-center transition-all duration-300 shadow-sm ${hasActiveFilters ? 'bg-[#4FACFE] text-white shadow-blue-300 shadow-lg' : 'bg-white text-slate-300 hover:text-slate-500 hover:shadow-md'}`}><Filter size={20} className={hasActiveFilters ? 'fill-white' : ''} strokeWidth={2.5} /></button>
  </div>
);

const HeroSection = ({ onClick }) => {
  const game = GAMES_DB[0]; const theme = GAME_THEMES[game.themeId];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 relative" onClick={() => onClick(game)}>
      <div className="flex justify-between items-end mb-4 px-2"><h2 className="text-lg font-black text-slate-800 font-jakarta">Destaque da Semana</h2></div>
      <div className={`relative w-full h-[380px] rounded-[40px] shadow-2xl shadow-blue-200/50 overflow-hidden group cursor-pointer bg-gradient-to-bl ${theme.gradient}`}>
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-20 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-white opacity-10 rounded-full blur-[40px]"></div>
        <div className="absolute top-10 left-10 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-16">
            <motion.div whileHover={{ scale: 1.1, rotate: 3, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="mb-6 drop-shadow-2xl filter"><theme.IconBig size={80} className="text-white" strokeWidth={3} /></motion.div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight drop-shadow-md text-center leading-none transform -rotate-2">{game.title}</h1>
            <span className="mt-2 px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">Board Game</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6"><div className="bg-white/90 backdrop-blur-xl p-4 rounded-[28px] shadow-lg flex justify-between items-center"><div className="pl-2"><span className="text-[#FF9A9E] text-[10px] font-black tracking-wider uppercase mb-1 block">{game.category}</span><div className="flex items-center gap-3 text-slate-600 font-bold text-xs"><div className="flex items-center gap-1"><Users size={14} className="text-slate-400" /> {game.players}</div><div className="flex items-center gap-1"><Clock size={14} className="text-slate-400" /> {game.time}</div></div></div><button className="w-12 h-12 bg-gradient-to-tr from-[#4FACFE] to-[#00F2FE] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-300 hover:scale-110 transition-transform active:scale-95"><Play fill="currentColor" size={20} className="ml-1" /></button></div></div>
      </div>
    </motion.div>
  );
};

const CategoryPills = ({ activeCategory, setActiveCategory, className = "-mx-6 px-6" }) => (
  <div className={`flex gap-3 overflow-x-auto pb-8 scrollbar-hide ${className}`}>{CATEGORIES.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-[#4FACFE] text-white shadow-lg shadow-blue-200 scale-105' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>{cat}</button>))}</div>
);

const GameCard = forwardRef(({ game, onClick, isFavorite, toggleFavorite }, ref) => {
  const theme = GAME_THEMES[game.themeId];
  return (
    <motion.div ref={ref} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -8 }} className="bg-white p-2 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 cursor-pointer group h-full flex flex-col relative" onClick={() => onClick(game)}>
        <button className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id); }}><Heart size={16} className={`transition-colors ${isFavorite ? 'fill-[#FF9A9E] text-[#FF9A9E]' : 'text-slate-300'}`} strokeWidth={3} /></button>
      <div className={`relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-3 bg-gradient-to-br ${theme.gradient}`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"><theme.IconBig size={48} className="text-white" strokeWidth={3} /></div>
      </div>
      <div className="px-3 pb-3 flex-grow flex flex-col justify-between"><h4 className="font-bold text-slate-700 font-jakarta text-md leading-tight mb-2 line-clamp-1">{game.title}</h4><div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider"><span className='flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg'><Users size={12}/> {game.players}</span><div className="flex items-center gap-1 text-yellow-500"><Star size={12} className="fill-yellow-400" strokeWidth={0}/> {game.rating}</div></div></div>
    </motion.div>
  );
});
GameCard.displayName = "GameCard";

const MatchCard = forwardRef(({ match, onClick }, ref) => {
    const game = GAMES_DB.find(g => g.id === match.gameId);
    const theme = GAME_THEMES[game.themeId];
    const isWinner = match.winner === "Gabriel"; 
    const myScore = match.scoreboard.find(p => p.name === "Gabriel")?.score;
    return (
        <motion.div ref={ref} layout onClick={() => onClick(match)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-white rounded-[28px] p-2 shadow-sm border border-transparent hover:border-blue-100 mb-4 overflow-hidden relative group cursor-pointer hover:shadow-lg hover:shadow-blue-50 transition-all duration-300`}>
            <div className="flex items-center gap-4">
                <div className={`w-20 h-24 rounded-[20px] bg-gradient-to-br ${theme.gradient} flex items-center justify-center shrink-0 shadow-inner`}><div className="scale-50 text-white drop-shadow-md"><theme.IconBig size={40} strokeWidth={3} /></div></div>
                <div className="flex-1 py-2 pr-2">
                    <div className="flex justify-between items-start mb-2"><div><h3 className="font-black text-slate-800 font-jakarta text-lg leading-none mb-1">{game.title}</h3><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><Calendar size={10} /> {match.date.split(',')[0]} â€¢ {match.duration}</span></div>{isWinner ? (<div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shadow-sm"><Crown size={16} fill="currentColor" /></div>) : (<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300"><Medal size={16} /></div>)}</div>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2"><div className="flex -space-x-2 pl-1">{match.scoreboard.map((p, idx) => (<div key={idx} className={`w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden ${p.name === match.winner ? 'z-10 ring-2 ring-yellow-400' : 'z-0'}`}><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.avatar}`} alt={p.name} /></div>))}</div>{myScore && <span className={`text-xs font-black ${isWinner ? 'text-green-500' : 'text-slate-400'}`}>{isWinner ? '+' : ''}{myScore} pts</span>}</div>
                </div>
            </div>
        </motion.div>
    );
});
MatchCard.displayName = "MatchCard";

const StatsHeader = () => (
    <div className="grid grid-cols-3 gap-3 mb-8 px-1"><div className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-50 flex flex-col items-center hover:shadow-md transition-shadow"><span className="text-3xl font-black text-slate-800 font-jakarta mb-1">24</span><span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 text-center">Partidas</span></div><div className="bg-gradient-to-b from-[#ff9a9e] to-[#fecfef] p-4 rounded-[28px] shadow-lg shadow-pink-200 flex flex-col items-center relative overflow-hidden text-white transform scale-105"><span className="text-3xl font-black font-jakarta mb-1 flex items-center gap-1">12 <Crown size={18} fill="white" /></span><span className="text-[9px] uppercase tracking-widest font-bold text-white/90 text-center">VitÃ³rias</span></div><div className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-50 flex flex-col items-center hover:shadow-md transition-shadow"><span className="text-3xl font-black text-slate-800 font-jakarta mb-1">48h</span><span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 text-center">Jogado</span></div></div>
);

// --- 4. OVERLAYS E TELAS COMPLEMENTARES ---

const DetailOverlay = forwardRef(({ game, onClose, isFavorite, toggleFavorite }, ref) => {
    if (!game) return null;
    const theme = GAME_THEMES[game.themeId];
    return (
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto rounded-t-[40px] sm:rounded-[40px] relative overflow-y-auto no-scrollbar flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className={`relative h-64 bg-gradient-to-bl ${theme.gradient} rounded-t-[40px] flex flex-col items-center justify-center p-6 shrink-0`}>
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20"><button onClick={onClose} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"><ChevronLeft size={20} /></button><button onClick={() => toggleFavorite(game.id)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"><Heart size={20} className={isFavorite ? 'fill-white' : ''} /></button></div>
                    <div className="relative z-10 transform scale-150 drop-shadow-2xl mb-4"><theme.IconBig size={64} className="text-white" strokeWidth={3} /></div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight text-center leading-none drop-shadow-md z-10">{game.title}</h2>
                    <div className="mt-4 flex gap-2 z-10"><span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider">{game.category}</span><span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider">{game.difficulty}</span></div>
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-[40px]"></div>
                </div>
                <div className="px-8 -mt-6 relative z-10 pb-28">
                    <div className="grid grid-cols-3 gap-4 mb-8"><div className="bg-slate-50 p-4 rounded-[24px] flex flex-col items-center justify-center border border-slate-100 shadow-sm"><Users className="text-slate-400 mb-2" size={20} /><span className="font-black text-slate-800 text-lg">{game.players}</span><span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Players</span></div><div className="bg-slate-50 p-4 rounded-[24px] flex flex-col items-center justify-center border border-slate-100 shadow-sm"><Clock className="text-slate-400 mb-2" size={20} /><span className="font-black text-slate-800 text-lg">{game.time}</span><span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Tempo</span></div><div className="bg-slate-50 p-4 rounded-[24px] flex flex-col items-center justify-center border border-slate-100 shadow-sm"><Star className="text-yellow-400 fill-yellow-400 mb-2" size={20} /><span className="font-black text-slate-800 text-lg">{game.rating}</span><span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Nota</span></div></div>
                    <div className="mb-8"><h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3">Sobre o jogo</h3><p className="text-slate-500 text-sm leading-relaxed font-medium bg-slate-50 p-5 rounded-[24px]">{game.description}</p></div>
                </div>
                <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-lg p-6 border-t border-slate-50 flex gap-4 z-30"><button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-[20px] font-bold text-sm hover:bg-slate-200 transition-colors">Manual PDF</button><button className={`flex-[2] bg-gradient-to-r ${theme.gradient} text-white py-4 rounded-[20px] font-bold text-sm shadow-xl shadow-blue-200 hover:scale-105 transition-transform flex items-center justify-center gap-2`}><Play fill="white" size={18} /> VÃ­deo Tutorial</button></div>
            </motion.div>
        </motion.div>
    );
});
DetailOverlay.displayName = "DetailOverlay";

const MatchDetailOverlay = forwardRef(({ match, onClose }, ref) => {
    if (!match) return null;
    const game = GAMES_DB.find(g => g.id === match.gameId);
    const theme = GAME_THEMES[game.themeId];
    const sortedScores = [...match.scoreboard].sort((a, b) => { if (typeof a.score === 'number' && typeof b.score === 'number') return b.score - a.score; return 0; });
    const winner = sortedScores[0];
    const maxScore = typeof winner.score === 'number' ? winner.score : 1;
    return (
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-[#F8F9FC] w-full sm:max-w-md h-[95vh] sm:h-auto rounded-t-[40px] sm:rounded-[40px] relative overflow-y-auto no-scrollbar flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className={`relative h-48 bg-gradient-to-bl ${theme.gradient} rounded-t-[40px] flex items-center justify-center overflow-hidden shrink-0`}><div className="absolute inset-0 bg-white/10 opacity-30 blur-3xl"></div><button onClick={onClose} className="absolute top-6 right-6 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 backdrop-blur-md z-20"><X size={20} strokeWidth={3} /></button><div className="text-center z-10 mt-6"><div className="opacity-90 scale-90 mb-2 flex justify-center drop-shadow-xl"><theme.IconSmall size={40} /></div><h2 className="text-3xl font-black text-white uppercase tracking-tight drop-shadow-md">{game.title}</h2><span className="text-[10px] text-white/90 font-bold tracking-[0.2em] uppercase bg-white/20 px-3 py-1 rounded-full mt-2 inline-block">RelatÃ³rio de Batalha</span></div><div className="absolute bottom-0 left-0 w-full h-12 bg-[#F8F9FC] rounded-t-[40px]"></div></div>
                <div className="px-6 -mt-10 relative z-10 pb-28">
                    <div className="bg-white rounded-[32px] shadow-xl shadow-blue-100 p-6 flex flex-col items-center mb-8 relative overflow-visible"><div className="absolute -top-10"><div className="w-24 h-24 rounded-full p-1.5 bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-lg"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.avatar}`} alt={winner.name} className="w-full h-full rounded-full bg-white border-4 border-white" /></div><div className="absolute -top-4 left-1/2 -translate-x-1/2"><Crown size={32} className="text-yellow-400 drop-shadow-sm fill-yellow-400" /></div></div><div className="mt-12 text-center"><h3 className="text-2xl font-black text-slate-800 font-jakarta">{winner.name}</h3><div className="mt-2 bg-yellow-50 text-yellow-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">MVP da Partida</div></div></div>
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 mb-6"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Trophy size={14} /> Placar Final</h4><div className="space-y-5">{sortedScores.map((player, idx) => { const isNumber = typeof player.score === 'number'; const percentage = isNumber ? (player.score / maxScore) * 100 : 100; return (<div key={idx} className="flex items-center gap-4"><div className={`w-6 text-center font-black ${idx === 0 ? 'text-yellow-500 text-lg' : 'text-slate-300 text-xs'}`}>#{idx + 1}</div><div className="flex-1"><div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5"><span>{player.name}</span><span className="font-black">{player.score}</span></div><div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} className={`h-full rounded-full ${idx === 0 ? theme.barColor : 'bg-slate-300'} shadow-sm`} /></div></div></div>); })}</div></div>
                    <div className="grid grid-cols-2 gap-4 mb-6"><div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-3"><div className="bg-blue-50 p-2.5 rounded-full text-blue-400"><MapPin size={18} /></div><div><span className="block text-[9px] text-slate-400 font-black uppercase tracking-wider">Local</span><span className="text-xs font-bold text-slate-700">{match.location || "Em Casa"}</span></div></div><div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-3"><div className="bg-purple-50 p-2.5 rounded-full text-purple-400"><Clock size={18} /></div><div><span className="block text-[9px] text-slate-400 font-black uppercase tracking-wider">DuraÃ§Ã£o</span><span className="text-xs font-bold text-slate-700">{match.duration}</span></div></div></div>
                    {match.photo ? (<div className="bg-white p-4 rounded-[32px] shadow-sm mb-20"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2 flex items-center gap-2"><Camera size={14} /> Registro</h4><div className="rounded-[24px] overflow-hidden aspect-video relative group shadow-md"><img src={match.photo} alt="Match Memory" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div></div></div>) : (<div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-8 flex flex-col items-center justify-center text-slate-300 gap-2 mb-20"><Camera size={32} /><span className="text-xs font-bold">Sem foto</span></div>)}
                </div>
                <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-lg p-6 border-t border-slate-50 flex gap-4 z-30 rounded-t-[32px]"><button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-[20px] font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><Share2 size={18} /> Compartilhar</button><button className="flex-[2] bg-slate-900 text-white py-4 rounded-[20px] font-bold text-sm shadow-xl shadow-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"><RefreshCw size={18} /> Revanche</button></div>
            </motion.div>
        </motion.div>
    );
});
MatchDetailOverlay.displayName = "MatchDetailOverlay";

const SettingsView = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex justify-center pointer-events-none">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="w-full max-w-md bg-[#F4F6F9] h-full overflow-y-auto shadow-2xl pointer-events-auto relative">
                <div className="sticky top-0 bg-[#F4F6F9]/80 backdrop-blur-md z-10 px-6 py-4 flex items-center justify-between"><button onClick={onClose} className="p-3 -ml-2 bg-white rounded-full text-slate-600 shadow-sm hover:scale-105 transition-transform"><ChevronLeft size={20} strokeWidth={3} /></button><h2 className="text-lg font-black text-slate-800 font-jakarta">ConfiguraÃ§Ãµes</h2><div className="w-10"></div></div>
                <div className="p-6 pb-24">
                    <div className="flex items-center gap-5 mb-10 bg-white p-6 rounded-[32px] shadow-sm shadow-blue-100/50"><div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 p-1"><div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielUX" alt="Gabriel" className="w-full h-full" /></div></div><div><h3 className="font-black text-slate-800 text-2xl font-jakarta">Gabriel</h3><span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-wide">Plano Free</span></div></div>
                    <SettingsSection title="Geral"><SettingRow icon={User} label="Editar Perfil" color="text-blue-500" /><SettingRow icon={Bell} label="NotificaÃ§Ãµes" type="toggle" value={true} color="text-orange-500" /><SettingRow icon={Moon} label="Modo Escuro" type="toggle" value={false} color="text-purple-500" /><SettingRow icon={Shield} label="Privacidade" color="text-emerald-500" /></SettingsSection>
                    <SettingsSection title="Dados"><SettingRow icon={Download} label="Importar do Ludopedia" color="text-indigo-500" /><SettingRow icon={FileText} label="Exportar CSV" color="text-slate-500" /></SettingsSection>
                    <button className="w-full py-5 text-red-500 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-[24px] flex items-center justify-center gap-2 transition-colors mt-8"><LogOut size={18} /> Sair da conta</button>
                </div>
            </motion.div>
        </div>
    );
};

const FilterOverlay = ({ filters, setFilters, onClose, onReset }) => {
    const handleDifficulty = (val) => setFilters(prev => ({ ...prev, difficulty: prev.difficulty === val ? null : val }));
    const handleTime = (val) => setFilters(prev => ({ ...prev, time: prev.time === val ? null : val }));
    const handlePlayers = (val) => setFilters(prev => ({ ...prev, players: val }));
    const handleVibe = (val) => { setFilters(prev => { const newVibes = prev.vibes.includes(val) ? prev.vibes.filter(v => v !== val) : [...prev.vibes, val]; return { ...prev, vibes: newVibes }; }); };

    return (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed inset-0 z-[70] flex items-end justify-center pointer-events-none">
            <div className="bg-white w-full max-w-md h-[90vh] rounded-t-[40px] shadow-2xl pointer-events-auto flex flex-col">
                <div className="flex justify-between items-center p-8 border-b border-slate-50"><h2 className="text-2xl font-black text-slate-800 font-jakarta flex items-center gap-2"><Filter size={24} className="text-[#4FACFE]" /> Filtros</h2><button onClick={onReset} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors bg-slate-50 px-3 py-2 rounded-full"><RotateCcw size={12} /> Limpar</button></div>
                <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    <div><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Users size={14} /> NÃºmero de Jogadores</h3><div className="bg-slate-50 p-2 rounded-[24px] flex justify-between items-center">{[1, 2, 3, 4, 5, 6, 7, 8].map(num => (<button key={num} onClick={() => handlePlayers(filters.players === num ? null : num)} className={`w-10 h-12 rounded-[18px] text-sm font-bold flex items-center justify-center transition-all ${filters.players === num ? 'bg-[#4FACFE] text-white shadow-lg shadow-blue-200 scale-110' : 'text-slate-400 hover:bg-white hover:shadow-sm'}`}>{num}</button>))}</div></div>
                    <div><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Brain size={14} /> Complexidade</h3><PillSelect options={FILTER_OPTIONS.difficulty} selected={filters.difficulty} onSelect={handleDifficulty} /></div>
                    <div><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> Tempo de Jogo</h3><PillSelect options={FILTER_OPTIONS.time} selected={filters.time} onSelect={handleTime} /></div>
                    <div><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14} /> Vibe da Mesa</h3><PillSelect options={FILTER_OPTIONS.vibes} selected={filters.vibes} onSelect={handleVibe} multi={true} /></div>
                </div>
                <div className="p-8 border-t border-slate-50 bg-white"><button onClick={onClose} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"><Check size={22} /> Ver Resultados</button></div>
            </div>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md -z-10" onClick={onClose}></div>
        </motion.div>
    );
};

const ProfileView = ({ onOpenSettings }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
            <div className="flex flex-col items-center pt-12 pb-10 px-6 bg-white rounded-b-[50px] shadow-sm shadow-blue-100 mb-8 relative overflow-hidden"><div className="absolute top-0 w-full h-48 bg-gradient-to-b from-[#4FACFE]/20 to-white -z-10"></div><button onClick={onOpenSettings} className="absolute top-6 right-6 p-3 bg-white rounded-full text-slate-400 shadow-sm hover:text-[#4FACFE] transition-colors z-20"><Settings size={22} /></button><div className="relative mb-6"><div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#4FACFE] to-[#00F2FE] shadow-2xl shadow-blue-200"><div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielUX" alt="Gabriel" className="w-full h-full" /></div></div><div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-4 border-white shadow-lg whitespace-nowrap">NÃ­vel 12 â€¢ Estrategista</div></div><h2 className="text-3xl font-black text-slate-800 font-jakarta mb-1">Gabriel</h2><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">MaringÃ¡, PR ðŸ‡§ðŸ‡·</p><div className="flex gap-10 mt-8"><div className="text-center"><span className="block text-2xl font-black text-slate-800">42</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Jogos</span></div><div className="text-center relative"><div className="w-[2px] h-full bg-slate-100 absolute -left-5 top-0 rounded-full"></div><span className="block text-2xl font-black text-slate-800">128</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Partidas</span><div className="w-[2px] h-full bg-slate-100 absolute -right-5 top-0 rounded-full"></div></div><div className="text-center"><span className="block text-2xl font-black text-slate-800">15</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Amigos</span></div></div></div>
            <div className="px-6 space-y-8"><div className="grid grid-cols-1 gap-6"><WinRateChart wins={12} total={24} /></div><div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50"><h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2"><Brain size={16} /> DNA do Jogador</h3><DNAProgressBar label="EstratÃ©gia (Euro)" value={85} color="bg-[#4FACFE]" icon={Map} /><DNAProgressBar label="Sorte & Caos (Party)" value={40} color="bg-[#FF9A9E]" icon={Dice5} /><DNAProgressBar label="Diplomacia & Blefe" value={65} color="bg-[#a18cd1]" icon={Smile} /><DNAProgressBar label="Conflito (War Game)" value={30} color="bg-[#ff0844]" icon={Skull} /></div><div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[32px] shadow-2xl shadow-slate-300 text-white relative overflow-hidden group cursor-pointer"><div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 rotate-12"><Ghost size={140} /></div><div className="relative z-10"><div className="flex justify-between items-start mb-6"><div><h3 className="text-xl font-black font-jakarta mb-1 flex items-center gap-2">Estante da Vergonha</h3><p className="text-xs font-bold text-slate-400">Jogos comprados e nunca jogados.</p></div><span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/30">3</span></div><div className="flex gap-4">{[1, 2, 3].map((_, i) => (<div key={i} className="w-14 h-20 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm"><div className="w-8 h-12 bg-white/20 rounded-lg"></div></div>))}<div className="flex items-center justify-center w-14 h-20 text-xs font-bold text-slate-500 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">+</div></div></div></div><div><h3 className="px-2 text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Conquistas Recentes</h3><div className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide"><Badge icon={Crown} label="Rei da Mesa" gradient="from-[#ff9a9e] to-[#fecfef]" /><Badge icon={Zap} label="RÃ¡pido" gradient="from-[#4FACFE] to-[#00F2FE]" /><Badge icon={Users} label="AnfitriÃ£o" gradient="from-[#43e97b] to-[#38f9d7]" /><Badge icon={TrendingUp} label="Viciado" gradient="from-[#a18cd1] to-[#fbc2eb]" /></div></div></div>
        </motion.div>
    );
};

const DesktopQuickAction = ({ icon: Icon, label, description, onClick, gradient = "from-[#4FACFE] to-[#00F2FE]" }) => (
    <button onClick={onClick} className={`w-full bg-gradient-to-r ${gradient} rounded-[24px] p-4 flex items-center gap-4 text-left text-white shadow-lg shadow-blue-200/20 hover:shadow-2xl transition-all hover:translate-x-1`}>
        <div className="bg-white/25 rounded-2xl p-3"><Icon size={18} strokeWidth={2.5} /></div>
        <div className="flex-1">
            <p className="text-sm font-black font-jakarta leading-tight">{label}</p>
            {description && <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{description}</span>}
        </div>
        <ChevronRight size={18} className="opacity-70" />
    </button>
);

const DesktopMatchPreview = ({ match, onClick }) => {
    const game = GAMES_DB.find((g) => g.id === match.gameId);
    const theme = GAME_THEMES[game.themeId];
    return (
        <button onClick={() => onClick(match)} className="w-full flex items-center gap-4 p-4 rounded-[24px] border border-slate-100 bg-white shadow-sm hover:border-[#4FACFE]/40 hover:shadow-lg transition-all text-left">
            <div className={`w-14 h-14 rounded-[18px] bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shrink-0`}>
                <theme.IconSmall size={24} />
            </div>
            <div className="flex-1">
                <p className="font-black text-slate-800 leading-tight">{game.title}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{match.date} â€¢ {match.duration}</span>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-black uppercase tracking-widest"><Crown size={12} /> Winner</div>
                <p className="text-sm font-black text-slate-800">{match.winner}</p>
            </div>
        </button>
    );
};

const DesktopNavbar = ({ activeTab, setActiveTab, onOpenFilters, onOpenSettings }) => {
    const navItems = [
        { id: "home", label: "Inicio", icon: Sparkles },
        { id: "favorites", label: "Favoritos", icon: Heart },
        { id: "matches", label: "Partidas", icon: Trophy },
        { id: "profile", label: "Perfil", icon: User },
    ];

    return (
        <div className="sticky top-0 z-30 backdrop-blur-2xl bg-white/70 border-b border-white/50 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4FACFE] to-[#00F2FE] flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Dice5 size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">Ludoteca</p>
                        <h1 className="text-xl font-black text-slate-800 font-jakarta leading-tight">Hub Pro</h1>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-white/70 rounded-full p-1 shadow-inner shadow-blue-50 border border-slate-100">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                    isActive
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-300/40"
                                        : "text-slate-400 hover:text-slate-700"
                                }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab("matches")}
                        className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-400/30 hover:-translate-y-0.5 transition-transform"
                    >
                        <Play size={16} fill="white" /> Registrar partida
                    </button>
                    <button
                        onClick={onOpenFilters}
                        className="px-4 py-2 rounded-full bg-white text-slate-600 border border-slate-100 shadow-sm hover:border-[#4FACFE]/50 hover:text-[#4FACFE]"
                    >
                        Filtros
                    </button>
                    <button
                        onClick={onOpenSettings}
                        className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 text-white flex items-center justify-center shadow-lg shadow-slate-400/40"
                    >
                        <Settings size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DesktopLayout = ({
    searchTerm,
    setSearchTerm,
    hasActiveFilters,
    setShowFilters,
    filteredGames,
    favorites,
    toggleFavorite,
    setSelectedGame,
    activeCategory,
    setActiveCategory,
    handleResetFilters,
    setSelectedMatch,
    onOpenSettings,
    activeTab,
    setActiveTab
}) => {
    const collectionTitle =
        activeTab === "favorites"
            ? "Favoritos na prateleira"
            : hasActiveFilters
            ? "Resultados filtrados"
            : "Minha colecao";

    return (
        <div className="hidden lg:flex w-full">
            <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-50 relative">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#4FACFE_0,_transparent_35%)]"></div>
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_40%,_#00F2FE_0,_transparent_25%)]"></div>
                <div className="relative z-10">
                    <DesktopNavbar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onOpenFilters={() => setShowFilters(true)}
                        onOpenSettings={onOpenSettings}
                    />

                    <div className="max-w-7xl mx-auto px-12 py-12 space-y-10">
                        <div className="grid grid-cols-3 gap-4 text-white">
                            <div className="col-span-2 bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] rounded-[32px] p-8 shadow-2xl shadow-blue-500/20 flex items-center justify-between overflow-hidden relative">
                                <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-white/20 rounded-full blur-3xl"></div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.28em] text-white/80">Painel</span>
                                    <h2 className="text-3xl font-black font-jakarta leading-tight">Sua ludoteca com cara de site</h2>
                                    <p className="text-sm text-white/80 max-w-xl">Abas no topo, grid modular e cards largos para partidas. Explore cada sessao sem poluir a tela.</p>
                                </div>
                                <div className="relative z-10 hidden xl:flex items-center gap-3 bg-white/15 border border-white/30 rounded-full px-4 py-3 text-sm font-bold backdrop-blur-md">
                                    <Sparkles size={18} /> Nova navegacao
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-[32px] p-6 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                                <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-white/70 mb-3">Hoje</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-black font-jakarta">Status da colecao</span>
                                    <ChevronRight size={16} className="text-white/70" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm font-bold"><span className="text-white/80">Jogos catalogados</span><span>42</span></div>
                                    <div className="flex items-center justify-between text-sm font-bold"><span className="text-white/80">Favoritos</span><span>12</span></div>
                                    <div className="flex items-center justify-between text-sm font-bold"><span className="text-white/80">Partidas</span><span>128</span></div>
                                </div>
                            </div>
                        </div>

                        {(activeTab === "home" || activeTab === "favorites") && (
                            <div className="grid grid-cols-[280px_minmax(0,1fr)_320px] gap-10">
                                <div className="space-y-8">
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/40 border border-white/60">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full p-1.5 bg-gradient-to-tr from-[#4FACFE] to-[#00F2FE] shadow-lg shadow-blue-200">
                                                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielUX" alt="Gabriel" className="w-full h-full" /></div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 font-jakarta">Gabriel</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> MaringÇ­, PR</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            {[{ label: "Jogos", value: 42 }, { label: "Partidas", value: 128 }, { label: "VitÇürias", value: 24 }].map((stat) => (
                                                <div key={stat.label} className="bg-slate-50 rounded-[20px] p-3 text-center border border-white">
                                                    <span className="block text-2xl font-black text-slate-800">{stat.value}</span>
                                                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={onOpenSettings} className="w-full mt-6 py-4 rounded-[20px] font-bold text-sm bg-slate-900 text-white shadow-lg shadow-slate-400/20 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                            <Settings size={18} /> Gerenciar Perfil
                                        </button>
                                    </div>
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-lg shadow-blue-100/40 space-y-4 border border-white/60">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Atalhos RÇ­pidos</h3>
                                            <InfoIcon className="text-slate-300" size={16} />
                                        </div>
                                        <div className="space-y-3">
                                            <DesktopQuickAction icon={Filter} label="Filtros avanÇõados" description="Refine sua busca" onClick={() => setShowFilters(true)} />
                                            <DesktopQuickAction icon={Plus} label="Relembrar Ç§ltima partida" description="Ticket to Ride" gradient="from-[#ff9a9e] to-[#fecfef]" onClick={() => setSelectedMatch(MATCH_HISTORY[0])} />
                                            <DesktopQuickAction icon={Settings} label="PreferÇ¦ncias e conta" description="NotificaÇõÇæes e plano" gradient="from-[#a18cd1] to-[#fbc2eb]" onClick={onOpenSettings} />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-6 text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-black font-jakarta flex items-center gap-2">Estante da Vergonha <Ghost size={22} /></h3>
                                                <span className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-red-500/30">3</span>
                                            </div>
                                            <p className="text-sm text-white/70 mb-6">Jogos comprados e esperando a vez na mesa. Bora marcar?</p>
                                            <div className="grid grid-cols-3 gap-3">{[1, 2, 3].map((item) => (<div key={item} className="h-24 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center"><Sparkles size={30} className="text-white/40" /></div>))}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Coleção</p>
                                            <h1 className="text-4xl font-black text-white font-jakarta">Explore e filtre</h1>
                                        </div>
                                        <button onClick={() => setShowFilters(true)} className="hidden xl:flex items-center gap-2 px-4 py-3 rounded-full border border-white/40 text-sm font-bold text-white/80 hover:border-white hover:text-white transition-colors bg-white/10 backdrop-blur-md">
                                            <Filter size={18} /> Filtros
                                        </button>
                                    </div>
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenFilters={() => setShowFilters(true)} hasActiveFilters={hasActiveFilters} placeholder="Busque por tÇðtulo, vibe ou nÇ§mero de jogadores..." />
                                        {activeTab === "home" && <HeroSection onClick={setSelectedGame} />}
                                        <div className="flex items-center justify-between mb-6 px-2">
                                            <div>
                                                <h2 className="text-2xl font-black font-jakarta text-slate-800">{collectionTitle}</h2>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredGames.length} jogos mapeados</p>
                                            </div>
                                            {hasActiveFilters && (
                                                <button onClick={handleResetFilters} className="text-xs font-black text-[#4FACFE] uppercase tracking-widest hover:underline">
                                                    Limpar filtros
                                                </button>
                                            )}
                                        </div>
                                        <CategoryPills activeCategory={activeCategory} setActiveCategory={setActiveCategory} className="px-1" />
                                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                                            <AnimatePresence mode="popLayout">
                                                {filteredGames.map((game) => (
                                                    <GameCard key={game.id} game={game} onClick={setSelectedGame} isFavorite={favorites.has(game.id)} toggleFavorite={toggleFavorite} />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                        {filteredGames.length === 0 && (
                                            <div className="text-center py-16 text-slate-400 font-bold">
                                                Nenhum jogo encontrado. <button onClick={handleResetFilters} className="text-[#4FACFE] underline ml-2">Limpar filtros</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <WinRateChart wins={12} total={24} />
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Conquistas Recentes</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Badge icon={Crown} label="Rei da Mesa" gradient="from-[#ff9a9e] to-[#fecfef]" />
                                            <Badge icon={Zap} label="RelÇ½mpago" gradient="from-[#4FACFE] to-[#00F2FE]" />
                                            <Badge icon={Users} label="AnfitriÇœo" gradient="from-[#43e97b] to-[#38f9d7]" />
                                            <Badge icon={TrendingUp} label="Evolucao" gradient="from-[#a18cd1] to-[#fbc2eb]" />
                                        </div>
                                    </div>
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-xl font-black text-slate-800 font-jakarta">Ultimas Partidas</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atualizado automaticamente</p>
                                            </div>
                                            <button onClick={() => setSelectedMatch(MATCH_HISTORY[0])} className="text-xs font-bold text-[#4FACFE] uppercase tracking-widest">Detalhar</button>
                                        </div>
                                        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
                                            {MATCH_HISTORY.map((match) => (
                                                <DesktopMatchPreview key={match.id} match={match} onClick={setSelectedMatch} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "matches" && (
                            <div className="grid grid-cols-[300px_minmax(0,1fr)_340px] gap-10">
                                <div className="space-y-6">
                                    <StatsHeader />
                                    <div className="bg-white/90 rounded-[28px] p-6 shadow-lg border border-white/70">
                                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3">Acoes</h3>
                                        <div className="space-y-3">
                                            <DesktopQuickAction icon={Plus} label="Registrar Nova Partida" description="Log rapido" onClick={() => setSelectedMatch(MATCH_HISTORY[0])} />
                                            <DesktopQuickAction icon={Filter} label="Aplicar filtros" description="Data, jogo, players" gradient="from-[#ff9a9e] to-[#fecfef]" onClick={() => setShowFilters(true)} />
                                            <DesktopQuickAction icon={Settings} label="Preferencias" description="Alertas e notificacoes" gradient="from-[#a18cd1] to-[#fbc2eb]" onClick={onOpenSettings} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.28em]">Partidas</p>
                                                <h2 className="text-3xl font-black text-slate-900 font-jakarta">Diário recente</h2>
                                            </div>
                                            <button onClick={() => setShowFilters(true)} className="text-xs font-bold text-[#4FACFE] uppercase tracking-widest">Filtros</button>
                                        </div>
                                        <div className="space-y-3">
                                            {MATCH_HISTORY.map((match) => (
                                                <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <WinRateChart wins={12} total={24} />
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Relampago</h3>
                                        <div className="flex flex-col gap-3">
                                            {MATCH_HISTORY.slice(0, 3).map((match) => (
                                                <DesktopMatchPreview key={match.id} match={match} onClick={setSelectedMatch} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-8">
                                <div className="bg-white/90 rounded-[32px] p-8 shadow-xl shadow-blue-100/50 border border-white/60">
                                    <ProfileView onOpenSettings={onOpenSettings} />
                                </div>
                                <div className="space-y-6">
                                    <WinRateChart wins={12} total={24} />
                                    <div className="bg-white/90 rounded-[32px] p-6 shadow-xl shadow-blue-100/50 border border-white/60">
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Ultimas conquistas</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Badge icon={Crown} label="Rei da Mesa" gradient="from-[#ff9a9e] to-[#fecfef]" />
                                            <Badge icon={Zap} label="Relampago" gradient="from-[#4FACFE] to-[#00F2FE]" />
                                            <Badge icon={Users} label="AnfitriÇœo" gradient="from-[#43e97b] to-[#38f9d7]" />
                                            <Badge icon={TrendingUp} label="Viciado" gradient="from-[#a18cd1] to-[#fbc2eb]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- 5. COMPONENTE PRINCIPAL --- */

export default function LudotecaHomeV14() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ difficulty: null, players: null, time: null, vibes: [] });

  const toggleFavorite = (id) => { setFavorites(prev => { const newFavs = new Set(prev); if (newFavs.has(id)) { newFavs.delete(id); } else { newFavs.add(id); } return newFavs; }); };
  const handleResetFilters = () => setFilters({ difficulty: null, players: null, time: null, vibes: [] });
  const hasActiveFilters = useMemo(() => filters.difficulty || filters.players || filters.time || filters.vibes.length > 0, [filters]);

  const filteredGames = useMemo(() => {
    return GAMES_DB.filter(game => {
        if (activeTab === 'favorites' && !favorites.has(game.id)) return false;
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "Todos" || game.category === activeCategory;
        const matchesDifficulty = !filters.difficulty || game.difficulty === filters.difficulty;
        const matchesPlayers = !filters.players || (filters.players >= game.minP && filters.players <= game.maxP);
        let matchesTime = true;
        if (filters.time) {
            if (filters.time.includes("RÃ¡pido")) matchesTime = game.timeVal < 30;
            else if (filters.time.includes("MÃ©dio")) matchesTime = game.timeVal >= 30 && game.timeVal <= 60;
            else if (filters.time.includes("Longo")) matchesTime = game.timeVal > 60;
        }
        const matchesVibe = filters.vibes.length === 0 || filters.vibes.some(v => game.vibes?.includes(v));
        return matchesSearch && matchesCategory && matchesDifficulty && matchesPlayers && matchesTime && matchesVibe;
    });
  }, [activeCategory, searchTerm, activeTab, favorites, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white font-sans pb-24 text-slate-900 selection:bg-[#4FACFE] selection:text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap'); .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; } .font-inter { font-family: 'Inter', sans-serif; } .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      <div className="lg:hidden">
        <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden flex flex-col bg-transparent">
        <div className="flex-grow overflow-y-auto scrollbar-hide">
            {activeTab === 'home' && (
                <div className="p-6">
                    <Header />
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenFilters={() => setShowFilters(true)} hasActiveFilters={hasActiveFilters} />
                    {!hasActiveFilters && searchTerm === "" && activeCategory === "Todos" && <HeroSection onClick={setSelectedGame} />}
                    <div className="mb-6 flex items-end justify-between px-2"><h2 className="text-xl font-black font-jakarta text-slate-800">{hasActiveFilters ? "Resultados Filtrados" : "Minha ColeÃ§Ã£o"}</h2><span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">{filteredGames.length} Jogos</span></div>
                    <CategoryPills activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                    <div className="grid grid-cols-2 gap-5 items-stretch pb-10"><AnimatePresence mode='popLayout'>{filteredGames.map((game) => (<GameCard key={game.id} game={game} onClick={setSelectedGame} isFavorite={favorites.has(game.id)} toggleFavorite={toggleFavorite} />))}</AnimatePresence></div>
                    {filteredGames.length === 0 && (<div className="text-center py-20 opacity-60"><div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><Dice5 className="text-slate-300" size={40} /></div><p className="font-bold text-slate-500">Nenhum jogo encontrado.</p><button onClick={handleResetFilters} className="text-[#4FACFE] text-sm font-black mt-2 uppercase tracking-wide">Limpar filtros</button></div>)}
                </div>
            )}
            
            {activeTab === 'favorites' && (<div className="p-6"><Header title="Favoritos â¤ï¸" showProfile={false} /><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenFilters={() => setShowFilters(true)} hasActiveFilters={hasActiveFilters} /><div className="grid grid-cols-2 gap-5 items-stretch pb-10"><AnimatePresence mode='popLayout'>{filteredGames.map((game) => (<GameCard key={game.id} game={game} onClick={setSelectedGame} isFavorite={favorites.has(game.id)} toggleFavorite={toggleFavorite} />))}</AnimatePresence>{filteredGames.length === 0 && (<div className="col-span-2 text-center py-20 opacity-60"><p className="font-bold text-slate-400">Nenhum favorito encontrado.</p></div>)}</div></div>)}
            
            {activeTab === 'matches' && (<div className="p-6"><Header title="DiÃ¡rio de Jogo ðŸ†" showProfile={false} /><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StatsHeader /><button className="w-full bg-slate-900 text-white p-5 rounded-[28px] shadow-xl shadow-slate-200 flex items-center justify-between mb-10 group hover:scale-[1.02] transition-transform"><div className="flex items-center gap-4"><div className="bg-slate-800 p-3 rounded-2xl group-hover:bg-slate-700 transition-colors"><Plus size={24} /></div><div className="text-left"><span className="block font-black text-md">Registrar Nova Partida</span><span className="text-xs text-slate-400 font-bold">Quem ganhou hoje?</span></div></div><ChevronLeft className="rotate-180 text-slate-500" /></button><div className="mb-6 flex items-end justify-between px-2"><h2 className="text-xl font-black font-jakarta text-slate-800">Ãšltimas Batalhas</h2><span className="text-xs font-bold text-[#4FACFE] cursor-pointer">Ver todas</span></div><div className="flex flex-col gap-2 pb-10">{MATCH_HISTORY.map((match) => (<MatchCard key={match.id} match={match} onClick={setSelectedMatch} />))}</div></motion.div></div>)}
            
            {activeTab === 'profile' && <ProfileView onOpenSettings={() => setShowSettings(true)} />}
        </div>

        <div className="fixed bottom-6 left-6 right-6 max-w-[calc(28rem-3rem)] mx-auto z-40">
            <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-blue-900/10 p-2 flex justify-around items-center border border-white/50">
                <button onClick={() => setActiveTab('home')} className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-[#4FACFE] text-white shadow-lg shadow-blue-300 -translate-y-4 scale-110' : 'text-slate-300 hover:text-slate-500'}`}><Dice5 size={24} strokeWidth={activeTab === 'home' ? 3 : 2.5} /></button>
                <button onClick={() => setActiveTab('favorites')} className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${activeTab === 'favorites' ? 'bg-[#FF9A9E] text-white shadow-lg shadow-pink-300 -translate-y-4 scale-110' : 'text-slate-300 hover:text-slate-500'}`}><Heart size={24} strokeWidth={activeTab === 'favorites' ? 3 : 2.5} /></button>
                <button onClick={() => setActiveTab('matches')} className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${activeTab === 'matches' ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200 -translate-y-4 scale-110' : 'text-slate-300 hover:text-slate-500'}`}><Trophy size={24} strokeWidth={activeTab === 'matches' ? 3 : 2.5} /></button>
                <button onClick={() => setActiveTab('profile')} className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${activeTab === 'profile' ? 'bg-[#a18cd1] text-white shadow-lg shadow-purple-300 -translate-y-4 scale-110' : 'text-slate-300 hover:text-slate-500'}`}><MoreHorizontal size={24} strokeWidth={activeTab === 'profile' ? 3 : 2.5} /></button>
            </div>
        </div>
        </div>
      </div>

      <DesktopLayout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hasActiveFilters={hasActiveFilters}
        setShowFilters={setShowFilters}
        filteredGames={filteredGames}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setSelectedGame={setSelectedGame}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleResetFilters={handleResetFilters}
        setSelectedMatch={setSelectedMatch}
        onOpenSettings={() => setShowSettings(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <AnimatePresence>{selectedGame && <DetailOverlay game={selectedGame} onClose={() => setSelectedGame(null)} isFavorite={favorites.has(selectedGame.id)} toggleFavorite={toggleFavorite} />}</AnimatePresence>
      <AnimatePresence>{selectedMatch && <MatchDetailOverlay match={selectedMatch} onClose={() => setSelectedMatch(null)} />}</AnimatePresence>
      <AnimatePresence>{showSettings && <SettingsView onClose={() => setShowSettings(false)} />}</AnimatePresence>
      <AnimatePresence>{showFilters && <FilterOverlay filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} onReset={handleResetFilters} />}</AnimatePresence>
    </div>
  );
}


