
import { getDatabase } from "./database";
import { Monster } from "../types/Monster";

export type SavedMonster = Monster & {
  customImageUri?: string;
};

// Salvar uma criatura no SQLite.
export async function saveMonster(monster: Monster): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `
      INSERT INTO saved_monsters (
        id,
        source,
        name,
        data_json,
        saved_at
      )
      VALUES (?, ?, ?, ?, ?)

      ON CONFLICT(id) DO UPDATE SET
        source = excluded.source,
        name = excluded.name,
        data_json = excluded.data_json,
        saved_at = excluded.saved_at;
    `,
    [
      monster.id,
      monster.source,
      monster.name,
      JSON.stringify(monster),
      new Date().toISOString(),
    ]
  );
}

// Buscar todas as criaturas salvas, incluindo suas imagens personalizadas.
export async function getSavedMonsters(): Promise<SavedMonster[]> {
  const db = await getDatabase();

  const result = await db.getAllAsync<{
    data_json: string;
    custom_image_uri: string | null;
  }>(
    `
      SELECT data_json, custom_image_uri
      FROM saved_monsters
      ORDER BY saved_at DESC;
    `
  );

  return result.map((item) => ({
    ...(JSON.parse(item.data_json) as Monster),
    customImageUri: item.custom_image_uri ?? undefined,
  }));
}

// Buscar uma criatura específica.
export async function getSavedMonsterById(
  id: string
): Promise<SavedMonster | null> {
  const db = await getDatabase();

  const result = await db.getFirstAsync<{
    data_json: string;
    custom_image_uri: string | null;
  }>(
    `
      SELECT data_json, custom_image_uri
      FROM saved_monsters
      WHERE id = ?;
    `,
    [id]
  );

  if (!result) {
    return null;
  }

  return {
    ...(JSON.parse(result.data_json) as Monster),
    customImageUri: result.custom_image_uri ?? undefined,
  };
}

// Salvar ou atualizar a imagem personalizada.
export async function updateCustomMonsterImage(
  id: string,
  imageUri: string | null
): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `
      UPDATE saved_monsters
      SET custom_image_uri = ?
      WHERE id = ?;
    `,
    [imageUri, id]
  );
}

// Verificar se uma criatura já está salva.
export async function isMonsterSaved(id: string): Promise<boolean> {
  const db = await getDatabase();

  const result = await db.getFirstAsync<{ id: string }>(
    `
      SELECT id
      FROM saved_monsters
      WHERE id = ?;
    `,
    [id]
  );

  return result !== null;
}

// Remover uma criatura salva.
export async function removeSavedMonster(id: string): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    `
      DELETE FROM saved_monsters
      WHERE id = ?;
    `,
    [id]
  );
}
