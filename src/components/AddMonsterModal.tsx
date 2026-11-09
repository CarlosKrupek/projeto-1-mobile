
import React, { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

import { Monster } from "../types/Monster";
import { getCreatures } from "../services/creatureService";
import { addMonsterToCombat } from "../database/combatRepository";

type AddMonsterModalProps = {
  visible: boolean;
  combatId: string;
  onClose: () => void;
  onAdded: () => void;
};

export default function AddMonsterModal({
  visible,
  combatId,
  onClose,
  onAdded,
}: AddMonsterModalProps) {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;

    let active = true;

    async function loadMonsters() {
      try {
        setLoading(true);
        const result = await getCreatures();

        if (active) {
          setMonsters(result);
        }
      } catch (error) {
        console.error("Erro ao carregar criaturas:", error);
        Alert.alert(
          "Erro",
          "Não foi possível carregar as criaturas."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMonsters();

    return () => {
      active = false;
    };
  }, [visible]);

  const filteredMonsters = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return monsters;

    return monsters.filter((monster) =>
      monster.name.toLowerCase().includes(normalizedSearch)
    );
  }, [monsters, search]);

  async function handleAddMonster(monster: Monster) {
    try {
      setAddingId(monster.id);

      await addMonsterToCombat(combatId, monster);

      onAdded();
      onClose();
      setSearch("");
    } catch (error) {
      console.error("Erro ao adicionar criatura:", error);
      Alert.alert(
        "Erro",
        "Não foi possível adicionar esta criatura ao combate."
      );
    } finally {
      setAddingId(null);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Adicionar criatura</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar criatura..."
            placeholderTextColor="#888888"
            value={search}
            onChangeText={setSearch}
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#c9a227" />
              <Text style={styles.loadingText}>
                Carregando criaturas...
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMonsters}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma criatura encontrada.
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.monsterItem}>
                  <View style={styles.monsterInfo}>
                    <Text style={styles.monsterName}>
                      {item.name}
                    </Text>

                    <Text style={styles.monsterDetails}>
                      CA: {item.armorClass} · PV: {item.hitPoints}
                    </Text>
                  </View>

                  <Pressable
                    style={[
                      styles.addButton,
                      addingId === item.id && styles.disabledButton,
                    ]}
                    disabled={addingId !== null}
                    onPress={() => handleAddMonster(item)}
                  >
                    <Text style={styles.addButtonText}>
                      {addingId === item.id ? "..." : "+"}
                    </Text>
                  </Pressable>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: 16,
  },

  container: {
    maxHeight: "85%",
    backgroundColor: "#171717",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#333333",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  title: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
  },

  closeButton: {
    color: "#c9a227",
    fontSize: 23,
    paddingHorizontal: 5,
  },

  searchInput: {
    backgroundColor: "#252525",
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 12,
    fontSize: 15,
  },

  loadingContainer: {
    padding: 35,
    alignItems: "center",
  },

  loadingText: {
    color: "#cccccc",
    marginTop: 12,
  },

  emptyText: {
    color: "#999999",
    textAlign: "center",
    padding: 25,
  },

  monsterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222222",
    borderRadius: 9,
    padding: 12,
    marginBottom: 9,
  },

  monsterInfo: {
    flex: 1,
    paddingRight: 10,
  },

  monsterName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  monsterDetails: {
    color: "#999999",
    fontSize: 12,
    marginTop: 5,
  },

  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#c9a227",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  addButtonText: {
    color: "#111111",
    fontSize: 25,
    lineHeight: 28,
  },
});
