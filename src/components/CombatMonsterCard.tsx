import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { CombatParticipant } from "../types/Combat";

import {
  removeMonsterFromCombat,
  updateMonsterHitPoints,
} from "../database/combatRepository";

type Props = {
  participant: CombatParticipant;
  onChange: () => void;
};

export default function CombatMonsterCard({
  participant,
  onChange,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const monster = participant.monster;

  const handleOpenSheet = () => {
    router.push({
      pathname: "/monstros/[id]",
      params: { id: monster.id },
    });
  };

  const changeHitPoints = async (amount: number) => {
    const newHitPoints = Math.max(
      0,
      Math.min(
        participant.maxHitPoints,
        participant.currentHitPoints + amount
      )
    );

    try {
      await updateMonsterHitPoints(
        participant.participantId,
        newHitPoints
      );

      onChange();
    } catch (error) {
      console.error("Erro ao atualizar PV:", error);
      Alert.alert("Erro", "Não foi possível atualizar os PV.");
    }
  };

  const handleRemove = () => {
    Alert.alert(
      "Remover criatura",
      `Deseja remover ${monster.name} deste combate?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            await removeMonsterFromCombat(
              participant.participantId
            );

            onChange();
          },
        },
      ]
    );
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
              PV: {participant.currentHitPoints}/
              {participant.maxHitPoints}
            </Text>
          </View>
        </View>

        <Text style={styles.arrow}>
          {expanded ? "▲" : "▼"}
        </Text>
      </Pressable>

      <View style={styles.hpControls}>
        <Pressable
          style={styles.hpButton}
          onPress={() => changeHitPoints(-1)}
        >
          <Text style={styles.hpButtonText}>−</Text>
        </Pressable>

        <Text style={styles.hpValue}>
          {participant.currentHitPoints} PV
        </Text>

        <Pressable
          style={styles.hpButton}
          onPress={() => changeHitPoints(1)}
        >
          <Text style={styles.hpButtonText}>+</Text>
        </Pressable>
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.sectionTitle}>
            ATRIBUTOS
          </Text>

          <View style={styles.attributes}>
            <Attribute name="FOR" ability={monster.abilities.str} />
            <Attribute name="DES" ability={monster.abilities.dex} />
            <Attribute name="CON" ability={monster.abilities.con} />
            <Attribute name="INT" ability={monster.abilities.int} />
            <Attribute name="SAB" ability={monster.abilities.wis} />
            <Attribute name="CAR" ability={monster.abilities.cha} />
          </View>

          <Text style={styles.sectionTitle}>
            TESTES DE RESISTÊNCIA
          </Text>

          <View style={styles.saves}>
            {(
              [
                ["FOR", monster.abilities.str],
                ["DES", monster.abilities.dex],
                ["CON", monster.abilities.con],
                ["INT", monster.abilities.int],
                ["SAB", monster.abilities.wis],
                ["CAR", monster.abilities.cha],
              ] as const
            ).map(([name, ability]) => (
              <View key={name} style={styles.saveItem}>
                <Text style={styles.saveName}>{name}</Text>

                <Text style={styles.saveValue}>
                  {ability.save === undefined
                    ? "—"
                    : ability.save >= 0
                      ? `+${ability.save}`
                      : ability.save}
                </Text>
              </View>
            ))}
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

          <Pressable
            style={styles.removeButton}
            onPress={handleRemove}
          >
            <Text style={styles.removeButtonText}>
              Remover do combate
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

type AttributeProps = {
  name: string;
  ability: {
    score: number;
    modifier: number;
  };
};

function Attribute({ name, ability }: AttributeProps) {
  return (
    <View style={styles.attribute}>
      <Text style={styles.attributeName}>{name}</Text>
      <Text style={styles.attributeScore}>
        {ability.score}
      </Text>
      <Text style={styles.attributeModifier}>
        {ability.modifier >= 0
          ? `+${ability.modifier}`
          : ability.modifier}
      </Text>
    </View>
  );
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

  hpControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingBottom: 12,
  },

  hpButton: {
    backgroundColor: "#333333",
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  hpButtonText: {
    color: "#c9a227",
    fontSize: 22,
    fontWeight: "bold",
  },

  hpValue: {
    color: "#ffffff",
    fontWeight: "bold",
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

  saves: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  saveItem: {
    alignItems: "center",
    flex: 1,
  },

  saveName: {
    color: "#c9a227",
    fontSize: 11,
    fontWeight: "bold",
  },

  saveValue: {
    color: "#ffffff",
    fontSize: 13,
    marginTop: 3,
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

  removeButton: {
    borderWidth: 1,
    borderColor: "#a33",
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 10,
  },

  removeButtonText: {
    color: "#e07070",
    fontWeight: "bold",
    fontSize: 13,
  },
});