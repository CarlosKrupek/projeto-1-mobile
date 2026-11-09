
import { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { getCreatureById } from "../../services/creatureService";

import {
  getSavedMonsterById,
  isMonsterSaved,
  saveMonster,
  removeSavedMonster,
} from "../../database/monsterRepository";

import { Monster } from "../../types/Monster";

import MonsterHeader from "../../components/MonsterHeader";
import MonsterStatBlock from "../../components/MonsterStatBlock";
import MonsterSection from "../../components/MonsterSection";

export default function MonsterDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [monster, setMonster] = useState<Monster | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [retry, setRetry] = useState(0);

  const [isSaved, setIsSaved] = useState(false);

  const [saving, setSaving] = useState(false);

  // Carregar criatura e verificar se já está salva.
  useEffect(() => {
    let active = true;

    async function loadMonster() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("Identificador da criatura inválido.");
        }

        const saved = await isMonsterSaved(id);

        let result: Monster | null = null;

        try {
          result = (await getCreatureById(id)) ?? null;
        } catch {
          // A API pode estar indisponível.
          // Nesse caso, tentaremos recuperar pelo SQLite.
        }

        if (!result) {
          result = await getSavedMonsterById(id);
        }

        if (!result) {
          throw new Error("Criatura não encontrada.");
        }

        if (active) {
          setMonster(result);
          setIsSaved(saved);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar a criatura."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMonster();

    return () => {
      active = false;
    };
  }, [id, retry]);

  // Salvar ou remover criatura.
  async function toggleSavedMonster() {
    if (!monster || saving) return;

    try {
      setSaving(true);

      if (isSaved) {
        await removeSavedMonster(monster.id);

        setIsSaved(false);

        Alert.alert(
          "Criatura removida",
          `${monster.name} foi removido de Meus Monstros.`
        );
      } else {
        await saveMonster(monster);

        setIsSaved(true);

        Alert.alert(
          "Criatura salva!",
          `${monster.name} foi adicionado a Meus Monstros.`
        );
      }
    } catch (err) {
      Alert.alert(
        "Erro",
        err instanceof Error
          ? err.message
          : "Não foi possível salvar a criatura."
      );
    } finally {
      setSaving(false);
    }
  }

  // Carregamento.
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color="#c9a227"
          />

          <Text style={styles.loadingText}>
            Carregando criatura...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Erro.
  if (error || !monster) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.error}>
            {error || "Criatura não encontrada."}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => setRetry((previous) => previous + 1)}
          >
            <Text style={styles.retryText}>
              Tentar novamente
            </Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>
              Voltar
            </Text>
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
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ← Voltar
          </Text>
        </Pressable>

        <MonsterHeader
          name={monster.name}
          image={monster.image ?? ""}
          size={monster.size}
          type={monster.type}
          alignment={monster.alignment}
        />

        <View style={styles.mainInfo}>
          <Text style={styles.info}>
            <Text style={styles.label}>CA:</Text>{" "}
            {monster.armorClass}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>PV:</Text>{" "}
            {monster.hitPoints}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Iniciativa:</Text>{" "}
            {monster.initiative}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Deslocamento:</Text>{" "}
            {monster.speed}
          </Text>
        </View>

        <MonsterStatBlock
          abilities={monster.abilities}
        />

        <View style={styles.infoSection}>
          <Text style={styles.info}>
            <Text style={styles.label}>Perícias:</Text>{" "}
            {monster.skills}
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
            <Text style={styles.label}>
              Imunidades de condição:
            </Text>{" "}
            {monster.conditionImmunities}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Sentidos:</Text>{" "}
            {monster.senses}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Idiomas:</Text>{" "}
            {monster.languages}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>ND:</Text>{" "}
            {monster.challenge}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>XP:</Text>{" "}
            {monster.xp}
          </Text>
        </View>

        <MonsterSection title="TRAÇOS" items={monster.traits} />

        <MonsterSection title="AÇÕES" items={monster.actions} />

        <MonsterSection
          title="AÇÕES BÔNUS"
          items={monster.bonusActions}
        />

        <MonsterSection
          title="REAÇÕES"
          items={monster.reactions}
        />

        <MonsterSection
          title="AÇÕES LENDÁRIAS"
          items={monster.legendaryActions}
        />

        <MonsterSection
          title="AÇÕES DE COVIL"
          items={monster.lairActions}
        />

        <MonsterSection
          title="EFEITOS REGIONAIS"
          items={monster.regionalEffects}
        />
      </ScrollView>

      <Pressable
        style={[
          styles.addButton,
          isSaved && styles.savedButton,
        ]}
        onPress={toggleSavedMonster}
        disabled={saving}
        accessibilityRole="button"
        accessibilityLabel={
          isSaved
            ? "Remover criatura dos meus monstros"
            : "Salvar criatura em meus monstros"
        }
      >
        <Text style={styles.addButtonText}>
          {saving ? "..." : isSaved ? "✓" : "+"}
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
    paddingBottom: 100,
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

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    color: "#cccccc",
    fontSize: 15,
    marginTop: 15,
  },

  error: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#c9a227",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },

  retryText: {
    color: "#0d0d0d",
    fontWeight: "bold",
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

  savedButton: {
    backgroundColor: "#6b9b69",
  },

  addButtonText: {
    color: "#0d0d0d",
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 38,
  },
});
