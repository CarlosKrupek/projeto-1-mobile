
import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

import {
  router,
  useFocusEffect,
} from "expo-router";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

import {
  getSavedMonsters,
  removeSavedMonster,
  updateCustomMonsterImage,
  SavedMonster,
} from "../database/monsterRepository";

import CreatureCard from "../components/CreatureCard";

export default function MyMonstersScreen() {
  const [monsters, setMonsters] = useState<SavedMonster[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Buscar monstros salvos no SQLite.
  const loadMonsters = useCallback(async () => {
    try {
      setError("");

      const savedMonsters = await getSavedMonsters();

      setMonsters(savedMonsters);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os monstros."
      );
    }
  }, []);

  // Atualizar a tela sempre que ela receber foco.
  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function load() {
        setLoading(true);

        try {
          setError("");

          const savedMonsters = await getSavedMonsters();

          if (active) {
            setMonsters(savedMonsters);
          }
        } catch (err) {
          if (active) {
            setError(
              err instanceof Error
                ? err.message
                : "Não foi possível carregar os monstros."
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      }

      load();

      return () => {
        active = false;
      };
    }, [])
  );

  // Atualizar manualmente.
  async function refreshMonsters() {
    try {
      setRefreshing(true);
      await loadMonsters();
    } finally {
      setRefreshing(false);
    }
  }

  // Abrir ficha da criatura.
  function openMonster(id: string) {
    router.push({
      pathname: "/monstros/[id]",
      params: { id },
    });
  }

  // Copiar a imagem selecionada para o armazenamento permanente.
  async function saveImageLocally(
    sourceUri: string,
    monsterId: string,
    fileName?: string | null
  ): Promise<string> {
    if (!FileSystem.documentDirectory) {
      throw new Error("O armazenamento local não está disponível.");
    }

    const directory = `${FileSystem.documentDirectory}monster-images/`;

    await FileSystem.makeDirectoryAsync(directory, {
      intermediates: true,
    });

    const extensionFromName = fileName?.match(/\.[a-zA-Z0-9]+$/)?.[0];
    const extensionFromUri = sourceUri.match(/\.[a-zA-Z0-9]+(?=\?|$)/)?.[0];

    const extension = extensionFromName || extensionFromUri || ".jpg";

    const safeMonsterId = monsterId.replace(/[^a-zA-Z0-9_-]/g, "_");

    const destinationUri =
      `${directory}${safeMonsterId}_${Date.now()}${extension}`;

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });

    return destinationUri;
  }

  // Selecionar uma imagem da galeria.
  async function chooseFromGallery(monster: SavedMonster) {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para escolher uma imagem."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets.length) {
      return;
    }

    await saveMonsterImage(
      monster,
      result.assets[0].uri,
      result.assets[0].fileName
    );
  }

  // Tirar uma foto com a câmera.
  async function takePhoto(monster: SavedMonster) {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para tirar uma foto."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets.length) {
      return;
    }

    await saveMonsterImage(
      monster,
      result.assets[0].uri,
      result.assets[0].fileName
    );
  }

  // Salvar a imagem escolhida e atualizar o cartão.
  async function saveMonsterImage(
    monster: SavedMonster,
    sourceUri: string,
    fileName?: string | null
  ) {
    let newImageUri: string | null = null;

    try {
      newImageUri = await saveImageLocally(
        sourceUri,
        monster.id,
        fileName
      );

      await updateCustomMonsterImage(monster.id, newImageUri);

      setMonsters((previous) =>
        previous.map((item) =>
          item.id === monster.id
            ? { ...item, customImageUri: newImageUri! }
            : item
        )
      );
    } catch (err) {
      if (newImageUri) {
        await FileSystem.deleteAsync(newImageUri, {
          idempotent: true,
        }).catch(() => {});
      }

      Alert.alert(
        "Erro",
        err instanceof Error
          ? err.message
          : "Não foi possível salvar a imagem."
      );
    }
  }

  // Remover a imagem personalizada.
  async function removeCustomImage(monster: SavedMonster) {
    try {
      await updateCustomMonsterImage(monster.id, null);

      if (monster.customImageUri) {
        await FileSystem.deleteAsync(monster.customImageUri, {
          idempotent: true,
        }).catch(() => {});
      }

      setMonsters((previous) =>
        previous.map((item) =>
          item.id === monster.id
            ? { ...item, customImageUri: undefined }
            : item
        )
      );
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível remover a imagem personalizada."
      );
    }
  }

  // Exibir as opções de imagem.
  function showImageOptions(monster: SavedMonster) {
    const options = [
      {
        text: "Escolher da galeria",
        onPress: () => chooseFromGallery(monster),
      },
      {
        text: "Tirar uma foto",
        onPress: () => takePhoto(monster),
      },
    ];

    if (monster.customImageUri) {
      options.push({
        text: "Remover imagem personalizada",
        onPress: () => removeCustomImage(monster),
      });
    }

    Alert.alert(
      `Imagem de ${monster.name}`,
      "Como deseja alterar a imagem desta criatura?",
      [
        ...options,
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel" as const,
        },
      ]
    );
  }

  // Confirmar remoção da criatura.
  function confirmRemove(monster: SavedMonster) {
    Alert.alert(
      "Remover criatura",
      `Deseja remover ${monster.name} de Meus Monstros?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await removeSavedMonster(monster.id);

              if (monster.customImageUri) {
                await FileSystem.deleteAsync(
                  monster.customImageUri,
                  { idempotent: true }
                ).catch(() => {});
              }

              setMonsters((previous) =>
                previous.filter((item) => item.id !== monster.id)
              );
            } catch {
              Alert.alert(
                "Erro",
                "Não foi possível remover a criatura."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={monsters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshMonsters}
            tintColor="#c9a227"
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>← Voltar</Text>
            </Pressable>

            <Text style={styles.title}>Meus Monstros</Text>

            <Text style={styles.subtitle}>
              Monstros salvos para suas aventuras
            </Text>

            <Text style={styles.counter}>
              {monsters.length} criaturas salvas
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <>
                <ActivityIndicator
                  size="large"
                  color="#c9a227"
                />

                <Text style={styles.emptyText}>
                  Carregando monstros...
                </Text>
              </>
            ) : error ? (
              <>
                <Text style={styles.emptyTitle}>
                  Erro ao carregar
                </Text>

                <Text style={styles.emptyText}>{error}</Text>

                <Pressable
                  style={styles.retryButton}
                  onPress={loadMonsters}
                >
                  <Text style={styles.retryText}>
                    Tentar novamente
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>
                  Nenhum monstro salvo
                </Text>

                <Text style={styles.emptyText}>
                  Suas criaturas salvas aparecerão aqui.
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <CreatureCard
            creature={item}
            customImageUri={item.customImageUri}
            onPress={() => openMonster(item.id)}
            onRemove={() => confirmRemove(item)}
            onChangeImage={() => showImageOptions(item)}
          />
        )}
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

  backButton: {
    marginBottom: 16,
  },

  backText: {
    color: "#c9a227",
    fontSize: 16,
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

  counter: {
    color: "#c9a227",
    fontSize: 13,
    marginTop: 12,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyText: {
    color: "#888888",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#c9a227",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },

  retryText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },
});
