import { CodeTranspiler } from "@/components/CodeTranspiler";
import { Header } from "@/components/Header";
import { ThemedView } from "@/components/themed-view";
import { Platform, StatusBar, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <Header />
      <CodeTranspiler />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
