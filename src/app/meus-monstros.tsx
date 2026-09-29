import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

import { router } from "expo-router";

import { myMonsters } from "../constants/myMonsters";

import CreatureCard from "../components/CreatureCard";

export default function MyMonstersScreen() {
  const openMonster = (id: string) => {
    router.push({
      pathname: "/monstros/[id]",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myMonsters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>
                ← Voltar
              </Text>
            </Pressable>

            <Text style={styles.title}>
              Meus Monstros
            </Text>

            <Text style={styles.subtitle}>
              Monstros salvos para suas aventuras
            </Text>
          </View>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Nenhum monstro salvo
            </Text>

            <Text style={styles.emptyText}>
              Seus monstros salvos aparecerão aqui.
            </Text>
          </View>
        }

        renderItem={({ item }) => (
          <CreatureCard
            creature={item}
            onPress={() => openMonster(item.id)}
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

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#888888",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});