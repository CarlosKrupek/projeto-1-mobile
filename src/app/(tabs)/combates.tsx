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

import { combats } from "../../constants/combats";

import CombatCard from "../../components/CombatCard";

export default function CombatsScreen() {
  const openCombat = (id: string) => {
    router.push({
      pathname: "/combate/[id]",
      params: { id },
    });
  };

  const handleAddCombat = () => {
    console.log("Botão + de novo combate foi apertado");
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <CombatCard
            combat={item}
            onPress={() => openCombat(item.id)}
          />
        )}
      />

      <Pressable
        style={styles.addButton}
        onPress={handleAddCombat}
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