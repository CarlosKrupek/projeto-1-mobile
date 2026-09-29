import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Ability = {
  score: number;
  modifier: number;
  save?: number;
};

type MonsterStatBlockProps = {
  abilities: {
    str: Ability;
    dex: Ability;
    con: Ability;
    int: Ability;
    wis: Ability;
    cha: Ability;
  };
};

const labels = [
  { key: "str", name: "FOR" },
  { key: "dex", name: "DES" },
  { key: "con", name: "CON" },
  { key: "int", name: "INT" },
  { key: "wis", name: "SAB" },
  { key: "cha", name: "CAR" },
];

export default function MonsterStatBlock({
  abilities,
}: MonsterStatBlockProps) {
  return (
    <View style={styles.container}>
      {labels.map((item) => {
        const ability =
          abilities[item.key as keyof typeof abilities];

        return (
          <View
            key={item.key}
            style={styles.stat}
          >
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.score}>
              {ability.score}
            </Text>

            <Text style={styles.modifier}>
              {ability.modifier >= 0
                ? `+${ability.modifier}`
                : ability.modifier}
            </Text>

            {ability.save !== undefined && (
              <Text style={styles.save}>
                TR {ability.save >= 0
                  ? `+${ability.save}`
                  : ability.save}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#181818",

    borderRadius: 8,

    padding: 8,

    marginVertical: 10,
  },

  stat: {
    alignItems: "center",
    flex: 1,
  },

  name: {
    color: "#c9a227",
    fontWeight: "bold",
    fontSize: 12,
  },

  score: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modifier: {
    color: "#aaaaaa",
    fontSize: 12,
  },

  save: {
    color: "#79bfff",
    fontSize: 11,
  },
});