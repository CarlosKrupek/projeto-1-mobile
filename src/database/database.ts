
import * as SQLite from "expo-sqlite";

let database: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = SQLite.openDatabaseAsync("gerenciador_monstros.db");
  }

  const db = await database;
  // Verifica se a tabela de participantes já existe
  const columns = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(combat_monsters)"
  );

  // Verifica se a estrutura antiga não possui participant_id
  const hasParticipantId = columns.some(
    (column) => column.name === "participant_id"
  );

  // Se a tabela existe, mas possui a estrutura antiga,
  // remove as tabelas de combate para recriá-las.
  if (columns.length > 0 && !hasParticipantId) {
    await db.execAsync(`
      DROP TABLE IF EXISTS combat_monsters;
      DROP TABLE IF EXISTS combats;
    `);
  }
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS combats (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS combat_monsters (
      participant_id TEXT PRIMARY KEY NOT NULL,
      combat_id TEXT NOT NULL,
      monster_id TEXT NOT NULL,
      monster_name TEXT NOT NULL,
      armor_class TEXT NOT NULL,
      max_hit_points INTEGER NOT NULL,
      current_hit_points INTEGER NOT NULL,
      monster_data_json TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (combat_id) REFERENCES combats(id) ON DELETE CASCADE
    );
  `);

  return db;
}
