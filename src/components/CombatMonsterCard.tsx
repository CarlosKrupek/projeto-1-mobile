import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import { Monster } from "../constants/creatures";

type CombatMonsterCardProps = {
  monster: Monster;
};

export default function CombatMonsterCard({
  monster,
}: CombatMonsterCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleOpenSheet = () => {
    router.push({
      pathname: "/monstros/[id]",
      params: {
        id: monster.id,
      },
    });
  };

  return (
    <View style={styles.card}>
      <Pressable
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.name}>
            {monster.name}
          </Text>

          <View style={styles.mainStats}>
            <Text style={styles.stat}>
              CA: {monster.armorClass}
            </Text>

            <Text style={styles.stat}>
              PV Máx: {getMaxHitPoints(monster.hitPoints)}
            </Text>
          </View>
        </View>

        <Text style={styles.arrow}>
          {expanded ? "▲" : "▼"}
        </Text>
      </Pressable>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.sectionTitle}>
            ATRIBUTOS
          </Text>

          <View style={styles.attributes}>
            <Attribute
              name="FOR"
              score={monster.abilities.str.score}
              modifier={monster.abilities.str.modifier}
            />

            <Attribute
              name="DES"
              score={monster.abilities.dex.score}
              modifier={monster.abilities.dex.modifier}
            />

            <Attribute
              name="CON"
              score={monster.abilities.con.score}
              modifier={monster.abilities.con.modifier}
            />

            <Attribute
              name="INT"
              score={monster.abilities.int.score}
              modifier={monster.abilities.int.modifier}
            />

            <Attribute
              name="SAB"
              score={monster.abilities.wis.score}
              modifier={monster.abilities.wis.modifier}
            />

            <Attribute
              name="CAR"
              score={monster.abilities.cha.score}
              modifier={monster.abilities.cha.modifier}
            />
          </View>

          <Text style={styles.sectionTitle}>
            PERÍCIAS
          </Text>

          <Text style={styles.skills}>
            {monster.skills}
          </Text>

          <Pressable
            style={styles.sheetButton}
            onPress={handleOpenSheet}
          >
            <Text style={styles.sheetButtonText}>
              Ver ficha completa
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

type AttributeProps = {
  name: string;
  score: number;
  modifier: number;
};

function Attribute({
  name,
  score,
  modifier,
}: AttributeProps) {
  return (
    <View style={styles.attribute}>
      <Text style={styles.attributeName}>
        {name}
      </Text>

      <Text style={styles.attributeScore}>
        {score}
      </Text>

      <Text style={styles.attributeModifier}>
        {modifier >= 0
          ? `+${modifier}`
          : modifier}
      </Text>
    </View>
  );
}

function getMaxHitPoints(
  hitPoints: string
): string {
  const match = hitPoints.match(/^\d+/);

  return match
    ? match[0]
    : hitPoints;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",

    borderWidth: 1,

    borderColor: "#333333",

    borderRadius: 10,

    marginBottom: 12,

    overflow: "hidden",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    padding: 15,
  },

  titleContainer: {
    flex: 1,
  },

  name: {
    color: "#ffffff",

    fontSize: 16,

    fontWeight: "bold",

    marginBottom: 10,
  },

  mainStats: {
    flexDirection: "row",

    gap: 15,
  },

  stat: {
    color: "#c9a227",

    fontSize: 13,

    fontWeight: "bold",
  },

  arrow: {
    color: "#c9a227",

    fontSize: 16,

    marginLeft: 10,
  },

  expandedContent: {
    borderTopWidth: 1,

    borderTopColor: "#333333",

    padding: 15,
  },

  sectionTitle: {
    color: "#c9a227",

    fontSize: 14,

    fontWeight: "bold",

    borderBottomWidth: 1,

    borderBottomColor: "#c9a227",

    paddingBottom: 4,

    marginBottom: 10,

    marginTop: 5,
  },

  attributes: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 10,
  },

  attribute: {
    alignItems: "center",

    flex: 1,
  },

  attributeName: {
    color: "#c9a227",

    fontSize: 11,

    fontWeight: "bold",
  },

  attributeScore: {
    color: "#ffffff",

    fontSize: 15,

    fontWeight: "bold",

    marginTop: 2,
  },

  attributeModifier: {
    color: "#999999",

    fontSize: 11,
  },

  skills: {
    color: "#cccccc",

    fontSize: 13,

    lineHeight: 20,

    marginBottom: 15,
  },

  sheetButton: {
    backgroundColor: "#c9a227",

    paddingVertical: 11,

    borderRadius: 7,

    alignItems: "center",
  },

  sheetButtonText: {
    color: "#0d0d0d",

    fontWeight: "bold",

    fontSize: 14,
  },
});