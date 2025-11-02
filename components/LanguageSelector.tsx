import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Language {
  value: string;
  label: string;
  gradient: string;
  color: string;
}

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  languages: Language[];
}

export function LanguageSelector({
  label,
  value,
  onChange,
  languages,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const selectedLanguage = languages.find((lang) => lang.value === value);

  const getColorFromGradient = (gradient: string) => {
    // Extract color from gradient class like "from-yellow-400 to-yellow-600"
    const colorMap: { [key: string]: string } = {
      yellow: "#fbbf24",
      green: "#10b981",
      blue: "#3b82f6",
      orange: "#f97316",
      indigo: "#6366f1",
      purple: "#8b5cf6",
      red: "#ef4444",
      cyan: "#06b6d4",
    };

    const colorMatch = gradient.match(
      /(yellow|green|blue|orange|indigo|purple|red|cyan)/
    );
    return colorMatch ? colorMap[colorMatch[1]] : "#6b7280";
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => {
        onChange(item.value);
        setIsOpen(false);
      }}
    >
      <View
        style={[
          styles.colorIndicator,
          { backgroundColor: getColorFromGradient(item.gradient) },
        ]}
      />
      <ThemedText style={styles.languageLabel}>{item.label}</ThemedText>
      {item.value === value && (
        <Ionicons
          name="checkmark"
          size={20}
          color={isDark ? "#FFFFFF" : "#000000"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}

      <TouchableOpacity
        style={[styles.selector, isDark && styles.selectorDark]}
        onPress={() => setIsOpen(true)}
      >
        <View style={styles.selectedLanguage}>
          <View
            style={[
              styles.colorIndicator,
              {
                backgroundColor: getColorFromGradient(
                  selectedLanguage?.gradient || ""
                ),
              },
            ]}
          />
          <ThemedText style={styles.selectedLabel}>
            {selectedLanguage?.label || "Seleccionar"}
          </ThemedText>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDark ? "#FFFFFF" : "#000000"}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              Seleccionar Lenguaje
            </ThemedText>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "#FFFFFF" : "#000000"}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={languages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.value}
            style={styles.languageList}
          />
        </ThemedView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  selectorDark: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  selectedLanguage: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  languageLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
  },
});
