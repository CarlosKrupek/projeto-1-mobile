export type Ability = {
  score: number;
  modifier: number;
  save?: number;
};

export type MonsterAction = {
  name: string;
  description: string;
};

export type Monster = {
  id: string;

  name: string;
  image: string;

  size: string;
  type: string;
  alignment: string;

  challenge: string;
  xp: string;

  armorClass: string;
  hitPoints: string;
  initiative: string;
  speed: string;

  abilities: {
    str: Ability;
    dex: Ability;
    con: Ability;
    int: Ability;
    wis: Ability;
    cha: Ability;
  };

  skills: string;

  damageResistances: string;
  damageImmunities: string;
  conditionImmunities: string;

  senses: string;
  languages: string;

  traits: MonsterAction[];
  actions: MonsterAction[];
  bonusActions: MonsterAction[];
  reactions: MonsterAction[];
  legendaryActions: MonsterAction[];
  lairActions: MonsterAction[];
  regionalEffects: MonsterAction[];
};

export const creatures: Monster[] = [
  {
    id: "1",
    name: "Dragão de Ametista Adulto",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    size: "Enorme",
    type: "Dragão (Gema)",
    alignment: "Tipicamente Neutro",
    challenge: "16",
    xp: "15.000",
    armorClass: "19 (armadura natural)",
    hitPoints: "229 (17d12 + 119)",
    initiative: "+2 (12)",
    speed: "40 ft., voo 80 ft. (pairar), natação 40 ft.",
    abilities: {
      str: { score: 25, modifier: 7, save: 7 },
      dex: { score: 14, modifier: 2, save: 7 },
      con: { score: 22, modifier: 6, save: 12 },
      int: { score: 20, modifier: 5, save: 5 },
      wis: { score: 17, modifier: 3, save: 8 },
      cha: { score: 21, modifier: 5, save: 10 },
    },
    skills: "Arcana +15, Perception +13, Persuasion +10, Stealth +7",
    damageResistances: "Força, Psíquico",
    damageImmunities: "Radiante, Envenenamento",
    conditionImmunities: "Amedrontado, Caído",
    senses: "Visão às cegas 60 ft., visão no escuro 120 ft., Percepção passiva 23",
    languages: "Comum, Dracônico, telepatia 120 ft.",
    traits: [
      { name: "Ambidestro", description: "O dragão pode respirar tanto ar quanto água." },
      { name: "Resistência Lendária (3/Dia)", description: "Se o dragão falhar em um teste de resistência, ele pode escolher obter sucesso em vez disso." }
    ],
    actions: [
      { name: "Multiataque", description: "O dragão realiza um ataque de Mordida e dois ataques de Garra." },
      { name: "Mordida", description: "Ataque corpo a corpo: +12 para atingir, alcance 10 ft., um alvo. Acerto: 18 (2d10 + 7) de dano perfurante mais 9 (2d8) de dano de força." },
      { name: "Garra", description: "Ataque corpo a corpo: +12 para atingir, alcance 10 ft., um alvo. Acerto: 11 (1d8 + 7) de dano cortante." },
      { name: "Singularidade Brilhante (Recarga 5–6)", description: "O dragão cria uma esfera brilhante de força gravitacional em sua boca e libera a energia em uma linha de 90 pés. Cada criatura nessa área deve realizar um teste de resistência de Destreza CD 20." },
      { name: "Conjuração (Psiônica)", description: "O dragão conjura uma das seguintes magias, sem necessidade de componentes materiais e usando Inteligência como atributo de conjuração." }
    ],
    bonusActions: [
      { name: "Alterar Forma", description: "O dragão se transforma magicamente em qualquer criatura Média ou Pequena, mantendo suas estatísticas de jogo, exceto seu tamanho." },
      { name: "Passo Psíquico", description: "O dragão se teletransporta magicamente para um espaço desocupado que possa ver a até 60 pés." }
    ],
    reactions: [],
    legendaryActions: [
      { name: "Garra", description: "O dragão realiza um ataque de garra." },
      { name: "Psionismo (Custa 2 Ações)", description: "O dragão usa Passo Psíquico ou Conjuração." },
      { name: "Cristal Explosivo (Custa 3 Ações)", description: "O dragão lança um cristal de ametista que explode no ponto escolhido." }
    ],
    lairActions: [
      { name: "Sussurro Persuasivo", description: "O dragão sussurra telepaticamente para uma criatura dentro do alcance de sua telepatia." },
      { name: "Força Aprisionadora", description: "O dragão conjura a magia Muralha de Força, usando Inteligência como atributo de conjuração." },
      { name: "Projeção Espacial", description: "O dragão escolhe um espaço que possa caber dentro de seu covil e o faz existir simultaneamente em outro local." }
    ],
    regionalEffects: [
      { name: "Verificação de Antecedentes", description: "Uma vez por dia, o dragão pode conjurar a magia Conhecimento das Lendas." },
      { name: "Profusão de Cristais", description: "Cristais de ametista e geodos se formam ao longo de margens lamacentas e leitos de rios." },
      { name: "Vida Próspera", description: "Peixes e outras criaturas aquáticas se reproduzem rapidamente na região." }
    ]
  },
  {
    id: "2",
    name: "Coruja Celestial Ancestral",
    image: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb",
    size: "Grande",
    type: "Celestial",
    alignment: "Leal e Bom",
    challenge: "5",
    xp: "1.800",
    armorClass: "15 (armadura natural)",
    hitPoints: "68 (8d10 + 24)",
    initiative: "+4 (18)",
    speed: "10 ft., voo 60 ft.",
    abilities: {
      str: { score: 12, modifier: 1 },
      dex: { score: 18, modifier: 4, save: 7 },
      con: { score: 16, modifier: 3 },
      int: { score: 14, modifier: 2 },
      wis: { score: 18, modifier: 4, save: 7 },
      cha: { score: 14, modifier: 2 }
    },
    skills: "Percepção +10, Furtividade +10",
    damageResistances: "Radiante; Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Amedrontado",
    senses: "Visão no escuro 120 ft., Percepção passiva 20",
    languages: "Celestial, Comum, Sylvan, telepatia 60 ft.",
    traits: [
      { name: "Voo Silencioso", description: "A coruja tem vantagem em testes de Destreza (Furtividade) realizados enquanto voa." },
      { name: "Voo Rasante", description: "A coruja não provoca ataques de oportunidade ao voar fora do alcance de um inimigo." }
    ],
    actions: [
      { name: "Multiataque", description: "A coruja faz dois ataques: um de Bico e um de Garras Sagradas." },
      { name: "Bico", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 8 (1d8 + 4) de dano perfurante." },
      { name: "Garras Sagradas", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 11 (2d6 + 4) de dano cortante mais 4 (1d8) de dano radiante." }
    ],
    bonusActions: [
      { name: "Pio Revelador", description: "A coruja emite um pio mágico. Invisibilidade é anulada para criaturas a até 30 pés até o final do próximo turno." }
    ],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "3",
    name: "Pinguim Imperador Imperial",
    image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6",
    size: "Pequeno",
    type: "Besta",
    alignment: "Neutro",
    challenge: "1/2",
    xp: "100",
    armorClass: "12 (armadura natural)",
    hitPoints: "22 (4d6 + 8)",
    initiative: "+1 (12)",
    speed: "20 ft., natação 50 ft.",
    abilities: {
      str: { score: 10, modifier: 0 },
      dex: { score: 12, modifier: 1 },
      con: { score: 14, modifier: 2 },
      int: { score: 3, modifier: -4 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Atletismo +2, Percepção +3",
    damageResistances: "Frio",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Percepção passiva 13",
    languages: "Nenhum",
    traits: [
      { name: "Resistência ao Frio Extremo", description: "O pinguim não sofre os efeitos de frio extremo ou hipotermia." },
      { name: "Deslizamento Glacial", description: "Ao se mover no gelo ou neve, o pinguim pode deslizar de barriga dobrando seu deslocamento." }
    ],
    actions: [
      { name: "Bicada", description: "Ataque corpo a corpo: +3 para atingir, alcance 5 ft., um alvo. Acerto: 4 (1d6 + 1) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "4",
    name: "Ninfa das Floressências",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Pequeno",
    type: "Fada",
    alignment: "Caótico e Bom",
    challenge: "2",
    xp: "450",
    armorClass: "14",
    hitPoints: "31 (7d6 + 7)",
    initiative: "+4 (18)",
    speed: "30 ft., voo 40 ft.",
    abilities: {
      str: { score: 6, modifier: -2 },
      dex: { score: 18, modifier: 4 },
      con: { score: 12, modifier: 1 },
      int: { score: 12, modifier: 1 },
      wis: { score: 14, modifier: 2 },
      cha: { score: 17, modifier: 3 }
    },
    skills: "Atuação +5, Furtividade +6, Natureza +3",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Encantado",
    senses: "Visão no escuro 60 ft., Percepção passiva 12",
    languages: "Sylvan, Comum, Elfico",
    traits: [
      { name: "Resistência Mágica", description: "A fada tem vantagem em testes de resistência contra magias e outros efeitos mágicos." }
    ],
    actions: [
      { name: "Espinho Encantado", description: "Ataque à distância com magia: +6 para atingir, alcance 30/90 ft., um alvo. Acerto: 7 (1d6 + 4) de dano de veneno e o alvo fica Encantado até o início do próximo turno da fada." },
      { name: "Pó de Sonho (1/Dia)", description: "A fada lança um pó brilhante em uma área de 15 pés. Criaturas no local devem passar em CD 13 Sabedoria ou adormecer por 1 minuto." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "5",
    name: "Lobo das Sombras Ancestral",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9",
    size: "Médio",
    type: "Besta",
    alignment: "Neutro e Mau",
    challenge: "3",
    xp: "700",
    armorClass: "14 (armadura natural)",
    hitPoints: "45 (7d8 + 14)",
    initiative: "+3 (16)",
    speed: "50 ft.",
    abilities: {
      str: { score: 16, modifier: 3 },
      dex: { score: 16, modifier: 3 },
      con: { score: 14, modifier: 2 },
      int: { score: 6, modifier: -2 },
      wis: { score: 13, modifier: 1 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Percepção +5, Furtividade +7",
    damageResistances: "Necrótico",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 15",
    languages: "Compreende Abissal mas não fala",
    traits: [
      { name: "Tática de Alcateia", description: "O lobo tem vantagem na jogada de ataque contra uma criatura se pelo menos um dos aliados do lobo estiver a 5 pés da criatura." },
      { name: "Furtividade nas Sombras", description: "Enquanto estiver em penumbra ou escuridão, o lobo pode usar a ação de Esconder-se como ação bônus." }
    ],
    actions: [
      { name: "Mordida Sombria", description: "Ataque corpo a corpo: +5 para atingir, alcance 5 ft., um alvo. Acerto: 10 (2d6 + 3) de dano perfurante mais 3 (1d6) de dano necrótico. Se o alvo for uma criatura, deve passar em CD 13 Força ou ser derrubado (Caído)." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "6",
    name: "Elementais do Magma Fulgurante",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    size: "Grande",
    type: "Elemental",
    alignment: "Neutro",
    challenge: "5",
    xp: "1.800",
    armorClass: "14 (armadura natural)",
    hitPoints: "102 (12d10 + 36)",
    initiative: "+1 (12)",
    speed: "30 ft., escavação 30 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 12, modifier: 1 },
      con: { score: 17, modifier: 3 },
      int: { score: 6, modifier: -2 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Nenhuma",
    damageResistances: "Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Fogo, Veneno",
    conditionImmunities: "Petrificado, Envenenado, Paralisado, Acorrentado",
    senses: "Visão no escuro 60 ft., Percepção passiva 10",
    languages: "Ignan",
    traits: [
      { name: "Corpo Elemental de Fogo", description: "Qualquer criatura que tocar o elemental ou atingi-lo com um ataque corpo a corpo a até 5 pés sofre 5 (1d10) de dano de fogo." },
      { name: "Forma Rocha-Magma", description: "Se o elemental sofrer dano de frio, sua velocidade é reduzida em 10 pés até o final de seu próximo turno." }
    ],
    actions: [
      { name: "Multiataque", description: "O elemental faz dois ataques de Pancada de Magma." },
      { name: "Pancada de Magma", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 13 (2d8 + 4) de dano de concussão mais 7 (2d6) de dano de fogo." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "7",
    name: "Golem de Pedra Rúnico",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Grande",
    type: "Constructo",
    alignment: "Imparcial",
    challenge: "10",
    xp: "5.900",
    armorClass: "17 (armadura natural)",
    hitPoints: "178 (17d10 + 85)",
    initiative: "-1 (8)",
    speed: "30 ft.",
    abilities: {
      str: { score: 22, modifier: 6, save: 10 },
      dex: { score: 9, modifier: -1 },
      con: { score: 20, modifier: 5, save: 9 },
      int: { score: 3, modifier: -4 },
      wis: { score: 11, modifier: 0 },
      cha: { score: 1, modifier: -5 }
    },
    skills: "Nenhuma",
    damageResistances: "Nenhuma",
    damageImmunities: "Veneno, Psíquico; Concussão, Perfurante e Cortante de ataques não mágicos não feitos com adamante",
    conditionImmunities: "Encantado, Amedrontado, Envenenado, Paralisado, Petrificado",
    senses: "Visão no escuro 120 ft., Percepção passiva 10",
    languages: "Entende o idioma de seu criador mas não fala",
    traits: [
      { name: "Imunidade à Magia", description: "O golem é imune a qualquer magia ou efeito mágico que permita teste de resistência mágica." },
      { name: "Forma Inabalável", description: "O golem não pode ter sua forma alterada por magias como Metamorfose." }
    ],
    actions: [
      { name: "Multiataque", description: "O golem faz dois ataques de Esmagar." },
      { name: "Esmagar", description: "Ataque corpo a corpo: +10 para atingir, alcance 5 ft., um alvo. Acerto: 19 (3d8 + 6) de dano de concussão." },
      { name: "Pulso Rúnico de Lentidão (Recarga 5-6)", description: "O golem emite uma onda sísmica. Todas as criaturas a até 20 pés devem passar em CD 17 Constituição ou ficar sob efeito de Lentinhas por 1 minuto." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "8",
    name: "Urso-Coruja das Florestas Antigas",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "3",
    xp: "700",
    armorClass: "13 (armadura natural)",
    hitPoints: "59 (7d10 + 21)",
    initiative: "+1 (12)",
    speed: "40 ft.",
    abilities: {
      str: { score: 20, modifier: 5 },
      dex: { score: 12, modifier: 1 },
      con: { score: 17, modifier: 3 },
      int: { score: 3, modifier: -4 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Percepção +5",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 15",
    languages: "Nenhum",
    traits: [
      { name: "Visão e Olfato Aguçados", description: "O urso-coruja tem vantagem em testes de Sabedoria (Percepção) baseados na visão ou no olfato." }
    ],
    actions: [
      { name: "Multiataque", description: "O urso-coruja realiza dois ataques: um com o Bico e um com as Garras." },
      { name: "Bico", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 10 (1d10 + 5) de dano perfurante." },
      { name: "Garras", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 14 (2d8 + 5) de dano cortante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "9",
    name: "Espectro da Névoa Profunda",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    size: "Médio",
    type: "Morto-Vivo",
    alignment: "Caótico e Mau",
    challenge: "2",
    xp: "450",
    armorClass: "12",
    hitPoints: "22 (5d8)",
    initiative: "+2 (14)",
    speed: "0 ft., voo 50 ft. (pairar)",
    abilities: {
      str: { score: 1, modifier: -5 },
      dex: { score: 14, modifier: 2 },
      con: { score: 11, modifier: 0 },
      int: { score: 10, modifier: 0 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 11, modifier: 0 }
    },
    skills: "Furtividade +4",
    damageResistances: "Ácido, Frio, Fogo, Elétrico, Trovoada; Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Necrótico, Veneno",
    conditionImmunities: "Encantado, Amedrontado, Envenenado, Caído, Paralisado, Agarrado",
    senses: "Visão no escuro 60 ft., Percepção passiva 10",
    languages: "Compreende idiomas que conhecia em vida mas não fala",
    traits: [
      { name: "Movimento Incorpóreo", description: "O espectro pode se mover através de outras criaturas e objetos como se fossem terreno difícil." }
    ],
    actions: [
      { name: "Dreno de Vida", description: "Ataque corpo a corpo: +4 para atingir, alcance 5 ft., um alvo. Acerto: 10 (3d6) de dano necrótico. O alvo deve fazer CD 10 Constituição ou terá seus pontos de vida máximos reduzidos no mesmo valor." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "10",
    name: "Basilisco dos Abismos",
    image: "https://images.unsplash.com/photo-1551085254-e96b210df58a",
    size: "Médio",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "3",
    xp: "700",
    armorClass: "15 (armadura natural)",
    hitPoints: "52 (8d8 + 16)",
    initiative: "-1 (8)",
    speed: "20 ft.",
    abilities: {
      str: { score: 16, modifier: 3 },
      dex: { score: 8, modifier: -1 },
      con: { score: 15, modifier: 2 },
      int: { score: 2, modifier: -4 },
      wis: { score: 8, modifier: -1 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Nenhuma",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 9",
    languages: "Nenhum",
    traits: [
      { name: "Olhar Petrificante", description: "Quando uma criatura começa seu turno a até 30 pés do basilisco e ambos puderem se ver, o basilisco pode forçá-la a fazer um teste de resistência de Constituição CD 12 para não ser Petrificada." }
    ],
    actions: [
      { name: "Mordida Venomosa", description: "Ataque corpo a corpo: +5 para atingir, alcance 5 ft., um alvo. Acerto: 10 (2d6 + 3) de dano perfurante mais 7 (2d6) de dano de veneno." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "11",
    name: "Hydra das Pântanos Nebulosos",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675",
    size: "Enorme",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "8",
    xp: "3.900",
    armorClass: "15 (armadura natural)",
    hitPoints: "172 (15d12 + 75)",
    initiative: "+1 (12)",
    speed: "30 ft., natação 30 ft.",
    abilities: {
      str: { score: 20, modifier: 5 },
      dex: { score: 12, modifier: 1 },
      con: { score: 20, modifier: 5 },
      int: { score: 2, modifier: -4 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Percepção +6",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 16",
    languages: "Nenhum",
    traits: [
      { name: "Regeneração de Cabeças", description: "Sempre que a hydra sofre dano e uma cabeça morre, duas novas crescem no próximo turno a menos que sofra dano de fogo." },
      { name: "Múltiplas Cabeças", description: "A hydra ganha reações adicionais iguais ao número de cabeças que possui." }
    ],
    actions: [
      { name: "Multiataque", description: "A hydra faz tantos ataques de Mordida quantas forem as suas cabeças ativas (inicialmente 5)." },
      { name: "Mordida", description: "Ataque corpo a corpo: +8 para atingir, alcance 10 ft., um alvo. Acerto: 10 (1d10 + 5) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "12",
    name: "Gato-Sombra Fantasmagórico",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    size: "Pequeno",
    type: "Monstruosidade",
    alignment: "Neutro",
    challenge: "1",
    xp: "200",
    armorClass: "13",
    hitPoints: "22 (5d6 + 5)",
    initiative: "+3 (16)",
    speed: "40 ft., escalada 30 ft.",
    abilities: {
      str: { score: 8, modifier: -1 },
      dex: { score: 17, modifier: 3 },
      con: { score: 12, modifier: 1 },
      int: { score: 6, modifier: -2 },
      wis: { score: 14, modifier: 2 },
      cha: { score: 10, modifier: 0 }
    },
    skills: "Furtividade +7, Percepção +4",
    damageResistances: "Necrótico",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 14",
    languages: "Nenhum",
    traits: [
      { name: "Deslocamento Sombrio", description: "O gato pode passar através de frestas pequenas mantendo-se em formato semiconcreto." }
    ],
    actions: [
      { name: "Garras Fantasmas", description: "Ataque corpo a corpo: +5 para atingir, alcance 5 ft., um alvo. Acerto: 5 (1d4 + 3) de dano cortante mais 3 (1d6) de dano necrótico." }
    ],
    bonusActions: [
      { name: "Passo de Sombra", description: "Teleporta-se a até 30 pés entre duas sombras que consiga enxergar." }
    ],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "13",
    name: "Grifo Tempestuoso",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "4",
    xp: "1.100",
    armorClass: "14 (armadura natural)",
    hitPoints: "75 (10d10 + 20)",
    initiative: "+2 (14)",
    speed: "30 ft., voo 80 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 15, modifier: 2 },
      con: { score: 15, modifier: 2 },
      int: { score: 3, modifier: -4 },
      wis: { score: 13, modifier: 1 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Percepção +5",
    damageResistances: "Elétrico",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 15",
    languages: "Nenhum",
    traits: [
      { name: "Visão Aguçada", description: "O grifo tem vantagem em testes de Sabedoria (Percepção) baseados na visão." }
    ],
    actions: [
      { name: "Multiataque", description: "O grifo faz dois ataques: um de Bico e um de Garras Electrificadas." },
      { name: "Bico", description: "Ataque corpo a corpo: +6 para atingir, alcance 5 ft., um alvo. Acerto: 8 (1d8 + 4) de dano perfurante." },
      { name: "Garras Electrificadas", description: "Ataque corpo a corpo: +6 para atingir, alcance 5 ft., um alvo. Acerto: 11 (2d6 + 4) de dano cortante mais 4 (1d8) de dano elétrico." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "14",
    name: "Devorador de Mentes Abissal",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    size: "Médio",
    type: "Aberração",
    alignment: "Leal e Mau",
    challenge: "7",
    xp: "2.900",
    armorClass: "15 (armadura de peitoral)",
    hitPoints: "71 (13d8 + 13)",
    initiative: "+1 (12)",
    speed: "30 ft.",
    abilities: {
      str: { score: 11, modifier: 0 },
      dex: { score: 12, modifier: 1 },
      con: { score: 12, modifier: 1, save: 4 },
      int: { score: 19, modifier: 4, save: 7 },
      wis: { score: 17, modifier: 3, save: 6 },
      cha: { score: 17, modifier: 3, save: 6 }
    },
    skills: "Arcana +7, Percepção +6, Furtividade +4",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 120 ft., Percepção passiva 16",
    languages: "Qualith, Profundo, Telepatia 120 ft.",
    traits: [
      { name: "Resistência Mágica", description: "Tem vantagem em testes de resistência contra magias e outros efeitos mágicos." }
    ],
    actions: [
      { name: "Tentáculos", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 15 (2d10 + 4) de dano psíquico e o alvo fica Agarrado e Atordoado." },
      { name: "Extrair Cérebro", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um humanoide atordoado agarrado pelo devorador. Acerto: 55 (10d10) de dano perfurante. Se reduzir a 0 PV, devora o cérebro." },
      { name: "Explosão Psíquica (Recarga 5-6)", description: "Emite energia psíquica em cone de 60 pés. CD 15 Inteligência ou sofre 22 (4d8 + 4) de dano psíquico e fica atordoado por 1 minuto." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "15",
    name: "Tubarão Megalodonte Vulcânico",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c",
    size: "Enorme",
    type: "Besta",
    alignment: "Imparcial",
    challenge: "9",
    xp: "5.000",
    armorClass: "15 (armadura natural)",
    hitPoints: "157 (15d12 + 60)",
    initiative: "+2 (14)",
    speed: "0 ft., natação 60 ft.",
    abilities: {
      str: { score: 23, modifier: 6 },
      dex: { score: 14, modifier: 2 },
      con: { score: 19, modifier: 4 },
      int: { score: 1, modifier: -5 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 5, modifier: -3 }
    },
    skills: "Percepção +4",
    damageResistances: "Fogo",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão às cegas 60 ft., Percepção passiva 14",
    languages: "Nenhum",
    traits: [
      { name: "Frenesi de Sangue", description: "O tubarão tem vantagem em jogadas de ataque corpo a corpo contra qualquer criatura que não esteja com seus pontos de vida no máximo." }
    ],
    actions: [
      { name: "Mordida Devastadora", description: "Ataque corpo a corpo: +10 para atingir, alcance 10 ft., um alvo. Acerto: 28 (4d10 + 6) de dano perfurante mais 7 (2d6) de dano de fogo." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "16",
    name: "Fênix Dourada Despertada",
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65",
    size: "Grande",
    type: "Elemental",
    alignment: "Neutro e Bom",
    challenge: "12",
    xp: "8.400",
    armorClass: "18 (armadura natural)",
    hitPoints: "175 (18d10 + 76)",
    initiative: "+6 (22)",
    speed: "20 ft., voo 120 ft.",
    abilities: {
      str: { score: 19, modifier: 4 },
      dex: { score: 22, modifier: 6, save: 10 },
      con: { score: 18, modifier: 4 },
      int: { score: 12, modifier: 1 },
      wis: { score: 16, modifier: 3, save: 7 },
      cha: { score: 19, modifier: 4 }
    },
    skills: "Percepção +7",
    damageResistances: "Radiante; Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Fogo, Veneno",
    conditionImmunities: "Envenenado, Paralisado, Petrificado, Caído",
    senses: "Visão no escuro 120 ft., Percepção passiva 17",
    languages: "Ignan, Celestial, Comum",
    traits: [
      { name: "Ressurreição em Chamas", description: "Quando a fênix morre, ela explode em uma nuvem de chamas e renasce de suas cinzas com metade dos seus pontos de vida máximos após 1d4 rodadas." }
    ],
    actions: [
      { name: "Multiataque", description: "A fênix realiza dois ataques: um de Bico e um de Garras Flamejantes." },
      { name: "Bico", description: "Ataque corpo a corpo: +10 para atingir, alcance 5 ft., um alvo. Acerto: 15 (2d8 + 6) de dano perfurante mais 9 (2d8) de dano de fogo." },
      { name: "Garras Flamejantes", description: "Ataque corpo a corpo: +10 para atingir, alcance 5 ft., um alvo. Acerto: 13 (2d6 + 6) de dano cortante mais 9 (2d8) de dano radiante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "17",
    name: "Aranha Gigante das Criptas",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5",
    size: "Grande",
    type: "Besta",
    alignment: "Imparcial",
    challenge: "1",
    xp: "200",
    armorClass: "14 (armadura natural)",
    hitPoints: "26 (4d10 + 4)",
    initiative: "+3 (16)",
    speed: "30 ft., escalada 30 ft.",
    abilities: {
      str: { score: 14, modifier: 2 },
      dex: { score: 16, modifier: 3 },
      con: { score: 12, modifier: 1 },
      int: { score: 2, modifier: -4 },
      wis: { score: 11, modifier: 0 },
      cha: { score: 4, modifier: -3 }
    },
    skills: "Furtividade +7",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Sentido de teia 60 ft., Percepção passiva 10",
    languages: "Nenhum",
    traits: [
      { name: "Caminhar em Teias", description: "A aranha ignora restrições de movimento causadas por teias." }
    ],
    actions: [
      { name: "Mordida Venenosa", description: "Ataque corpo a corpo: +5 para atingir, alcance 5 ft., um alvo. Acerto: 7 (1d8 + 3) de dano perfurante, e o alvo deve passar em CD 11 Constituição ou sofrer 9 (2d8) de dano de veneno." },
      { name: "Teia (Recarga 5-6)", description: "Ataque à distância: +5 para atingir, alcance 30/60 ft., um alvo. Acerto: O alvo fica Preso por teia." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "18",
    name: "Minotauro do Labirinto Esquecido",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Caótico e Mau",
    challenge: "3",
    xp: "700",
    armorClass: "14 (armadura natural)",
    hitPoints: "76 (9d10 + 27)",
    initiative: "+0 (10)",
    speed: "40 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 11, modifier: 0 },
      con: { score: 16, modifier: 3 },
      int: { score: 6, modifier: -2 },
      wis: { score: 16, modifier: 3 },
      cha: { score: 9, modifier: -1 }
    },
    skills: "Percepção +7",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 17",
    languages: "Abissal",
    traits: [
      { name: "Memória Perfeita do Labirinto", description: "O minotauro pode se lembrar perfeitamente de qualquer caminho que percorreu." }
    ],
    actions: [
      { name: "Machado Grande", description: "Ataque corpo a corpo: +6 para atingir, alcance 5 ft., um alvo. Acerto: 17 (2d12 + 4) de dano cortante." },
      { name: "Chifres", description: "Ataque corpo a corpo: +6 para atingir, alcance 5 ft., um alvo. Acerto: 13 (2d8 + 4) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "19",
    name: "Troll dos Picos Congelados",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Grande",
    type: "Gigante",
    alignment: "Caótico e Mau",
    challenge: "5",
    xp: "1.800",
    armorClass: "15 (armadura natural)",
    hitPoints: "84 (8d10 + 40)",
    initiative: "+1 (12)",
    speed: "30 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 13, modifier: 1 },
      con: { score: 20, modifier: 5 },
      int: { score: 7, modifier: -2 },
      wis: { score: 9, modifier: -1 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Percepção +2",
    damageResistances: "Frio",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 12",
    languages: "Gigante",
    traits: [
      { name: "Regeneração", description: "O troll recupera 10 pontos de vida no início do seu turno. Se sofrer dano de fogo ou ácido, esta característica não funciona no seu próximo turno." }
    ],
    actions: [
      { name: "Multiataque", description: "O troll faz três ataques: um de Mordida e dois com as Garras." },
      { name: "Mordida", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 7 (1d6 + 4) de dano perfurante." },
      { name: "Garras", description: "Ataque corpo a corpo: +7 para atingir, alcance 5 ft., um alvo. Acerto: 11 (2d6 + 4) de dano cortante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "20",
    name: "Vampiro Lorde das Sombras",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    size: "Médio",
    type: "Morto-Vivo",
    alignment: "Leal e Mau",
    challenge: "13",
    xp: "10.000",
    armorClass: "16 (armadura natural)",
    hitPoints: "144 (17d8 + 68)",
    initiative: "+4 (18)",
    speed: "30 ft.",
    abilities: {
      str: { score: 18, modifier: 4, save: 9 },
      dex: { score: 18, modifier: 4, save: 9 },
      con: { score: 18, modifier: 4 },
      int: { score: 17, modifier: 3 },
      wis: { score: 15, modifier: 2, save: 7 },
      cha: { score: 18, modifier: 4, save: 9 }
    },
    skills: "Furtividade +9, Percepção +7, Persuasão +9",
    damageResistances: "Necrótico; Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 120 ft., Percepção passiva 17",
    languages: "Comum, Elfico, Abissal",
    traits: [
      { name: "Regeneração Sombria", description: "Recupera 20 PV no início de seu turno se tiver pelo menos 1 PV e não estiver sob luz do sol ou água corrente." }
    ],
    actions: [
      { name: "Multiataque", description: "O vampiro realiza dois ataques de Pancada ou Mordida." },
      { name: "Mordida Sanguinária", description: "Ataque corpo a corpo: +9 para atingir, alcance 5 ft., um alvo voluntário ou agarrado. Acerto: 7 (1d6 + 4) de dano perfurante mais 10 (3d6) de dano necrótico." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [
      { name: "Mover-se", description: "O vampiro se move até seu deslocamento sem provocar ataques de oportunidade." },
      { name: "Ataque de Pancada", description: "Realiza um ataque de pancada." }
    ],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "21",
    name: "Treant Protetor da Floresta",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    size: "Enorme",
    type: "Planta",
    alignment: "Caótico e Bom",
    challenge: "9",
    xp: "5.000",
    armorClass: "16 (armadura natural)",
    hitPoints: "138 (12d12 + 60)",
    initiative: "-1 (8)",
    speed: "30 ft.",
    abilities: {
      str: { score: 23, modifier: 6 },
      dex: { score: 8, modifier: -1 },
      con: { score: 21, modifier: 5 },
      int: { score: 12, modifier: 1 },
      wis: { score: 16, modifier: 3 },
      cha: { score: 12, modifier: 1 }
    },
    skills: "Natureza +5, Percepção +7",
    damageResistances: "Concussão, Perfurante",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Percepção passiva 17",
    languages: "Comum, Druídico, Elfico, Sylvan",
    traits: [
      { name: "Falsa Aparência", description: "Enquanto o treant permanecer imóvel, é indistinguível de uma árvore comum." }
    ],
    actions: [
      { name: "Multiataque", description: "O treant faz dois ataques de Pancada." },
      { name: "Pancada de Tronco", description: "Ataque corpo a corpo: +10 para atingir, alcance 10 ft., um alvo. Acerto: 16 (3d6 + 6) de dano de concussão." },
      { name: "Arremessar Rocha", description: "Ataque à distância: +10 para atingir, alcance 60/180 ft., um alvo. Acerto: 28 (4d10 + 6) de dano de concussão." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "22",
    name: "Banshee do Lamento Profundo",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    size: "Médio",
    type: "Morto-Vivo",
    alignment: "Caótico e Mau",
    challenge: "4",
    xp: "1.100",
    armorClass: "12",
    hitPoints: "58 (13d8)",
    initiative: "+2 (14)",
    speed: "0 ft., voo 40 ft. (pairar)",
    abilities: {
      str: { score: 1, modifier: -5 },
      dex: { score: 14, modifier: 2 },
      con: { score: 10, modifier: 0 },
      int: { score: 12, modifier: 1 },
      wis: { score: 11, modifier: 0 },
      cha: { score: 17, modifier: 3 }
    },
    skills: "Furtividade +4, Percepção +2",
    damageResistances: "Ácido, Frio, Fogo, Elétrico, Trovoada; Concussão, Perfurante e Cortante de ataques não mágicos",
    damageImmunities: "Necrótico, Veneno",
    conditionImmunities: "Encantado, Amedrontado, Envenenado, Caído, Paralisado",
    senses: "Visão no escuro 60 ft., Percepção passiva 12",
    languages: "Comum, Elfico",
    traits: [
      { name: "Lamento Mortal (1/Dia)", description: "A banshee solta um lamento mournful. Qualquer criatura viva a até 30 pés que puder ouvi-la deve passar em teste de Constituição CD 13 ou cair a 0 pontos de vida." }
    ],
    actions: [
      { name: "Toque Corruptor", description: "Ataque corpo a corpo: +4 para atingir, alcance 5 ft., um alvo. Acerto: 12 (3d6 + 2) de dano necrótico." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "23",
    name: "Gargula das Torres Esquecidas",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Médio",
    type: "Monstruosidade",
    alignment: "Caótico e Mau",
    challenge: "2",
    xp: "450",
    armorClass: "15 (armadura natural)",
    hitPoints: "52 (7d8 + 21)",
    initiative: "+0 (10)",
    speed: "30 ft., voo 60 ft.",
    abilities: {
      str: { score: 15, modifier: 2 },
      dex: { score: 11, modifier: 0 },
      con: { score: 16, modifier: 3 },
      int: { score: 6, modifier: -2 },
      wis: { score: 11, modifier: 0 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Furtividade +2",
    damageResistances: "Concussão, Perfurante e Cortante de ataques não mágicos que não sejam de adamante",
    damageImmunities: "Veneno",
    conditionImmunities: "Envenenado, Petrificado",
    senses: "Visão no escuro 60 ft., Percepção passiva 10",
    languages: "Terran",
    traits: [
      { name: "Aparência de Estátua", description: "Enquanto a gárgula permanecer imóvel, ela é indistinguível de uma estátua de pedra." }
    ],
    actions: [
      { name: "Multiataque", description: "A gárgula faz dois ataques: um de Mordida e um de Garras." },
      { name: "Mordida", description: "Ataque corpo a corpo: +4 para atingir, alcance 5 ft., um alvo. Acerto: 5 (1d6 + 2) de dano perfurante." },
      { name: "Garras", description: "Ataque corpo a corpo: +4 para atingir, alcance 5 ft., um alvo. Acerto: 5 (1d6 + 2) de dano cortante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "24",
    name: "Manticora dos Desertos Vermelhos",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Caótico e Mau",
    challenge: "3",
    xp: "700",
    armorClass: "14 (armadura natural)",
    hitPoints: "68 (8d10 + 24)",
    initiative: "+3 (16)",
    speed: "30 ft., voo 50 ft.",
    abilities: {
      str: { score: 17, modifier: 3 },
      dex: { score: 16, modifier: 3 },
      con: { score: 17, modifier: 3 },
      int: { score: 7, modifier: -2 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Percepção +3",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 13",
    languages: "Comum",
    traits: [],
    actions: [
      { name: "Multiataque", description: "A mânticora realiza três ataques: um de Mordida e dois de Garras, ou três Espinhos da Cauda." },
      { name: "Espinho da Cauda", description: "Ataque à distância: +5 para atingir, alcance 100/200 ft., um alvo. Acerto: 7 (1d8 + 3) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "25",
    name: "Wyvern das Escarpas Tenebrosas",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    size: "Grande",
    type: "Dragão",
    alignment: "Imparcial",
    challenge: "6",
    xp: "2.300",
    armorClass: "13 (armadura natural)",
    hitPoints: "110 (13d10 + 39)",
    initiative: "+1 (12)",
    speed: "20 ft., voo 80 ft.",
    abilities: {
      str: { score: 19, modifier: 4 },
      dex: { score: 12, modifier: 1 },
      con: { score: 16, modifier: 3 },
      int: { score: 5, modifier: -3 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 6, modifier: -2 }
    },
    skills: "Percepção +4",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 14",
    languages: "Nenhum",
    traits: [],
    actions: [
      { name: "Multiataque", description: "O wyvern faz dois ataques: um com a Mordida e um com o Ferrão da Cauda." },
      { name: "Ferrão da Cauda", description: "Ataque corpo a corpo: +7 para atingir, alcance 10 ft., um alvo. Acerto: 11 (2d6 + 4) de dano perfurante mais 24 (7d6) de dano de veneno se o alvo falhar no teste de Constituição CD 15." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "26",
    name: "Cão Infernal dos Abismos",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9",
    size: "Médio",
    type: "Corruptor",
    alignment: "Leal e Mau",
    challenge: "3",
    xp: "700",
    armorClass: "15 (armadura natural)",
    hitPoints: "45 (7d8 + 14)",
    initiative: "+1 (12)",
    speed: "50 ft.",
    abilities: {
      str: { score: 17, modifier: 3 },
      dex: { score: 12, modifier: 1 },
      con: { score: 14, modifier: 2 },
      int: { score: 6, modifier: -2 },
      wis: { score: 13, modifier: 1 },
      cha: { score: 6, modifier: -2 }
    },
    skills: "Percepção +5",
    damageResistances: "Nenhuma",
    damageImmunities: "Fogo",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 15",
    languages: "Infernal (compreende)",
    traits: [
      { name: "Tática de Alcateia", description: "O cão infernal tem vantagem em jogadas de ataque contra uma criatura se houver aliado a 5 pés da vítima." }
    ],
    actions: [
      { name: "Sopro de Fogo (Recarga 5-6)", description: "O cão exala fogo em um cone de 15 pés. Teste de Destreza CD 12 ou sofre 21 (6d6) de dano de fogo." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "27",
    name: "Lich dos Séculos Esquecidos",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    size: "Médio",
    type: "Morto-Vivo",
    alignment: "Qualquer Mau",
    challenge: "21",
    xp: "33.000",
    armorClass: "17 (armadura natural)",
    hitPoints: "135 (18d8 + 54)",
    initiative: "+3 (16)",
    speed: "30 ft.",
    abilities: {
      str: { score: 11, modifier: 0 },
      dex: { score: 16, modifier: 3, save: 10 },
      con: { score: 16, modifier: 3, save: 10 },
      int: { score: 20, modifier: 5, save: 12 },
      wis: { score: 14, modifier: 2, save: 9 },
      cha: { score: 16, modifier: 3 }
    },
    skills: "Arcana +19, História +12, Percepção +9",
    damageResistances: "Frio, Elétrico, Necrótico",
    damageImmunities: "Veneno; Concussão, Perfurante e Cortante de ataques não mágicos",
    conditionImmunities: "Encantado, Amedrontado, Paralisado, Envenenado",
    senses: "Visão no escuro 120 ft., Percepção passiva 19",
    languages: "Comum mais 5 outros idiomas",
    traits: [
      { name: "Resistência Lendária (3/Dia)", description: "Se o lich falhar em um teste de resistência, ele pode escolher obter sucesso em vez disso." }
    ],
    actions: [
      { name: "Toque Paralisante", description: "Ataque corpo a corpo: +12 para atingir, alcance 5 ft., um alvo. Acerto: 10 (3d6) de dano de frio e o alvo fica Paralisado por 1 minuto." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [
      { name: "Truque", description: "O lich conjura um truque." },
      { name: "Toque Paralizante (Custa 2 Ações)", description: "Usa seu Toque Paralisante." }
    ],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "28",
    name: "Kraken dos Oceanos Negros",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c",
    size: "Imenso",
    type: "Monstruosidade",
    alignment: "Caótico e Mau",
    challenge: "23",
    xp: "50.000",
    armorClass: "18 (armadura natural)",
    hitPoints: "472 (27d20 + 189)",
    initiative: "+0 (10)",
    speed: "20 ft., natação 60 ft.",
    abilities: {
      str: { score: 30, modifier: 10, save: 17 },
      dex: { score: 11, modifier: 0 },
      con: { score: 25, modifier: 7, save: 14 },
      int: { score: 22, modifier: 6, save: 13 },
      wis: { score: 18, modifier: 4, save: 11 },
      cha: { score: 20, modifier: 5 }
    },
    skills: "Nenhuma",
    damageResistances: "Nenhuma",
    damageImmunities: "Elétrico; Concussão, Perfurante e Cortante de ataques não mágicos",
    conditionImmunities: "Amedrontado, Paralisado",
    senses: "Visão no escuro 120 ft., Percepção passiva 14",
    languages: "Compreende Abissal, Celestial e Infernal mas não fala, telepatia 120 ft.",
    traits: [
      { name: "Monstro das Profundezas", description: "O kraken pode respirar apenas debaixo d'água e ignora terreno difícil aquático." }
    ],
    actions: [
      { name: "Multiataque", description: "O kraken faz três ataques de Tentáculo." },
      { name: "Tentáculo", description: "Ataque corpo a corpo: +17 para atingir, alcance 30 ft., um alvo. Acerto: 20 (3d6 + 10) de dano de concussão e o alvo fica Agarrado." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [
      { name: "Ataque de Tentáculo", description: "O kraken faz um ataque de tentáculo." }
    ],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "29",
    name: "Centauro Patrulheiro das Campinas",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Neutro e Bom",
    challenge: "2",
    xp: "450",
    armorClass: "12",
    hitPoints: "45 (6d10 + 12)",
    initiative: "+2 (14)",
    speed: "50 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 14, modifier: 2 },
      con: { score: 14, modifier: 2 },
      int: { score: 9, modifier: -1 },
      wis: { score: 13, modifier: 1 },
      cha: { score: 11, modifier: 0 }
    },
    skills: "Atletismo +6, Sobrevivência +3",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Percepção passiva 11",
    languages: "Elfico, Sylvan",
    traits: [
      { name: "Investida", description: "Se o centauro se mover pelo menos 30 pés em linha reta em direção a um alvo e acertá-lo com um ataque de pikes, causa 10 (3d6) de dano adicional." }
    ],
    actions: [
      { name: "Multiataque", description: "O centauro faz dois ataques: um com a Lança e um com os Cascos." },
      { name: "Cascos", description: "Ataque corpo a corpo: +6 para atingir, alcance 5 ft., um alvo. Acerto: 11 (2d6 + 4) de dano de concussão." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "30",
    name: "Sereia das Profundezas Encantadas",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Médio",
    type: "Monstruosidade",
    alignment: "Neutro",
    challenge: "3",
    xp: "700",
    armorClass: "12",
    hitPoints: "38 (7d8 + 7)",
    initiative: "+2 (14)",
    speed: "10 ft., natação 40 ft.",
    abilities: {
      str: { score: 10, modifier: 0 },
      dex: { score: 15, modifier: 2 },
      con: { score: 12, modifier: 1 },
      int: { score: 11, modifier: 0 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 16, modifier: 3 }
    },
    skills: "Atuação +7, Persuasão +5",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 11",
    languages: "Aquan, Comum",
    traits: [
      { name: "Anfíbio", description: "A sereia pode respirar tanto ar quanto água." }
    ],
    actions: [
      { name: "Canção Cativante", description: "A sereia emite uma melodia mágica. Toda criatura num raio de 300 pés que puder ouvi-la deve passar em CD 13 Sabedoria para não ficar Encantada." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "31",
    name: "Gnomo Engenheiro de autômatos",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Pequeno",
    type: "Humanoide",
    alignment: "Leal e Bom",
    challenge: "1/2",
    xp: "100",
    armorClass: "13 (armadura de couro)",
    hitPoints: "16 (3d6 + 6)",
    initiative: "+2 (14)",
    speed: "25 ft.",
    abilities: {
      str: { score: 8, modifier: -1 },
      dex: { score: 14, modifier: 2 },
      con: { score: 14, modifier: 2 },
      int: { score: 16, modifier: 3 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 10, modifier: 0 }
    },
    skills: "Arcana +5, História +5",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 10",
    languages: "Gnomo, Comum",
    traits: [
      { name: "Astúcia dos Gnomos", description: "O gnomo tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia." }
    ],
    actions: [
      { name: "Besta Leve", description: "Ataque à distância: +4 para atingir, alcance 80/320 ft., um alvo. Acerto: 6 (1d8 + 2) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "32",
    name: "Gorgona de Bronze Ancestral",
    image: "https://images.unsplash.com/photo-1551085254-e96b210df58a",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "5",
    xp: "1.800",
    armorClass: "19 (armadura natural)",
    hitPoints: "114 (12d10 + 48)",
    initiative: "+0 (10)",
    speed: "40 ft.",
    abilities: {
      str: { score: 20, modifier: 5 },
      dex: { score: 11, modifier: 0 },
      con: { score: 18, modifier: 4 },
      int: { score: 2, modifier: -4 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 7, modifier: -2 }
    },
    skills: "Percepção +4",
    damageResistances: "Nenhuma",
    damageImmunities: "Petrificado",
    conditionImmunities: "Petrificado",
    senses: "Visão no escuro 60 ft., Percepção passiva 14",
    languages: "Nenhum",
    traits: [
      { name: "Atropelar", description: "Se mover pelo menos 20 pés em linha reta contra um alvo e acertar um ataque de chifres, pode fazer um ataque de cascos como ação bônus." }
    ],
    actions: [
      { name: "Gás Petrificante (Recarga 5-6)", description: "Exala um gás em cone de 30 pés. CD 13 Constituição ou começa a virar pedra (Petrificado)." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "33",
    name: "Pantera Deslocadora",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    size: "Grande",
    type: "Monstruosidade",
    alignment: "Leal e Mau",
    challenge: "3",
    xp: "700",
    armorClass: "13 (armadura natural)",
    hitPoints: "85 (10d10 + 30)",
    initiative: "+2 (14)",
    speed: "40 ft.",
    abilities: {
      str: { score: 18, modifier: 4 },
      dex: { score: 15, modifier: 2 },
      con: { score: 16, modifier: 3 },
      int: { score: 6, modifier: -2 },
      wis: { score: 12, modifier: 1 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Furtividade +4, Percepção +3",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 13",
    languages: "Nenhum",
    traits: [
      { name: "Deslocamento da Ilusão", description: "Projeta uma ilusão mágica que faz pareça estar a alguns pés de sua posição real. Ataques contra ela têm desvantagem." }
    ],
    actions: [
      { name: "Multiataque", description: "A pantera faz dois ataques com os Tentáculos." },
      { name: "Tentáculo", description: "Ataque corpo a corpo: +6 para atingir, alcance 10 ft., um alvo. Acerto: 7 (1d6 + 4) de dano de concussão mais 3 (1d6) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "34",
    name: "Lorde Demônio Pit Fiend",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    size: "Grande",
    type: "Corruptor",
    alignment: "Leal e Mau",
    challenge: "20",
    xp: "25.000",
    armorClass: "19 (armadura natural)",
    hitPoints: "300 (24d10 + 168)",
    initiative: "+2 (14)",
    speed: "30 ft., voo 60 ft.",
    abilities: {
      str: { score: 26, modifier: 8, save: 14 },
      dex: { score: 14, modifier: 2 },
      con: { score: 24, modifier: 7, save: 13 },
      int: { score: 18, modifier: 4 },
      wis: { score: 18, modifier: 4, save: 10 },
      cha: { score: 24, modifier: 7 }
    },
    skills: "Percepção +10",
    damageResistances: "Frio; Concussão, Perfurante e Cortante de ataques não mágicos sem prata",
    damageImmunities: "Fogo, Veneno",
    conditionImmunities: "Envenenado",
    senses: "Visão no escuro 120 ft., Percepção passiva 20",
    languages: "Infernal, Telepatia 120 ft.",
    traits: [
      { name: "Aura do Medo", description: "Qualquer criatura que comece seu turno a até 20 pés deve passar em teste de Carisma CD 21 para não ficar Amedrontada." }
    ],
    actions: [
      { name: "Multiataque", description: "O demônio realiza quatro ataques: Mordida, Garras, Maça e Cauda." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "35",
    name: "Kobold Armadilheiro Mestre",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Pequeno",
    type: "Humanoide",
    alignment: "Leal e Mau",
    challenge: "1/8",
    xp: "25",
    armorClass: "12",
    hitPoints: "5 (2d6 - 2)",
    initiative: "+2 (14)",
    speed: "30 ft.",
    abilities: {
      str: { score: 7, modifier: -2 },
      dex: { score: 15, modifier: 2 },
      con: { score: 9, modifier: -1 },
      int: { score: 8, modifier: -1 },
      wis: { score: 7, modifier: -2 },
      cha: { score: 8, modifier: -1 }
    },
    skills: "Percepção -2",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Nenhuma",
    senses: "Visão no escuro 60 ft., Percepção passiva 8",
    languages: "Dracônico",
    traits: [
      { name: "Sensibilidade à Luz do Sol", description: "Tem desvantagem em jogadas de ataque sob luz solar direta." }
    ],
    actions: [
      { name: "Adaga", description: "Ataque corpo a corpo: +4 para atingir, alcance 5 ft., um alvo. Acerto: 4 (1d4 + 2) de dano perfurante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "36",
    name: "Guardião de Bronze do Templo",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Médio",
    type: "Constructo",
    alignment: "Imparcial",
    challenge: "4",
    xp: "1.100",
    armorClass: "16 (armadura natural)",
    hitPoints: "60 (8d8 + 24)",
    initiative: "+0 (10)",
    speed: "30 ft.",
    abilities: {
      str: { score: 17, modifier: 3 },
      dex: { score: 10, modifier: 0 },
      con: { score: 16, modifier: 3 },
      int: { score: 3, modifier: -4 },
      wis: { score: 10, modifier: 0 },
      cha: { score: 1, modifier: -5 }
    },
    skills: "Nenhuma",
    damageResistances: "Fogo",
    damageImmunities: "Veneno, Psíquico",
    conditionImmunities: "Encantado, Amedrontado, Envenenado, Paralisado",
    senses: "Visão no escuro 60 ft., Percepção passiva 10",
    languages: "Entende o idioma de seu criador",
    traits: [],
    actions: [
      { name: "Espada Grande de Bronze", description: "Ataque corpo a corpo: +5 para atingir, alcance 5 ft., um alvo. Acerto: 10 (2d6 + 3) de dano cortante." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "37",
    name: "Dracolich de Osso e Veneno",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    size: "Enorme",
    type: "Morto-Vivo",
    alignment: "Caótico e Mau",
    challenge: "17",
    xp: "18.000",
    armorClass: "19 (armadura natural)",
    hitPoints: "225 (18d12 + 108)",
    initiative: "+0 (10)",
    speed: "40 ft., voo 80 ft.",
    abilities: {
      str: { score: 25, modifier: 7, save: 13 },
      dex: { score: 10, modifier: 0 },
      con: { score: 23, modifier: 6, save: 12 },
      int: { score: 16, modifier: 3 },
      wis: { score: 15, modifier: 2, save: 8 },
      cha: { score: 19, modifier: 4, save: 10 }
    },
    skills: "Percepção +8, Furtividade +6",
    damageResistances: "Necrótico, Frio",
    damageImmunities: "Veneno; Concussão, Perfurante e Cortante de não mágicos",
    conditionImmunities: "Envenenado, Paralisado, Amedrontado",
    senses: "Visão no escuro 120 ft., Percepção passiva 18",
    languages: "Comum, Dracônico",
    traits: [
      { name: "Resistência Lendária (3/Dia)", description: "Se falhar em teste de resistência, pode escolher passar em seu lugar." }
    ],
    actions: [
      { name: "Sopro de Gás Venenoso", description: "Exala nuvem de veneno em cone de 60 pés. CD 19 Constituição ou sofre 56 (16d6) de dano de veneno." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "38",
    name: "Ninfa das Águas Cristalinas",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    size: "Médio",
    type: "Fada",
    alignment: "Caótico e Bom",
    challenge: "5",
    xp: "1.800",
    armorClass: "15",
    hitPoints: "66 (12d8 + 12)",
    initiative: "+5 (20)",
    speed: "30 ft., natação 60 ft.",
    abilities: {
      str: { score: 10, modifier: 0 },
      dex: { score: 20, modifier: 5 },
      con: { score: 12, modifier: 1 },
      int: { score: 14, modifier: 2 },
      wis: { score: 16, modifier: 3 },
      cha: { score: 20, modifier: 5 }
    },
    skills: "Atuação +8, Natureza +5",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Encantado",
    senses: "Visão no escuro 60 ft., Percepção passiva 13",
    languages: "Sylvan, Elfico, Aquan",
    traits: [
      { name: "Beleza Deslumbrante", description: "Qualquer humanoide que olhe diretamente para a ninfa a até 30 pés deve passar em CD 15 Sabedoria para não ficar Cego por 1 minuto." }
    ],
    actions: [
      { name: "Jorro d'Água Mágico", description: "Ataque à distância: +8 para atingir, alcance 60 ft., um alvo. Acerto: 14 (2d8 + 5) de dano de concussão." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "39",
    name: "Beholder Observador Insano",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    size: "Grande",
    type: "Aberração",
    alignment: "Caótico e Mau",
    challenge: "13",
    xp: "10.000",
    armorClass: "18 (armadura natural)",
    hitPoints: "180 (19d10 + 76)",
    initiative: "+2 (14)",
    speed: "0 ft., voo 20 ft. (pairar)",
    abilities: {
      str: { score: 10, modifier: 0 },
      dex: { score: 14, modifier: 2 },
      con: { score: 18, modifier: 4, save: 9 },
      int: { score: 17, modifier: 3, save: 8 },
      wis: { score: 15, modifier: 2, save: 7 },
      cha: { score: 17, modifier: 3 }
    },
    skills: "Percepção +12",
    damageResistances: "Nenhuma",
    damageImmunities: "Nenhuma",
    conditionImmunities: "Caído",
    senses: "Visão no escuro 120 ft., Percepção passiva 22",
    languages: "Profundo, Comum, Telepatia 120 ft.",
    traits: [
      { name: "Cone Anti-Magia", description: "O olho central do beholder cria um cone de anti-magia de 150 pés." }
    ],
    actions: [
      { name: "Olhos Raios (3 aleatórios)", description: "Dispara três raios oculares aleatórios em alvos que possa ver dentro de 120 pés (Desintegração, Morte, Petrificação, etc)." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [
      { name: "Raio Ocular", description: "O beholder usa um raio ocular aleatório." }
    ],
    lairActions: [],
    regionalEffects: []
  },
  {
    id: "40",
    name: "Tarrasque o Devorador de Mundos",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    size: "Colossal",
    type: "Monstruosidade",
    alignment: "Imparcial",
    challenge: "30",
    xp: "155.000",
    armorClass: "25 (armadura natural)",
    hitPoints: "676 (33d20 + 330)",
    initiative: "+0 (10)",
    speed: "40 ft.",
    abilities: {
      str: { score: 30, modifier: 10, save: 19 },
      dex: { score: 11, modifier: 0 },
      con: { score: 30, modifier: 10, save: 19 },
      int: { score: 3, modifier: -4 },
      wis: { score: 11, modifier: 0, save: 9 },
      cha: { score: 11, modifier: 0, save: 9 }
    },
    skills: "Percepção +10",
    damageResistances: "Nenhuma",
    damageImmunities: "Fogo, Veneno; Concussão, Perfurante e Cortante de ataques não mágicos",
    conditionImmunities: "Encantado, Amedrontado, Paralisado, Envenenado",
    senses: "Visão no escuro 120 ft., Percepção passiva 20",
    languages: "Nenhum",
    traits: [
      { name: "Carapaça Reflexiva", description: "Qualquer magia de raio ou projétil mágico pode ser refletida de volta ao conjurador." },
      { name: "Resistência Lendária (3/Dia)", description: "Se falhar em teste de resistência, pode optar por passar." }
    ],
    actions: [
      { name: "Multiataque", description: "Realiza cinco ataques: Mordida, dois com Garras, Chifres e Cauda." }
    ],
    bonusActions: [],
    reactions: [],
    legendaryActions: [
      { name: "Ataque", description: "Realiza um ataque de Garra ou de Cauda." }
    ],
    lairActions: [],
    regionalEffects: []
  }
];