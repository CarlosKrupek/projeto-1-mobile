import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { creatures } from "../../constants/creatures";

import MonsterHeader from "../../components/MonsterHeader";

import MonsterStatBlock from "../../components/MonsterStatBlock";

import MonsterSection from "../../components/MonsterSection";

export default function MonsterDetailsScreen() {
  const { id } = useLocalSearchParams();

  const monster = creatures.find((item) => item.id === id);

  if (!monster) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.error}>Criatura não encontrada.</Text>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>

        <MonsterHeader
          name={monster.name}
          image={monster.image}
          size={monster.size}
          type={monster.type}
          alignment={monster.alignment}
        />

        <View style={styles.mainInfo}>
          <Text style={styles.info}>
            <Text style={styles.label}>CA:</Text> {monster.armorClass}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>PV:</Text> {monster.hitPoints}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Iniciativa:</Text> {monster.initiative}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Deslocamento:</Text> {monster.speed}
          </Text>
        </View>

        <MonsterStatBlock abilities={monster.abilities} />

        <View style={styles.infoSection}>
          <Text style={styles.info}>
            <Text style={styles.label}>Perícias:</Text> {monster.skills}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Resistências:</Text>{" "}
            {monster.damageResistances}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Imunidades:</Text>{" "}
            {monster.damageImmunities}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Imunidades de condição:</Text>{" "}
            {monster.conditionImmunities}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Sentidos:</Text> {monster.senses}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Idiomas:</Text> {monster.languages}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>ND:</Text> {monster.challenge}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>XP:</Text> {monster.xp}
          </Text>
        </View>

        <MonsterSection title="TRAÇOS" items={monster.traits} />

        <MonsterSection title="AÇÕES" items={monster.actions} />

        <MonsterSection title="AÇÕES BÔNUS" items={monster.bonusActions} />

        <MonsterSection title="REAÇÕES" items={monster.reactions} />

        <MonsterSection
          title="AÇÕES LENDÁRIAS"
          items={monster.legendaryActions}
        />

        <MonsterSection title="AÇÕES DE COVIL" items={monster.lairActions} />

        <MonsterSection
          title="EFEITOS REGIONAIS"
          items={monster.regionalEffects}
        />
      </ScrollView>
        <Pressable
          style={styles.addButton}
          onPress={() => {console.log("Botão + de salvar criatura")}}
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

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 12,
  },

  backText: {
    color: "#c9a227",
    fontSize: 16,
  },

  mainInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "#444444",

    paddingBottom: 10,
  },

  infoSection: {
    marginTop: 5,
  },

  info: {
    color: "#cccccc",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 3,
  },

    label: {
    color: "#ffffff",
    fontWeight: "bold",
    },

    errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },

    error: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 20,
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
