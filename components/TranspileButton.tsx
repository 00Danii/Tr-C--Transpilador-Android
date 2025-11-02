import { ThemedText } from "@/components/themed-text";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

interface TranspileButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isTranspiling?: boolean;
  inputLanguage: string;
  outputLanguage: string;
}

export function TranspileButton({
  onPress,
  disabled,
  isTranspiling,
  inputLanguage,
  outputLanguage,
}: TranspileButtonProps) {

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {isTranspiling && (
        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
      )}
      <ThemedText style={styles.text}>
        {isTranspiling ? "Transpilando..." : "Transpilar Código"}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    minWidth: 200,
  },
  disabled: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0,
    elevation: 0,
  },
  loader: {
    marginRight: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
