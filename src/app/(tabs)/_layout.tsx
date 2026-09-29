import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#c9a227",
        tabBarInactiveTintColor: "#777777",

        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopColor: "#303030",

          height: 60 + insets.bottom,

          paddingTop: 8,

          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="combates"
        options={{
          title: "Combates",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "skull" : "skull-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
