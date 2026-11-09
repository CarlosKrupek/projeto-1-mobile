import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import CombatMonsterCard from "../../components/CombatMonsterCard";

import { Combat } from "../../types/Combat";

import { getCombatById } from "../../database/combatRepository";

import AddMonsterModal from "../../components/AddMonsterModal";

export default function CombatDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [combat, setCombat] = useState<Combat | null>(null);
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const loadCombat = useCallback(async () => {
    if (!id) {
      setCombat(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const result = await getCombatById(id);

      setCombat(result);
    } catch (error) {
      console.error("Erro ao carregar combate:", error);
      setCombat(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadCombat();
    }, [loadCombat])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#c9a227" />

          <Text style={styles.loadingText}>
            Carregando combate...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!combat) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            Combate não encontrado.
          </Text>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>
              ← Voltar
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={combat.monsters}
        keyExtractor={(item) => item.participantId}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>
                ← Voltar
              </Text>
            </Pressable>

            <Text style={styles.title}>
              {combat.name}
            </Text>

            <Text style={styles.description}>
              {combat.description}
            </Text>

            <Text style={styles.monstersTitle}>
              Monstros
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <CombatMonsterCard
            participant={item}
            onChange={loadCombat}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum monstro neste combate.
            </Text>
          </View>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>

      {id && (
        <AddMonsterModal
          visible={addModalVisible}
          combatId={id}
          onClose={() => setAddModalVisible(false)}
          onAdded={loadCombat}
        />
      )}
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  backButton: {
    marginBottom: 15,
  },

  backText: {
    color: "#c9a227",
    fontSize: 16,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    color: "#aaaaaa",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25,
  },

  monstersTitle: {
    color: "#c9a227",
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#c9a227",
    paddingBottom: 5,
    marginBottom: 12,
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#888888",
    fontSize: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#cccccc",
    marginTop: 12,
  },

  errorText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 15,
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#c9a227",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  addButtonText: {
    color: "#0d0d0d",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 38,
  },
});