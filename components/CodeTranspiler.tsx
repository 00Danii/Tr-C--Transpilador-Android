import { CodeArea } from "@/components/CodeArea";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SwapButton } from "@/components/SwapButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TranspileButton } from "@/components/TranspileButton";
import { PROGRAMMING_LANGUAGES } from "@/lib/languajes";
import { transpileCode } from "@/lib/transpiler";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Vibration,
} from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export function CodeTranspiler() {
  const [inputLanguage, setInputLanguage] = useState("javascript");
  const [outputLanguage, setOutputLanguage] = useState("python");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isTranspiling, setIsTranspiling] = useState(false);
  const [error, setError] = useState("");
  const [codeByLanguage, setCodeByLanguage] = useState<{
    [lang: string]: string;
  }>({});

  const handleSwapLanguages = () => {
    const tempLang = inputLanguage;
    const tempCode = inputCode;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tempLang);
    setInputCode(outputCode);
    setOutputCode(tempCode);

    if (Platform.OS !== "web") {
      Vibration.vibrate(50);
    }
  };

  const handleTranspile = async () => {
    if (!inputCode.trim()) {
      setError("Por favor, ingresa código para transpilar");
      Alert.alert("Error", "Por favor, ingresa código para transpilar");
      return;
    }

    setIsTranspiling(true);
    setError("");

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const transpiledCode = transpileCode(
        inputCode,
        inputLanguage,
        outputLanguage
      );
      setOutputCode(transpiledCode);

      // Alert.alert(
      //   "¡Transpilación exitosa!",
      //   `Código convertido de ${getLanguageLabel(
      //     inputLanguage
      //   )} a ${getLanguageLabel(outputLanguage)}`
      // );
    } catch {
      const errorMsg =
        "Error durante la transpilación. Por favor, verifica tu código.";
      setError(errorMsg);
      Alert.alert("Error", errorMsg);
    } finally {
      setIsTranspiling(false);
    }
  };

  const handleCopyToClipboard = async (type: "input" | "output") => {
    const code = type === "input" ? inputCode : outputCode;
    if (!code) return;

    try {
      await Clipboard.setStringAsync(code);
      Alert.alert("¡Copiado!", "Código copiado al portapapeles");
    } catch {
      Alert.alert("Error", "No se pudo copiar el código");
    }
  };

  const getLanguageLabel = (value: string) => {
    return (
      PROGRAMMING_LANGUAGES.find((lang) => lang.value === value)?.label || value
    );
  };

  const getLanguagePlaceholder = (language: string) => {
    switch (language) {
      case "php":
        return `<?php\n// Tu código aquí\n?>`;
      case "java":
        return `public class Main {\n  public static void main(String[] args) {\n    // Tu código aquí\n  }\n}`;
      case "pseint":
        return `Algoritmo Programa\n  // Tu código aquí\nFinAlgoritmo`;
      default:
        return "";
    }
  };

  const handleInputLanguageChange = (newLang: string) => {
    setCodeByLanguage((prev) => ({
      ...prev,
      [inputLanguage]: inputCode,
    }));
    setInputLanguage(newLang);
    setInputCode(codeByLanguage[newLang] ?? getLanguagePlaceholder(newLang));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Language Selectors */}
      <ThemedView style={styles.languageSection}>
        <LanguageSelector
          label="Código de entrada"
          value={inputLanguage}
          onChange={handleInputLanguageChange}
          languages={PROGRAMMING_LANGUAGES}
        />

        <SwapButton onPress={handleSwapLanguages} disabled={isTranspiling} />

        <LanguageSelector
          label="Código de salida"
          value={outputLanguage}
          onChange={setOutputLanguage}
          languages={PROGRAMMING_LANGUAGES}
        />
      </ThemedView>

      {/* Code Areas */}
      <ThemedView
        style={isTablet ? styles.codeAreasTablet : styles.codeAreasMobile}
      >
        <CodeArea
          title={`Código ${getLanguageLabel(inputLanguage)}`}
          value={inputCode}
          onChangeText={setInputCode}
          placeholder={`Escribe tu código ${getLanguageLabel(
            inputLanguage
          )} aquí...`}
          language={inputLanguage}
          showCopy={!!inputCode}
          onCopy={() => handleCopyToClipboard("input")}
        />

        {!isTablet && (
          <ThemedView style={styles.transpileButtonContainer}>
            <TranspileButton
              onPress={handleTranspile}
              disabled={isTranspiling || !inputCode.trim()}
              isTranspiling={isTranspiling}
              inputLanguage={inputLanguage}
              outputLanguage={outputLanguage}
            />
          </ThemedView>
        )}

        <CodeArea
          title={`Código ${getLanguageLabel(outputLanguage)}`}
          value={outputCode}
          placeholder="El código transpilado se mostrará aquí..."
          language={outputLanguage}
          readOnly
          showCopy={!!outputCode}
          onCopy={() => handleCopyToClipboard("output")}
          isTranspiling={isTranspiling}
        />
      </ThemedView>

      {/* Error Display */}
      {error && (
        <ThemedView style={styles.errorContainer}>
          <Ionicons
            name="alert-circle"
            size={20}
            color="#ff6b6b"
            style={styles.errorIcon}
          />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      )}

      {/* Desktop Transpile Button */}
      {isTablet && (
        <ThemedView style={styles.transpileButtonContainer}>
          <TranspileButton
            onPress={handleTranspile}
            disabled={isTranspiling || !inputCode.trim()}
            isTranspiling={isTranspiling}
            inputLanguage={inputLanguage}
            outputLanguage={outputLanguage}
          />
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  languageSection: {
    marginBottom: 20,
  },
  codeAreasMobile: {
    gap: 16,
  },
  codeAreasTablet: {
    flexDirection: "row",
    gap: 16,
  },
  transpileButtonContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    color: "#ff6b6b",
    fontSize: 14,
  },
});
