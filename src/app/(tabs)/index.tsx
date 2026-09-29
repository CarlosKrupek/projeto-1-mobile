import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { router } from "expo-router";

import { creatures } from "../../constants/creatures";

import CreatureCard from "../../components/CreatureCard";

export default function HomeScreen() {
  const openCreature = (id: string) => {
    router.push({
      pathname: "/monstros/[id]",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={creatures}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>
              Descobertas
            </Text>

            <Text style={styles.subtitle}>
              Encontre novas criaturas para suas aventuras
            </Text>
          </View>
        }

        renderItem={({ item }) => (
          <CreatureCard
            creature={item}
            onPress={() => openCreature(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999999",
    fontSize: 15,
    marginTop: 5,
  },
});