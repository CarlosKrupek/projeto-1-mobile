
import React from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { Monster } from "../types/Monster";

type CreatureCardProps = {
  creature: Monster;
  customImageUri?: string;
  onPress: () => void;
  onRemove?: () => void;
  onChangeImage?: () => void;
};

export default function CreatureCard({
  creature,
  customImageUri,
  onPress,
  onRemove,
  onChangeImage,
}: CreatureCardProps) {
  const imageUri = customImageUri || creature.image;

  return (
    <View style={styles.cardRow}>
      <Pressable
        style={styles.card}
        onPress={onPress}
        accessibilityRole="button"
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]}>
            <Text style={styles.imageFallbackText}>?</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
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

      <View style={styles.actions}>
        {onChangeImage && (
          <Pressable
            style={styles.actionButton}
            onPress={onChangeImage}
            accessibilityRole="button"
            accessibilityLabel={`Alterar imagem de ${creature.name}`}
          >
            <Text style={styles.cameraText}>📷</Text>
          </Pressable>
        )}

        {onRemove && (
          <Pressable
            style={styles.removeButton}
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remover ${creature.name}`}
          >
            <Text style={styles.removeText}>×</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: 110,
    height: 140,
  },

  imageFallback: {
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },

  imageFallbackText: {
    color: "#c9a227",
    fontSize: 35,
    fontWeight: "bold",
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

  actions: {
    marginLeft: 8,
    gap: 8,
    alignItems: "center",
  },

  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraText: {
    fontSize: 17,
  },

  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },

  removeText: {
    color: "#e57373",
    fontSize: 25,
    lineHeight: 28,
  },
});
