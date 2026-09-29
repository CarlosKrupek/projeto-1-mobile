import { Monster } from "./creatures";

export type Combat = {
  id: string;
  name: string;
  description: string;
  monsterIds: string[];
};

export const combats: Combat[] = [
  {
    id: "1",
    name: "Combate na Caverna",
    description: "Um grupo de aventureiros encontrou uma criatura poderosa dentro de uma antiga caverna de ametista.",
    monsterIds: ["1", "5", "1", "2", "3"],
  },
  {
    id: "2",
    name: "Emboscada na Floresta",
    description: "Os aventureiros foram surpreendidos por criaturas enquanto atravessavam uma floresta.",
    monsterIds: ["1"],
  },
  {
    id: "3",
    name: "A Ilha dos Pinguins de Aço",
    description: "Ao desembarcar numa costa congelada, o grupo é cercado por pinguins territoriais liderados por um coruja sagrada.",
    monsterIds: ["3", "3", "3", "3", "2"],
  },
  {
    id: "4",
    name: "Sussurros do Bosque Sagrado",
    description: "Pequenas fadas e protetores da natureza enfrentam os invasores que ousaram perturbar as flores mágicas.",
    monsterIds: ["4", "4", "21"],
  },
  {
    id: "5",
    name: "A Alcatéia das Sombras",
    description: "Uma matilha da noite ataca sob a copa escura de árvores retorcidas acompanhada por seu felino espectral.",
    monsterIds: ["5", "5", "5", "12"],
  },
  {
    id: "6",
    name: "O Despertar do Vulcão",
    description: "O chão se racha liberando criaturas formadas por pura lava escaldante no meio das ruínas.",
    monsterIds: ["6", "6", "15"],
  },
  {
    id: "7",
    name: "Invasão no Templo Rúnico",
    description: "Estátuas antigas e golens ganham vida para expulsar profanadores que buscam tesouros esquecidos.",
    monsterIds: ["7", "36", "36"],
  },
  {
    id: "8",
    name: "Encontro no Caminho dos Pinheiros",
    description: "Um Urso-Coruja enfurecido bloqueia o caminho da montanha enquanto espectros rondam a névoa ao redor.",
    monsterIds: ["8", "9", "9"],
  },
  {
    id: "9",
    name: "A Petrificação das Ruínas",
    description: "Procurando abrigo de uma tempestade, os aventureiros tropeçam no covil de um basilisco e suas criaturas guardiãs.",
    monsterIds: ["10", "23", "23"],
  },
  {
    id: "10",
    name: "Terror no Pântano Nebuloso",
    description: "A água do pântano borbulha quando múltiplas cabeças emergem do nevoeiro espesso.",
    monsterIds: ["11", "30"],
  },
  {
    id: "11",
    name: "Ninho dos picos Tempestuosos",
    description: "No topo das montanhas, grifos e wyverns disputam território enquanto atacam a comitiva.",
    monsterIds: ["13", "13", "25"],
  },
  {
    id: "12",
    name: "Incursão Abissal",
    description: "Um portal se abre trazendo um devorador de mentes e seus cães infernais famintos por almas.",
    monsterIds: ["14", "26", "26"],
  },
  {
    id: "13",
    name: "Prova de Fogo Celestial",
    description: "Para provar seu valor diante dos deuses, o grupo precisa sobreviver ao julgamento de uma Fênix e seus aliados.",
    monsterIds: ["16", "2"],
  },
  {
    id: "14",
    name: "A Teia da Cripta",
    description: "Uma emboscada subterrânea tecida no escuro total pega os aventureiros desprevenidos.",
    monsterIds: ["17", "17", "17", "17", "9"],
  },
  {
    id: "15",
    name: "O Desafio do Labirinto",
    description: "Paredes de pedra se movem e um grunhido retumbante ecoa no corredor sem saída.",
    monsterIds: ["18", "33"],
  },
  {
    id: "16",
    name: "Muralha do Gelo Eterno",
    description: "Trolls da montanha descem dos picos nevados buscando alimento na passagem estreita.",
    monsterIds: ["19", "19", "3"],
  },
  {
    id: "17",
    name: "Banquete das Sombras",
    description: "Dentro do castelo em ruínas, o lorde vampiro recebe seus convidados com uma recepção sangrenta.",
    monsterIds: ["20", "22", "12"],
  },
  {
    id: "18",
    name: "Massacre do Deserto Vermelho",
    description: "Espinhos voam pelo ar em uma tempestade de areia provocada por mânticoras famintas.",
    monsterIds: ["24", "24", "32"],
  },
  {
    id: "19",
    name: "A Maldição do Lich",
    description: "Um antigo soberano morto-vivo invoca forças profanas para erradicar a presença dos vivos.",
    monsterIds: ["27", "37", "9", "9"],
  },
  {
    id: "20",
    name: "Pesadelo nas Profundezas",
    description: "As águas do oceano se revoltam e gigantescos tentáculos sobem para tragar a embarcação inteira.",
    monsterIds: ["28", "15"],
  },
  {
    id: "21",
    name: "Emboscada nas Campinas",
    description: "Centauros patrulheiros cercam o acampamento para questionar as intenções do grupo no território sagrado.",
    monsterIds: ["29", "29", "29"],
  },
  {
    id: "22",
    name: "O Canto da Perdição",
    description: "Uma melodia hipnotizante atrai os marinheiros em direção às rochas afiadas do recife.",
    monsterIds: ["30", "30", "38"],
  },
  {
    id: "23",
    name: "A Engenhoquice Cautelosa",
    description: "Gnomos e seus autômatos bronzíneos testam suas invenções de defesa contra invasores.",
    monsterIds: ["31", "31", "36"],
  },
  {
    id: "24",
    name: "A Ilusão da Floresta Encantada",
    description: "Criaturas felinas mágicas e fadas brincalhonas confundem a mente dos aventureiros na densa mata.",
    monsterIds: ["33", "4", "4"],
  },
  {
    id: "25",
    name: "Fúria dos Infernos",
    description: "O Lorde Demônio emerge em meio ao fogo cercado por cães do inferno obedientes ao seu comando.",
    monsterIds: ["34", "26", "26", "26"],
  },
  {
    id: "26",
    name: "O Bando dos Armadilheiros",
    description: "Kobolds pequenos mas engenhosos usam o terreno a seu favor para tentar desacelerar o grupo.",
    monsterIds: ["35", "35", "35", "35", "35", "35"],
  },
  {
    id: "27",
    name: "A Loucura Ocular",
    description: "Múltiplos olhos flutuantes observam cada movimento antes que os raios voltem-se contra os aventureiros.",
    monsterIds: ["39", "14"],
  },
  {
    id: "28",
    name: "Apocalipse do Devorador",
    description: "A terra estremece e as montanhas ruem com o despertar da fera devoradora de mundos.",
    monsterIds: ["40"],
  },
  {
    id: "29",
    name: "O Resgate do Lago Cristalino",
    description: "A ninfa das águas convoca forças celestiais para proteger o lago sagrado de invasores de outro plano.",
    monsterIds: ["38", "2", "30"],
  },
  {
    id: "30",
    name: "A Reunião do Dracolich",
    description: "Na câmara mais funda da tumba, os restos mortais de um dragão rugem com energia necrótica.",
    monsterIds: ["37", "22", "22"],
  },
];