
import { api } from "./api";
import { mapApiMonster } from "../utils/monsterMapper";
import { Monster } from "../types/Monster";

type BestiaryResponse = {
  monster: any[];
};

let creaturesCache: Monster[] | null = null;

export async function getCreatures(
  forceRefresh = false
): Promise<Monster[]> {

  if (creaturesCache && !forceRefresh) {
    return creaturesCache;
  }

  const response = await api.get<BestiaryResponse>(
    "/bestiary/bestiary-xmm.json"
  );

  creaturesCache = response.data.monster.map(mapApiMonster);

  return creaturesCache;
}

export async function getCreatureById(
  id: string
): Promise<Monster | undefined> {

  const creatures = await getCreatures();

  return creatures.find((monster) => monster.id === id);
}
