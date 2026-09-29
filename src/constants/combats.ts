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

    description:
      "Um grupo de aventureiros encontrou uma criatura poderosa dentro de uma antiga caverna de ametista.",

    monsterIds: ["1", "5", "1", "2","3"],
  },

  {
    id: "2",

    name: "Emboscada na Floresta",

    description:
      "Os aventureiros foram surpreendidos por criaturas enquanto atravessavam uma floresta.",

    monsterIds: ["1"],
  },
];