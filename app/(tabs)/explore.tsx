import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Explorar
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Esta aplicación incluye un transpilador de código entre múltiples
        lenguajes de programación.
      </ThemedText>

      <Collapsible title="¿Qué es un transpilador?">
        <ThemedText>
          Un transpilador es una herramienta que convierte código fuente de un
          lenguaje de programación a otro. TR-C Transpilador puede convertir
          código entre{" "}
          <ThemedText type="defaultSemiBold">JavaScript</ThemedText>,{" "}
          <ThemedText type="defaultSemiBold">Python</ThemedText>,{" "}
          <ThemedText type="defaultSemiBold">Java</ThemedText>,{" "}
          <ThemedText type="defaultSemiBold">PHP</ThemedText>,{" "}
          <ThemedText type="defaultSemiBold">C++</ThemedText> y{" "}
          <ThemedText type="defaultSemiBold">PSeInt</ThemedText>.
        </ThemedText>
      </Collapsible>

      <Collapsible title="¿Cómo funciona?">
        <ThemedText>
          El proceso de transpilación se realiza en tres etapas principales:
        </ThemedText>
        <ThemedText>
          1.{" "}
          <ThemedText type="defaultSemiBold">
            Análisis Léxico (Lexer)
          </ThemedText>
          : Convierte el código fuente en tokens.
        </ThemedText>
        <ThemedText>
          2.{" "}
          <ThemedText type="defaultSemiBold">
            Análisis Sintáctico (Parser)
          </ThemedText>
          : Crea un Árbol de Sintaxis Abstracta (AST).
        </ThemedText>
        <ThemedText>
          3.{" "}
          <ThemedText type="defaultSemiBold">Generación de Código</ThemedText>:
          Produce el código en el lenguaje de destino.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Lenguajes soportados">
        <ThemedText>
          <ThemedText type="defaultSemiBold">JavaScript</ThemedText>: Lenguaje
          de programación interpretado, principalmente usado para desarrollo
          web.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Python</ThemedText>: Lenguaje de
          programación de alto nivel, ideal para ciencia de datos y desarrollo
          general.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Java</ThemedText>: Lenguaje
          orientado a objetos, muy popular en desarrollo empresarial.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">PHP</ThemedText>: Lenguaje
          especialmente diseñado para desarrollo web del lado del servidor.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">C++</ThemedText>: Lenguaje de
          programación de propósito general, extensión de C con orientación a
          objetos.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">PSeInt</ThemedText>: Pseudolenguaje
          en español para enseñanza de programación.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Características de la aplicación">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Interfaz intuitiva</ThemedText>:
          Fácil de usar con áreas de código separadas.
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Intercambio rápido</ThemedText>:
          Botón para intercambiar lenguajes de origen y destino.
        </ThemedText>
        <ThemedText>
          •{" "}
          <ThemedText type="defaultSemiBold">Copia al portapapeles</ThemedText>:
          Función para copiar el código resultante.
        </ThemedText>
        <ThemedText>
          •{" "}
          <ThemedText type="defaultSemiBold">
            Soporte multiplataforma
          </ThemedText>
          : Funciona en iOS, Android y web.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Limitaciones">
        <ThemedText>
          • Solo convierte estructuras básicas como variables, funciones,
          condicionales y bucles.
        </ThemedText>
        <ThemedText>
          • No maneja librerías específicas de cada lenguaje.
        </ThemedText>
        <ThemedText>
          • El código generado puede requerir ajustes manuales para casos
          complejos.
        </ThemedText>
        <ThemedText>
          • Está diseñado para fines educativos y prototipado rápido.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
