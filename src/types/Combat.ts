import { Monster } from "./Monster";

export type CombatParticipant = {
  participantId: string;
  monsterId: string;
  monster: Monster;
  maxHitPoints: number;
  currentHitPoints: number;
};

export type Combat = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  monsters: CombatParticipant[];
};

export type CombatSummary = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  monsterCount: number;
};

export type CreateCombatInput = {
  name: string;
  description: string;
};