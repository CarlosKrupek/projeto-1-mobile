
import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { router, useFocusEffect } from "expo-router";

import CombatCard from "../../components/CombatCard";

import { CombatSummary } from "../../types/Combat";

import {
  createCombat,
  getCombats,
  updateCombat,
  deleteCombat,
} from "../../database/combatRepository";

export default function CombatsScreen() {
  const [combats, setCombats] = useState<CombatSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCombat, setEditingCombat] =
    useState<CombatSummary | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCombats = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getCombats();

      setCombats(result);
    } catch (error) {
      console.error("Erro ao carregar combates:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os combates."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCombats();
    }, [loadCombats])
  );

  const openCombat = (id: string) => {
    router.push({
      pathname: "/combate/[id]",
      params: { id },
    });
  };

  function openCreateModal() {
    setEditingCombat(null);
    setName("");
    setDescription("");
    setModalVisible(true);
  }

  function openEditModal(combat: CombatSummary) {
    setEditingCombat(combat);
    setName(combat.name);
    setDescription(combat.description);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditingCombat(null);
    setName("");
    setDescription("");
  }

  async function handleSaveCombat() {
    if (!name.trim()) {
      Alert.alert("Atenção", "Informe o nome do combate.");
      return;
    }

    try {
      setSaving(true);

      if (editingCombat) {
        await updateCombat(
          editingCombat.id,
          name.trim(),
          description.trim()
        );

        Alert.alert(
          "Sucesso",
          "Combate atualizado com sucesso."
        );
      } else {
        const id = await createCombat({
          name: name.trim(),
          description: description.trim(),
        });

        closeModal();
        await loadCombats();
        openCombat(id);
        return;
      }

      closeModal();
      await loadCombats();
    } catch (error) {
      console.error("Erro ao salvar combate:", error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar o combate."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleDeleteCombat(combat: CombatSummary) {
    Alert.alert(
      "Excluir combate",
      `Tem certeza que deseja excluir "${combat.name}"? Todos os monstros associados a esse combate também serão removidos.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCombat(combat.id);
              await loadCombats();

              Alert.alert(
                "Sucesso",
                "Combate excluído com sucesso."
              );
            } catch (error) {
              console.error("Erro ao excluir combate:", error);

              Alert.alert(
                "Erro",
                "Não foi possível excluir o combate."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c9a227" />

          <Text style={styles.loadingText}>
            Carregando combates...
          </Text>
        </View>
      ) : (
        <FlatList
          data={combats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>
                Meus Combates
              </Text>

              <Text style={styles.subtitle}>
                Gerencie seus combates e criaturas
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.combatContainer}>
              <CombatCard
                combat={item}
                onPress={() => openCombat(item.id)}
              />

              <View style={styles.actions}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={styles.actionText}>
                    Editar
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCombat(item)}
                >
                  <Text style={styles.actionText}>
                    Excluir
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum combate cadastrado.
            </Text>
          }
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={openCreateModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCombat ? "Editar combate" : "Novo combate"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do combate"
              placeholderTextColor="#888888"
              value={name}
              onChangeText={setName}
              editable={!saving}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Descrição do combate"
              placeholderTextColor="#888888"
              value={description}
              onChangeText={setDescription}
              multiline
              editable={!saving}
            />

            <Pressable
              style={[
                styles.saveButton,
                saving && styles.disabledButton,
              ]}
              onPress={handleSaveCombat}
              disabled={saving}
            >
              <Text style={styles.saveButtonText}>
                {saving
                  ? "Salvando..."
                  : editingCombat
                    ? "Salvar alterações"
                    : "Criar combate"}
              </Text>
            </Pressable>

            <Pressable
              onPress={closeModal}
              disabled={saving}
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999999",
    fontSize: 14,
    marginTop: 5,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#cccccc",
    marginTop: 12,
  },

  emptyText: {
    color: "#888888",
    textAlign: "center",
    marginTop: 50,
  },

  combatContainer: {
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: -5,
    marginBottom: 10,
  },

  editButton: {
    backgroundColor: "#292929",
    borderWidth: 1,
    borderColor: "#c9a227",
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  deleteButton: {
    backgroundColor: "#292929",
    borderWidth: 1,
    borderColor: "#a94442",
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  actionText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
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

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    color: "#c9a227",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#292929",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 8,
    color: "#ffffff",
    padding: 12,
    marginBottom: 12,
  },

  descriptionInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#c9a227",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.5,
  },

  saveButtonText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },

  cancelText: {
    color: "#cccccc",
    textAlign: "center",
    marginTop: 18,
  },
});
