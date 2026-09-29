import React from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { Monster } from "../constants/creatures";

type CreatureCardProps = {
  creature: Monster;
  onPress: () => void;
};

export default function CreatureCard({
  creature,
  onPress,
}: CreatureCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{ uri: creature.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {creature.name}
        </Text>

        <Text style={styles.type}>
          {creature.size} {creature.type}
        </Text>

        <Text style={styles.alignment}>
          {creature.alignment}
        </Text>

        <View style={styles.stats}>
          <Text style={styles.stat}>
            CA {creature.armorClass}
          </Text>

          <Text style={styles.stat}>
            PV {creature.hitPoints}
          </Text>

          <Text style={styles.stat}>
            ND {creature.challenge}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: "#1a1a1a",

    borderWidth: 1,
    borderColor: "#333333",

    borderRadius: 10,

    marginBottom: 12,

    overflow: "hidden",
  },

  image: {
    width: 110,
    height: 140,
  },

  info: {
    flex: 1,

    padding: 12,

    justifyContent: "center",
  },

  name: {
    color: "#c9a227",

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 5,
  },

  type: {
    color: "#dddddd",

    fontSize: 14,

    marginBottom: 3,
  },

  alignment: {
    color: "#999999",

    fontSize: 13,

    fontStyle: "italic",

    marginBottom: 12,
  },

  stats: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 8,
  },

  stat: {
    color: "#ffffff",

    fontSize: 12,

    backgroundColor: "#292929",

    paddingHorizontal: 7,

    paddingVertical: 4,

    borderRadius: 5,
  },
});