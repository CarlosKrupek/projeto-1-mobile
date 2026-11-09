import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { CombatSummary } from "../types/Combat";

type CombatCardProps = {
  combat: CombatSummary;
  onPress: () => void;
};

export default function CombatCard({
  combat,
  onPress,
}: CombatCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>
          {combat.name}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {combat.description}
        </Text>

        <Text style={styles.monsters}>
          {combat.monsterCount}{" "}
          {combat.monsterCount === 1
            ? "monstro"
            : "monstros"}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  content: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    color: "#c9a227",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  description: {
    color: "#cccccc",
    fontSize: 14,
    lineHeight: 20,
  },

  monsters: {
    color: "#888888",
    fontSize: 12,
    marginTop: 8,
  },

  arrow: {
    color: "#c9a227",
    fontSize: 30,
  },
});