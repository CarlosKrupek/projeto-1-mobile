import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

type MonsterHeaderProps = {
  name: string;
  image: string;
  size: string;
  type: string;
  alignment: string;
};

export default function MonsterHeader({
  name,
  image,
  size,
  type,
  alignment,
}: MonsterHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.subtitle}>
          {size} {type}, {alignment}
        </Text>
      </View>

      <Image
        source={{ uri: image }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    borderBottomWidth: 1,
    borderBottomColor: "#c9a227",

    paddingBottom: 10,
    marginBottom: 10,
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    color: "#c9a227",
    fontSize: 21,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#cccccc",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: "#c9a227",
  },
});