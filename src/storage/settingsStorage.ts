
import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_KEY = "@gerenciador_monstros:home_search";

// Recuperar a última pesquisa.
export async function getLastSearch(): Promise<string> {
  try {
    const search = await AsyncStorage.getItem(SEARCH_KEY);

    return search ?? "";
  } catch (error) {
    console.error("Erro ao recuperar pesquisa:", error);
    return "";
  }
}

// Salvar a pesquisa atual.
export async function saveLastSearch(search: string): Promise<void> {
  try {
    await AsyncStorage.setItem(SEARCH_KEY, search);
  } catch (error) {
    console.error("Erro ao salvar pesquisa:", error);
  }
}

// Limpar a pesquisa armazenada.
export async function clearLastSearch(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SEARCH_KEY);
  } catch (error) {
    console.error("Erro ao limpar pesquisa:", error);
  }
}
