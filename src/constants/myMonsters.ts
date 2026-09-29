import { creatures, Monster } from "./creatures";

/*
 * Dados mockados dos monstros salvos pelo usuário.
 *
 * Por enquanto estamos reutilizando criaturas existentes
 * apenas para simular os monstros que o usuário possui.
 *
 * Futuramente estes dados virão de um banco de dados.
 */

export const myMonsters: Monster[] = [
  creatures[0],
];