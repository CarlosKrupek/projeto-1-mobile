import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  combats,
} from "../../constants/combats";

import {
  creatures,
} from "../../constants/creatures";

import CombatMonsterCard from "../../components/CombatMonsterCard";

export default function CombatDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const combat = combats.find(
    (item) => item.id === id
  );

  if (!combat) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Combate não encontrado.
          </Text>

          <Pressable
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>
              ← Voltar
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const combatMonsters = combat.monsterIds
  .map((monsterId, index) => {
    const monster = creatures.find(
      (item) => item.id === monsterId
    );

    if (!monster) {
      return null;
    }

    return {
      ...monster,

      combatInstanceId: `${monster.id}-${index}`,
    };
  })
  .filter(
    (monster): monster is NonNullable<typeof monster> =>
      monster !== null
  );

  const handleAddMonster = () => {
    console.log(
      "Botão + de adicionar monstro foi apertado"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={combatMonsters}
        keyExtractor={(item) => item.combatInstanceId}
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
            monster={item}
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
        onPress={handleAddMonster}
      >
        <Text style={styles.addButtonText}>
          +
        </Text>
      </Pressable>
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

  errorContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
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

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.3,

    shadowRadius: 5,
  },

  addButtonText: {
    color: "#0d0d0d",

    fontSize: 34,

    fontWeight: "300",

    lineHeight: 38,
  },
});