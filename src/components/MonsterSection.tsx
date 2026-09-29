import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type MonsterAction = {
  name: string;
  description: string;
};

type MonsterSectionProps = {
  title: string;
  items: MonsterAction[];
};

export default function MonsterSection({
  title,
  items,
}: MonsterSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {items.map((item, index) => (
        <View
          key={`${item.name}-${index}`}
          style={styles.item}
        >
          <Text style={styles.itemName}>
            {item.name}.
          </Text>

          <Text style={styles.description}>
            {" "}{item.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  title: {
    color: "#c9a227",
    fontSize: 17,
    fontWeight: "bold",

    borderBottomWidth: 1,
    borderBottomColor: "#c9a227",

    paddingBottom: 4,
    marginBottom: 8,
  },

  item: {
    marginBottom: 10,
  },

  itemName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  description: {
    color: "#cccccc",
    lineHeight: 20,
    fontSize: 14,
  },
});