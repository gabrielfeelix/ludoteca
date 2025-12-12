// ========== MOCK DATA LUDOTECA ==========

export const HOW_IT_WORKS = [
  {
    title: "Cadastre seus jogos",
    description: "Adicione capas, vibes e info essenciais como em um inventario magico.",
    icon: "Layers",
    mascot: "assets/mascot-book"
  },
  {
    title: "Compartilhe com o grupo",
    description: "Gere um link encantado para mandar no WhatsApp ou Discord.",
    icon: "Link2",
    mascot: "assets/mascot-share"
  },
  {
    title: "Descubra a Mesa de Hoje",
    description: "Use filtros inteligentes e deixe o app sugerir o jogo perfeito.",
    icon: "Wand2",
    mascot: "assets/mascot-wand"
  }
];

export const BENEFIT_CARDS = [
  { title: "Minha Colecao", description: "Controle total em cartas lindas.", accent: "#E5F3FF" },
  { title: "Mesa de Hoje", description: "Algoritmo inspirado em meeples conselheiros.", accent: "#F1E7FF" },
  { title: "Link compartilhavel", description: "Envie para o grupo com um toque.", accent: "#FFECDD" },
  { title: "Registro de partidas", description: "Em breve seu grimorio de historias.", accent: "#FFE9F2", badge: "Soon" }
];

export const PERSONAS = [
  {
    key: "anfitriao",
    title: "O Anfitrião",
    description: "Você que recebe a galera em casa e quer parar de explicar as mesmas regras toda semana.",
    color: "yellow",
    accessory: "chef"
  },
  {
    key: "colecionador",
    title: "O Colecionador",
    description: "Você que tem mais jogos do que tempo pra jogar e quer dar vida à sua estante.",
    color: "red",
    accessory: "crown"
  },
  {
    key: "curioso",
    title: "O Curioso",
    description: "Você que quer descobrir jogos novos através das coleções dos amigos.",
    color: "cream",
    accessory: "question"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Transformei minha estante em um portal digital. Agora escolher jogo virou parte da brincadeira.",
    author: "Lais, curadora de meeples"
  },
  {
    quote: "A Mesa de Hoje salvou minhas noites de sexta. O grupo aceita as sugestoes na hora.",
    author: "Rafa, mestre das jogatinas"
  }
];

export const QUICK_FILTERS = [
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

export const SAMPLE_GAMES = [
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

export const PLAYER_OPTIONS = ["2", "3-4", "5-6", "7+"];
export const TIME_OPTIONS = ["30 min", "60 min", "90+ min", "Qualquer duração"];
export const WEIGHT_OPTIONS = ["Leve", "Medio", "Pesado", "Qualquer"];

export const APP_TABS = [
  { key: "colecao", label: "Colecao", icon: "Library" },
  { key: "mesa", label: "Mesa de Hoje", icon: "Sparkles" },
  { key: "partidas", label: "Partidas", icon: "NotebookPen" },
  { key: "perfil", label: "Perfil", icon: "User" }
];

export const FAQ_ITEMS = [
  {
    question: "A Ludoteca é grátis?",
    answer: "Sim! O plano básico é gratuito para sempre. Você pode cadastrar seus jogos, usar a Mesa de Hoje e compartilhar sua coleção sem pagar nada."
  },
  {
    question: "Meus amigos precisam criar conta?",
    answer: "Não! Eles acessam sua coleção pelo link público que você compartilha. Só quem quer ter a própria Ludoteca precisa criar conta."
  },
  {
    question: "Posso importar meus jogos do BGG ou Ludopedia?",
    answer: "Em breve! Estamos trabalhando na integração com BoardGameGeek e Ludopedia para facilitar a importação da sua coleção."
  },
  {
    question: "Funciona no celular?",
    answer: "Sim! O site é totalmente responsivo e funciona perfeitamente em smartphones, tablets e desktops."
  },
  {
    question: "Meus dados ficam seguros?",
    answer: "Sim! Usamos criptografia e você pode exportar ou deletar seus dados a qualquer momento. Sua privacidade é nossa prioridade."
  },
  {
    question: "Como funciona a Mesa de Hoje?",
    answer: "Você escolhe critérios como número de jogadores, tempo disponível e complexidade. A Ludoteca analisa sua coleção e sugere os jogos que melhor combinam."
  },
  {
    question: "Posso ter mais de uma coleção?",
    answer: "Por enquanto não, mas está no roadmap! No futuro você poderá criar coleções separadas (Ex: 'Jogos de família', 'Jogos pesados')."
  }
];
