import React from "react";

import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

type ProfileOptionProps = {
  title: string;
  onPress?: () => void;
};

export default function ProfileOption({
  title,
  onPress,
}: ProfileOptionProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 18,
    paddingHorizontal: 16,

    backgroundColor: "#1a1a1a",

    borderRadius: 10,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: "#333333",
  },

  title: {
    color: "#ffffff",
    fontSize: 16,
  },

  arrow: {
    color: "#c9a227",
    fontSize: 25,
  },
});