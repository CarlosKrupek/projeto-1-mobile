
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  Pressable,
} from "react-native";

import {
  getLastSearch,
  saveLastSearch,
} from "../../storage/settingsStorage";

import { router } from "expo-router";

import { getCreatures } from "../../services/creatureService";

import { Monster } from "../../types/Monster";

import CreatureCard from "../../components/CreatureCard";

export default function HomeScreen() {
  const [creatures, setCreatures] = useState<Monster[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [retry, setRetry] = useState(0);

  const [searchLoaded, setSearchLoaded] = useState(false);

  // Recuperar a última pesquisa ao abrir a Home.
  useEffect(() => {
    let active = true;

    async function restoreSearch() {
      const lastSearch = await getLastSearch();

      if (active) {
        setSearch(lastSearch);
        setSearchLoaded(true);
      }
    }

    restoreSearch();

    return () => {
      active = false;
    };
  }, []);


  // Salvar a pesquisa sempre que ela for modificada.
  useEffect(() => {
    if (!searchLoaded) return;

    const timeout = setTimeout(() => {
      saveLastSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, searchLoaded]);

  // Carrega as criaturas do Livro dos Monstros.
  useEffect(() => {
    let active = true;

    async function loadCreatures() {
      try {
        setLoading(true);
        setError("");

        const data = await getCreatures();

        if (active) {
          setCreatures(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar as criaturas."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCreatures();

    return () => {
      active = false;
    };
  }, [retry]);

  // Atualiza os dados do bestiário.
  async function refreshCreatures() {
    try {
      setRefreshing(true);
      setError("");

      const data = await getCreatures(true);

      setCreatures(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao atualizar as criaturas."
      );
    } finally {
      setRefreshing(false);
    }
  }

  // Abre a ficha individual da criatura.
  function openCreature(id: string) {
    router.push({
      pathname: "/monstros/[id]",
      params: { id },
    });
  }

  // Filtra as criaturas pelo nome.
  const filteredCreatures = creatures.filter((creature) =>
    creature.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Estado de carregamento inicial.
  if (loading && creatures.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color="#c9a227"
          />

          <Text style={styles.loadingText}>
            Carregando bestiário...
          </Text>

          <Text style={styles.loadingSubtitle}>
            Buscando criaturas do Livro dos Monstros
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Estado de erro sem criaturas carregadas.
  if (error && creatures.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>
            Não foi possível carregar o bestiário.
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => setRetry((previous) => previous + 1)}
          >
            <Text style={styles.retryText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredCreatures}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshCreatures}
            tintColor="#c9a227"
            colors={["#c9a227"]}
          />
        }

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>
              Descobertas
            </Text>

            <Text style={styles.subtitle}>
              Encontre novas criaturas para suas aventuras
            </Text>

            <Text style={styles.source}>
              BESTIÁRIO • D&D 2024
            </Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar criatura..."
              placeholderTextColor="#777777"
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.counter}>
              {filteredCreatures.length} criaturas encontradas
            </Text>

            {error !== "" && (
              <Text style={styles.warningText}>
                Não foi possível atualizar os dados.
                Exibindo os dados já carregados.
              </Text>
            )}
          </View>
        }

        renderItem={({ item }) => (
          <CreatureCard
            creature={item}
            onPress={() => openCreature(item.id)}
          />
        )}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma criatura encontrada.
            </Text>

            <Text style={styles.emptySubtitle}>
              Tente pesquisar por outro nome.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  list: {
    padding: 16,
    paddingBottom: 30,
    flexGrow: 1,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999999",
    fontSize: 15,
    marginTop: 5,
  },

  source: {
    color: "#c9a227",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginTop: 12,
  },

  searchInput: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    color: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 18,
    fontSize: 14,
  },

  counter: {
    color: "#999999",
    fontSize: 12,
    marginTop: 12,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 18,
  },

  loadingSubtitle: {
    color: "#999999",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },

  errorTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  errorText: {
    color: "#aaaaaa",
    textAlign: "center",
    marginTop: 12,
  },

  retryButton: {
    backgroundColor: "#c9a227",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 22,
  },

  retryText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  emptySubtitle: {
    color: "#999999",
    marginTop: 8,
  },

  warningText: {
    color: "#d9a441",
    fontSize: 12,
    marginTop: 10,
  },
});
