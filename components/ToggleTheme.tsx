import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Appearance, StyleSheet, TouchableOpacity } from "react-native";

export function ToggleTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    Appearance.setColorScheme(newTheme);
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      accessibilityLabel={`Cambiar a tema ${isDark ? "claro" : "oscuro"}`}
      accessibilityHint="Toca para alternar entre tema claro y oscuro"
    >
      <Ionicons
        style={styles.icon}
        name={isDark ? "sunny" : "moon"}
        size={24}
        color={isDark ? "#FFD700" : "#4A5568"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingTop: 25,
  },
});
