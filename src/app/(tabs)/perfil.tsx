import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import ProfileOption from "../../components/ProfileOption";

import { router } from "expo-router";

export default function ProfileScreen() {
  const handleMyMonsters = () => {
    console.log("Meus monstros");
  };

  const handleSettings = () => {
    console.log("Configurações");
  };

  const handleLogout = () => {
    console.log("Sair da conta");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/fb/7a/2c/fb7a2cb23694e8bbc98a3a7e3e9e07a5.jpg",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Jogador</Text>

          <Text style={styles.username}>@aventureiro</Text>
        </View>

        <View style={styles.options}>
          <ProfileOption title="Meus monstros" onPress={() => router.push("/meus-monstros")} />

          <ProfileOption title="Configurações" onPress={handleSettings} />

          <ProfileOption title="Sair da conta" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  content: {
    padding: 20,
  },

  profile: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 35,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },

  name: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },

  username: {
    color: "#888888",
    marginTop: 5,
  },

  options: {
    marginTop: 10,
  },
});
