import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ToggleTheme } from "./ToggleTheme";

export function Header() {
  return (
    <>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <ThemedText style={styles.logo}>TR-C</ThemedText>
          <View style={styles.headerActions}>
            <ToggleTheme />
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    paddingTop: 25,
    fontSize: 30,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
