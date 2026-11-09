import { getDatabase } from "./database";

import {
  Combat,
  CombatParticipant,
  CombatSummary,
  CreateCombatInput,
} from "../types/Combat";

import { Monster } from "../types/Monster";

type CombatRow = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  monster_count: number;
};

type ParticipantRow = {
  participant_id: string;
  combat_id: string;
  monster_id: string;
  max_hit_points: number;
  current_hit_points: number;
  monster_data_json: string;
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function extractMaxHitPoints(hitPoints: string): number {
  const match = hitPoints.match(/^\d+/);

  return match ? Number(match[0]) : 1;
}

function mapParticipant(row: ParticipantRow): CombatParticipant {
  const monster = JSON.parse(row.monster_data_json) as Monster;

  return {
    participantId: row.participant_id,
    monsterId: row.monster_id,
    monster,
    maxHitPoints: row.max_hit_points,
    currentHitPoints: row.current_hit_points,
  };
}

// Cria um combate.
export async function createCombat(
  input: CreateCombatInput
): Promise<string> {
  const db = await getDatabase();

  const id = generateId();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO combats (
      id,
      name,
      description,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?)`,
    id,
    input.name,
    input.description,
    now,
    now
  );

  return id;
}

// Recupera todos os combates.
export async function getCombats(): Promise<CombatSummary[]> {
  const db = await getDatabase();

  const rows = await db.getAllAsync<CombatRow>(`
    SELECT
      c.id,
      c.name,
      c.description,
      c.created_at,
      c.updated_at,
      COUNT(cm.participant_id) AS monster_count
    FROM combats c
    LEFT JOIN combat_monsters cm
      ON cm.combat_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    monsterCount: row.monster_count,
  }));
}

// Recupera um combate específico.
export async function getCombatById(
  id: string
): Promise<Combat | null> {
  const db = await getDatabase();

  const combat = await db.getFirstAsync<{
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }>(
    `SELECT * FROM combats WHERE id = ?`,
    id
  );

  if (!combat) {
    return null;
  }

  const rows = await db.getAllAsync<ParticipantRow>(
    `SELECT *
     FROM combat_monsters
     WHERE combat_id = ?
     ORDER BY position ASC`,
    id
  );

  return {
    id: combat.id,
    name: combat.name,
    description: combat.description,
    createdAt: combat.created_at,
    updatedAt: combat.updated_at,
    monsters: rows.map(mapParticipant),
  };
}

// Atualiza nome e descrição.
export async function updateCombat(
  id: string,
  name: string,
  description: string
): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE combats
     SET name = ?, description = ?, updated_at = ?
     WHERE id = ?`,
    name,
    description,
    new Date().toISOString(),
    id
  );
}

// Exclui um combate.
export async function deleteCombat(id: string): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM combats WHERE id = ?`,
    id
  );
}

// Adiciona uma criatura ao combate.
export async function addMonsterToCombat(
  combatId: string,
  monster: Monster
): Promise<string> {
  const db = await getDatabase();

  const participantId = generateId();
  const maxHitPoints = extractMaxHitPoints(monster.hitPoints);

  const position = await db.getFirstAsync<{ next_position: number }>(
    `SELECT COALESCE(MAX(position), -1) + 1 AS next_position
     FROM combat_monsters
     WHERE combat_id = ?`,
    combatId
  );

  await db.runAsync(
    `INSERT INTO combat_monsters (
      participant_id,
      combat_id,
      monster_id,
      monster_name,
      armor_class,
      max_hit_points,
      current_hit_points,
      monster_data_json,
      position
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    participantId,
    combatId,
    monster.id,
    monster.name,
    monster.armorClass,
    maxHitPoints,
    maxHitPoints,
    JSON.stringify(monster),
    position?.next_position ?? 0
  );

  await db.runAsync(
    `UPDATE combats SET updated_at = ? WHERE id = ?`,
    new Date().toISOString(),
    combatId
  );

  return participantId;
}

// Remove uma instância específica de criatura.
export async function removeMonsterFromCombat(
  participantId: string
): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM combat_monsters
     WHERE participant_id = ?`,
    participantId
  );
}

// Atualiza os pontos de vida de uma instância específica.
export async function updateMonsterHitPoints(
  participantId: string,
  currentHitPoints: number
): Promise<void> {
  const db = await getDatabase();

  const participant = await db.getFirstAsync<{
    max_hit_points: number;
    combat_id: string;
  }>(
    `SELECT max_hit_points, combat_id
     FROM combat_monsters
     WHERE participant_id = ?`,
    participantId
  );

  if (!participant) {
    throw new Error("Participante não encontrado.");
  }

  const normalizedHitPoints = Math.max(
    0,
    Math.min(currentHitPoints, participant.max_hit_points)
  );

  await db.runAsync(
    `UPDATE combat_monsters
     SET current_hit_points = ?
     WHERE participant_id = ?`,
    normalizedHitPoints,
    participantId
  );

  await db.runAsync(
    `UPDATE combats SET updated_at = ? WHERE id = ?`,
    new Date().toISOString(),
    participant.combat_id
  );
}
