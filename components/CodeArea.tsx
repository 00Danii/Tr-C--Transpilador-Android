import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CodeAreaProps {
  title: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  language: string;
  readOnly?: boolean;
  showCopy?: boolean;
  onCopy?: () => void;
  isTranspiling?: boolean;
}

export function CodeArea({
  title,
  value,
  onChangeText,
  placeholder,
  language,
  readOnly = false,
  showCopy = false,
  onCopy,
  isTranspiling = false,
}: CodeAreaProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getLanguageColor = (lang: string) => {
    const colorMap: { [key: string]: string } = {
      javascript: "#fbbf24",
      python: "#10b981",
      java: "#f97316",
      php: "#6366f1",
      cpp: "#3b82f6",
      pseint: "#8b5cf6",
    };
    return colorMap[lang] || "#6b7280";
  };

  // Función para resaltar sintaxis básica
  const highlightedParts = useMemo(() => {
    if (!value || !readOnly) return null;

    const keywords = getKeywordsForLanguage(language);
    const parts: {
      text: string;
      type: "keyword" | "string" | "comment" | "number" | "normal";
    }[] = [];

    // Función para parsear keywords y números (dentro del useMemo para estabilidad)
    const parseKeywordsAndNumbers = (
      text: string,
      keywords: string[]
    ): {
      text: string;
      type: "keyword" | "string" | "comment" | "number" | "normal";
    }[] => {
      const parts: {
        text: string;
        type: "keyword" | "string" | "comment" | "number" | "normal";
      }[] = [];

      // Crear regex para keywords
      const keywordRegex =
        keywords.length > 0
          ? new RegExp(`\\b(${keywords.join("|")})\\b`, "g")
          : null;
      const numberRegex = /\b\d+(\.\d+)?\b/g;

      const allMatches: {
        index: number;
        text: string;
        type: "keyword" | "number";
      }[] = [];

      // Encontrar keywords
      if (keywordRegex) {
        let match;
        while ((match = keywordRegex.exec(text)) !== null) {
          allMatches.push({
            index: match.index,
            text: match[0],
            type: "keyword",
          });
        }
      }

      // Encontrar números
      let match;
      while ((match = numberRegex.exec(text)) !== null) {
        allMatches.push({ index: match.index, text: match[0], type: "number" });
      }

      // Ordenar por posición
      allMatches.sort((a, b) => a.index - b.index);

      // Crear partes
      let lastIndex = 0;
      allMatches.forEach((match) => {
        if (match.index > lastIndex) {
          const beforeText = text.slice(lastIndex, match.index);
          if (beforeText) parts.push({ text: beforeText, type: "normal" });
        }
        parts.push({ text: match.text, type: match.type });
        lastIndex = match.index + match.text.length;
      });

      if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex);
        parts.push({ text: remainingText, type: "normal" });
      }

      return parts;
    };

    // Función para parsear partes del código (dentro del useMemo para estabilidad)
    const parseCodeParts = (
      text: string,
      keywords: string[]
    ): {
      text: string;
      type: "keyword" | "string" | "comment" | "number" | "normal";
    }[] => {
      const parts: {
        text: string;
        type: "keyword" | "string" | "comment" | "number" | "normal";
      }[] = [];

      // Procesar strings primero
      const stringRegex = /(["'`])(.*?)\1/g;
      let lastIndex = 0;
      let match;

      while ((match = stringRegex.exec(text)) !== null) {
        // Agregar texto antes del string
        if (match.index > lastIndex) {
          const beforeText = text.slice(lastIndex, match.index);
          parts.push(...parseKeywordsAndNumbers(beforeText, keywords));
        }
        parts.push({ text: match[0], type: "string" });
        lastIndex = match.index + match[0].length;
      }

      // Procesar el resto
      if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex);
        parts.push(...parseKeywordsAndNumbers(remainingText, keywords));
      }

      return parts;
    };

    // Procesar comentarios primero (// y /* */)
    const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm;
    let lastIndex = 0;
    let match;

    while ((match = commentRegex.exec(value)) !== null) {
      // Agregar texto antes del comentario
      if (match.index > lastIndex) {
        const beforeText = value.slice(lastIndex, match.index);
        parts.push(...parseCodeParts(beforeText, keywords));
      }
      parts.push({ text: match[0], type: "comment" });
      lastIndex = match.index + match[0].length;
    }

    // Procesar el resto del texto
    if (lastIndex < value.length) {
      const remainingText = value.slice(lastIndex);
      parts.push(...parseCodeParts(remainingText, keywords));
    }

    return parts;
  }, [value, language, readOnly]);

  function getKeywordsForLanguage(lang: string): string[] {
    const keywordMap: { [key: string]: string[] } = {
      javascript: [
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "default",
        "break",
        "continue",
        "try",
        "catch",
        "finally",
        "class",
        "extends",
        "new",
        "this",
        "super",
        "import",
        "export",
        "from",
        "async",
        "await",
      ],
      python: [
        "def",
        "class",
        "if",
        "elif",
        "else",
        "for",
        "while",
        "in",
        "not",
        "and",
        "or",
        "try",
        "except",
        "finally",
        "with",
        "as",
        "import",
        "from",
        "return",
        "yield",
        "lambda",
        "True",
        "False",
        "None",
        "self",
        "pass",
        "break",
        "continue",
      ],
      java: [
        "public",
        "private",
        "protected",
        "static",
        "final",
        "class",
        "interface",
        "extends",
        "implements",
        "new",
        "this",
        "super",
        "return",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "default",
        "break",
        "continue",
        "try",
        "catch",
        "finally",
        "throw",
        "throws",
        "import",
        "package",
      ],
      php: [
        "<?php",
        "echo",
        "print",
        "function",
        "class",
        "public",
        "private",
        "protected",
        "static",
        "if",
        "else",
        "elseif",
        "for",
        "foreach",
        "while",
        "do",
        "switch",
        "case",
        "default",
        "break",
        "continue",
        "return",
        "try",
        "catch",
        "finally",
        "new",
        "this",
      ],
      cpp: [
        "#include",
        "int",
        "void",
        "char",
        "float",
        "double",
        "bool",
        "string",
        "class",
        "public",
        "private",
        "protected",
        "static",
        "const",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "default",
        "break",
        "continue",
        "return",
        "new",
        "delete",
        "try",
        "catch",
        "throw",
        "namespace",
        "using",
      ],
      pseint: [
        "Algoritmo",
        "FinAlgoritmo",
        "Proceso",
        "FinProceso",
        "Funcion",
        "FinFuncion",
        "Si",
        "Entonces",
        "Sino",
        "FinSi",
        "Para",
        "Hasta",
        "Hacer",
        "FinPara",
        "Mientras",
        "FinMientras",
        "Repetir",
        "Hasta Que",
        "Segun",
        "FinSegun",
        "Escribir",
        "Leer",
        "Definir",
        "Como",
      ],
    };
    return keywordMap[lang] || [];
  }

  const getTextColor = (
    type: "keyword" | "string" | "comment" | "number" | "normal"
  ) => {
    if (isDark) {
      switch (type) {
        case "keyword":
          return "#569cd6";
        case "string":
          return "#ce9178";
        case "comment":
          return "#6a9955";
        case "number":
          return "#b5cea8";
        default:
          return "#d4d4d4";
      }
    } else {
      switch (type) {
        case "keyword":
          return "#0000ff";
        case "string":
          return "#008000";
        case "comment":
          return "#008000";
        case "number":
          return "#ff6600";
        default:
          return "#000000";
      }
    }
  };

  return (
    <ThemedView style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.languageIndicator,
              { backgroundColor: getLanguageColor(language) },
            ]}
          />
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>

        {showCopy && onCopy && (
          <TouchableOpacity style={styles.copyButton} onPress={onCopy}>
            <Ionicons
              name="copy-outline"
              size={20}
              color={isDark ? "#FFFFFF" : "#000000"}
            />
            <ThemedText style={styles.copyText}>Copiar</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Code Input Area */}
      <View style={styles.codeContainer}>
        {readOnly && highlightedParts ? (
          <ScrollView
            style={styles.codeContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.highlightedText,
                isDark && styles.highlightedTextDark,
              ]}
            >
              {highlightedParts.map((part, index) => (
                <Text key={index} style={{ color: getTextColor(part.type) }}>
                  {part.text}
                </Text>
              ))}
            </Text>
          </ScrollView>
        ) : (
          <TextInput
            style={[
              styles.codeInput,
              isDark && styles.codeInputDark,
              readOnly && styles.readOnly,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={isDark ? "#666" : "#999"}
            multiline
            editable={!readOnly}
            scrollEnabled
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        )}

        {/* Transpiling Overlay */}
        {isTranspiling && readOnly && (
          <View style={styles.transpilingOverlay}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <ThemedText style={styles.transpilingText}>
              Transpilando código...
            </ThemedText>
          </View>
        )}

        {/* Empty State for Output */}
        {!value && !isTranspiling && readOnly && (
          <View style={styles.emptyState}>
            <Ionicons
              name="code-slash-outline"
              size={48}
              color={isDark ? "#333" : "#ccc"}
            />
            <ThemedText style={styles.emptyStateText}>
              Tu código transpilado aparecerá aquí
            </ThemedText>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflow: "hidden",
    marginBottom: 16,
  },
  containerDark: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  copyText: {
    fontSize: 14,
    marginLeft: 4,
  },
  codeContainer: {
    flex: 1,
    minHeight: 300,
    position: "relative",
  },
  codeInput: {
    flex: 1,
    padding: 16,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    lineHeight: 20,
    color: "#000",
  },
  codeInputDark: {
    color: "#fff",
  },
  readOnly: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  highlightedText: {
    padding: 16,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    lineHeight: 20,
    color: "#000",
  },
  highlightedTextDark: {
    color: "#fff",
  },
  transpilingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  transpilingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  emptyState: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
  },
});
