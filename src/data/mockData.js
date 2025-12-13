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
  },
  {
    key: "estrategista",
    title: "O Estrategista",
    description: "Você que adora analisar cada movimento e busca jogos que desafiam a mente.",
    color: "blue",
    accessory: null
  },
  {
    key: "aventureiro",
    title: "O Aventureiro",
    description: "Você que quer viver histórias épicas e mergulhar em mundos imaginários.",
    color: "orange",
    accessory: null
  }
];

export const TESTIMONIALS = [
  {
    quote: "Transformei minha estante em um portal digital. Agora escolher jogo virou parte da brincadeira.",
    author: "Laís",
    role: "Curadora de Meeples",
    initials: "LM",
    avatarColor: "yellow",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lais&scale=90",
    rating: 5,
    persona: "colecionador"
  },
  {
    quote: "A Mesa de Hoje salvou minhas noites de sexta. O grupo aceita as sugestões na hora.",
    author: "Rafa",
    role: "Mestre das Jogatinas",
    initials: "RJ",
    avatarColor: "red",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafa&scale=90",
    rating: 5,
    persona: "anfitriao"
  },
  {
    quote: "Finalmente um lugar onde minha coleção gigante faz sentido. Meus amigos amaram!",
    author: "Marina",
    role: "Colecionadora Apaixonada",
    initials: "MA",
    avatarColor: "pink",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina&scale=90",
    rating: 5,
    persona: "colecionador"
  },
  {
    quote: "Descobri jogos incríveis que meus amigos tinham. É como um tesouro escondido!",
    author: "João",
    role: "Explorador de Mesas",
    initials: "JM",
    avatarColor: "blue",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao&scale=90",
    rating: 5,
    persona: "curioso"
  },
  {
    quote: "As sugestões são tão precisas que parece que o app me conhece pessoalmente.",
    author: "Amanda",
    role: "Estrategista Master",
    initials: "AM",
    avatarColor: "orange",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda&scale=90",
    rating: 5,
    persona: "estrategista"
  },
  {
    quote: "Mergulhei em mundos completamente novos através da Ludoteca. Vício garantido!",
    author: "Lucas",
    role: "Aventureiro Épico",
    initials: "LE",
    avatarColor: "blue",
    avatarImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas&scale=90",
    rating: 5,
    persona: "aventureiro"
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
    cover: "/assets/catan.png",
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
    cover: "/assets/ticket-to-ride.png",
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
    cover: "/assets/dixit.png",
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
    cover: "/assets/pandemic.png",
    notes: "Use para iniciar quem gosta de desafios cooperativos.",
    video: "https://youtu.be/4-0-0"
  },
  {
    id: 5,
    title: "Dobble",
    players: "2-8",
    minPlayers: 2,
    maxPlayers: 8,
    time: "15 min",
    weight: "Leve",
    vibe: "Party",
    type: "Velocidade",
    cover: "/assets/dobble.png",
    notes: "Rapido, frenético e viciante.",
    video: "https://youtu.be/5-0-0"
  },
  {
    id: 6,
    title: "The Mind",
    players: "2-4",
    minPlayers: 2,
    maxPlayers: 4,
    time: "15 min",
    weight: "Leve",
    vibe: "Cooperativo",
    type: "Psicologico",
    cover: "/assets/the-mind.png",
    notes: "Sincroniza com seu grupo.",
    video: "https://youtu.be/6-0-0"
  },
  {
    id: 7,
    title: "Historias Sinistras",
    players: "2-6",
    minPlayers: 2,
    maxPlayers: 6,
    time: "30-60 min",
    weight: "Leve",
    vibe: "Party",
    type: "Narrativo",
    cover: "/assets/historias-sinistras.png",
    notes: "Contos assustadores para rir.",
    video: "https://youtu.be/7-0-0"
  },
  {
    id: 8,
    title: "Telma",
    players: "2-4",
    minPlayers: 2,
    maxPlayers: 4,
    time: "30 min",
    weight: "Leve",
    vibe: "Familia",
    type: "Deduccao",
    cover: "/assets/telma.png",
    notes: "Descobrir o culpado com inteligencia.",
    video: "https://youtu.be/8-0-0"
  },
  {
    id: 9,
    title: "Trial by Trolley",
    players: "3-13",
    minPlayers: 3,
    maxPlayers: 13,
    time: "30 min",
    weight: "Leve",
    vibe: "Party",
    type: "Moralmente Ambiguo",
    cover: "/assets/trial-by-trolley.png",
    notes: "Decisoes dificeis e gargalhadas.",
    video: "https://youtu.be/9-0-0"
  },
  {
    id: 10,
    title: "The Resistance",
    players: "5-10",
    minPlayers: 5,
    maxPlayers: 10,
    time: "30 min",
    weight: "Leve",
    vibe: "Competitivo",
    type: "Deduccao",
    cover: "/assets/the-resistance.png",
    notes: "Espioes e traicoes entre amigos.",
    video: "https://youtu.be/10-0-0"
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

// ========== PARTIDAS MOCK ==========
export const MOCK_PARTIDAS = [
  {
    id: "1",
    jogoId: 1,
    jogoNome: "Catan",
    jogoImagem: "/assets/catan.png",
    data: new Date("2024-12-10"),
    local: "Casa do Pedro",
    duracao: 90,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: 10, isUsuario: true },
      { id: "2", nome: "Pedro", pontuacao: 8, isUsuario: false },
      { id: "3", nome: "Ana", pontuacao: 6, isUsuario: false },
    ],
    vencedorId: "1",
    foto: null,
    notas: "Partida épica! Ganhei no último turno com uma cidade no porto.",
    criadoEm: new Date("2024-12-10T22:30:00"),
  },
  {
    id: "2",
    jogoId: 3,
    jogoNome: "Dixit",
    jogoImagem: "/assets/dixit.png",
    data: new Date("2024-12-08"),
    local: "Luderia Central",
    duracao: 45,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: 28, isUsuario: true },
      { id: "2", nome: "Ana", pontuacao: 32, isUsuario: false },
      { id: "3", nome: "Lucas", pontuacao: 25, isUsuario: false },
    ],
    vencedorId: "2",
    foto: null,
    notas: null,
    criadoEm: new Date("2024-12-08T16:00:00"),
  },
  {
    id: "3",
    jogoId: 4,
    jogoNome: "Pandemic",
    jogoImagem: "/assets/pandemic.png",
    data: new Date("2024-12-01"),
    local: "Minha casa",
    duracao: 60,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: "Vitória", isUsuario: true },
      { id: "2", nome: "Pedro", pontuacao: "Vitória", isUsuario: false },
    ],
    vencedorId: "1",
    foto: null,
    notas: "Salvamos o mundo! Quase perdemos na África.",
    criadoEm: new Date("2024-12-01T20:00:00"),
  },
  {
    id: "4",
    jogoId: 2,
    jogoNome: "Ticket to Ride",
    jogoImagem: "/assets/ticket-to-ride.png",
    data: new Date("2024-11-28"),
    local: "Casa da Ana",
    duracao: 75,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: 142, isUsuario: true },
      { id: "2", nome: "Ana", pontuacao: 138, isUsuario: false },
      { id: "3", nome: "Pedro", pontuacao: 115, isUsuario: false },
      { id: "4", nome: "Lucas", pontuacao: 121, isUsuario: false },
    ],
    vencedorId: "1",
    foto: null,
    notas: "Completei a rota mais longa!",
    criadoEm: new Date("2024-11-28T21:00:00"),
  },
  {
    id: "5",
    jogoId: 5,
    jogoNome: "The Mind",
    jogoImagem: "/assets/the-mind.png",
    data: new Date("2024-11-25"),
    local: "Bar do Jogo",
    duracao: 20,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: "Derrota", isUsuario: true },
      { id: "2", nome: "Ana", pontuacao: "Derrota", isUsuario: false },
      { id: "3", nome: "Pedro", pontuacao: "Derrota", isUsuario: false },
    ],
    vencedorId: null,
    foto: null,
    notas: "Quase chegamos no nível 8!",
    criadoEm: new Date("2024-11-25T19:30:00"),
  },
  {
    id: "6",
    jogoId: 1,
    jogoNome: "Catan",
    jogoImagem: "/assets/catan.png",
    data: new Date("2024-11-20"),
    local: "Minha casa",
    duracao: 105,
    jogadores: [
      { id: "1", nome: "Gabriel", pontuacao: 9, isUsuario: true },
      { id: "2", nome: "Pedro", pontuacao: 10, isUsuario: false },
      { id: "3", nome: "Lucas", pontuacao: 7, isUsuario: false },
    ],
    vencedorId: "2",
    foto: null,
    notas: "Pedro roubou a maior estrada!",
    criadoEm: new Date("2024-11-20T23:00:00"),
  },
];
