# TR-C Transpilador (Android)

Este proyecto es una **adaptación para Android** del repositorio original [TR-C Transpilador](https://github.com/00Danii/Tr-C--Transpilador).

La versión web original permite la transpilación entre lenguajes de programación a través de una interfaz web, mientras que esta versión está optimizada para dispositivos móviles Android, manteniendo toda la funcionalidad principal.

¡Pruébalo en línea! [TR-C Transpilador Web](https://tr-c-transpilador.vercel.app/)

---

## ¿Qué es TR-C Transpilador?

**TR-C Transpilador** es una herramienta que permite convertir código entre **JavaScript, PHP, Python, Java, C++ y PSeInt** de manera sencilla y rápida.  
Convierte estructuras básicas de un lenguaje a otro, facilitando el **aprendizaje** y la **migración de código**.

---

## Arquitectura

El proyecto está construido en varias capas principales:

- **Lexer (Analizador Léxico):**  
  Convierte el código fuente en una secuencia de tokens (palabras clave, identificadores, operadores, etc.).

- **Parser (Analizador Sintáctico):**  
  Toma los tokens y construye un **AST** (Árbol de Sintaxis Abstracta) que representa la estructura lógica del código.

- **AST (Abstract Syntax Tree):**  
  Representación intermedia, independiente del lenguaje, que describe la estructura y significado del código fuente.

- **Generadores de código:**  
  Cada lenguaje de salida tiene su propio generador que toma el AST y produce código en ese lenguaje.

## Diagrama arquitectónico
![Diagrama del transpilador](https://i.imgur.com/oSQbvtF.png)

## ¿Cómo funciona la transpilación?

1. **Lexer:**  
   El código fuente se tokeniza en unidades léxicas.

2. **Parser:**  
   Los tokens se analizan y se construye el AST.

3. **Generador:**  
   El AST se recorre y se genera el código en el lenguaje de destino.

### Ejemplo:

```js
// Entrada (JavaScript)
console.log("Hola mundo");
```

```python
# Salida (Python)
print("Hola mundo")
```


## ¿Cómo replicarlo localmente?

Clona el repositorio:
```bash
git clone https://github.com/00Danii/Tr-C--Transpilador-Android
```

Instala dependencias con pnpm:
```bash
npm install
```

Inicia la app en modo desarrollo:
```bash
npx expo start
```

## Exportar a APK
Para generar un APK para Android:
```bash
npx eas-cli build --platform android --profile preview
```
Esto creará un enlace para descargar el APK listo para instalar en dispositivos Android.