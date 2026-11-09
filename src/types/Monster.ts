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
  source: string;

  name: string;
  image?: string;

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