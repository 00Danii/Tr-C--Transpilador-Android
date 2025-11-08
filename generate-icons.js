const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateIcons() {
  const basePath = path.join(__dirname, "assets", "images", "base-icon.png");
  const outputDir = path.join(__dirname, "assets", "images");

  if (!fs.existsSync(basePath)) {
    console.log("Error: Coloca tu imagen base en assets/images/base-icon.png");
    return;
  }

  try {
    // Icono principal (1024x1024)
    await sharp(basePath)
      .resize(1024, 1024)
      .toFile(path.join(outputDir, "icon.png"));
    console.log("Generado: icon.png");

    // Android foreground (432x432, asume transparente)
    await sharp(basePath)
      .resize(432, 432)
      .toFile(path.join(outputDir, "android-icon-foreground.png"));
    console.log("Generado: android-icon-foreground.png");

    // Android monochrome (432x432, convertir a gris)
    await sharp(basePath)
      .resize(432, 432)
      .greyscale()
      .toFile(path.join(outputDir, "android-icon-monochrome.png"));
    console.log("Generado: android-icon-monochrome.png");

    // Favicon (32x32)
    await sharp(basePath)
      .resize(32, 32)
      .toFile(path.join(outputDir, "favicon.png"));
    console.log("Generado: favicon.png");

    // Splash icon (200x200, si quieres cambiar)
    await sharp(basePath)
      .resize(200, 200)
      .toFile(path.join(outputDir, "splash-icon.png"));
    console.log("Generado: splash-icon.png");

    // Para background, crea uno sólido (ej. blanco) - ajusta color si quieres
    await sharp({
      create: {
        width: 432,
        height: 432,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // Blanco
      },
    })
      .png()
      .toFile(path.join(outputDir, "android-icon-background.png"));
    console.log("Generado: android-icon-background.png");

    console.log("¡Todas las imágenes generadas exitosamente!");
  } catch (error) {
    console.error("Error generando imágenes:", error);
  }
}

generateIcons();
