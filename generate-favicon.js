const sharp = require("sharp");
const toIco = require("to-ico");
const fs = require("fs");
const path = require("path");

async function generateFavicon() {
  try {
    console.log("🚢 Gerando favicon para Maritime Dashboard...");

    const pngBuffer = await sharp(path.join(__dirname, "public", "favicon.svg"))
      .resize(32, 32)
      .png()
      .toBuffer();

    const icoBuffer = await toIco([pngBuffer]);

    fs.writeFileSync(
      path.join(__dirname, "src", "app", "favicon.ico"),
      icoBuffer
    );

    fs.writeFileSync(path.join(__dirname, "public", "favicon.ico"), icoBuffer);

    const sizes = [16, 32, 48, 64, 128, 256];

    for (const size of sizes) {
      const pngBuffer = await sharp(
        path.join(__dirname, "public", "favicon.svg")
      )
        .resize(size, size)
        .png()
        .toBuffer();

      fs.writeFileSync(
        path.join(__dirname, "public", `favicon-${size}x${size}.png`),
        pngBuffer
      );
    }

    const appleTouchIcon = await sharp(
      path.join(__dirname, "public", "favicon.svg")
    )
      .resize(180, 180)
      .png()
      .toBuffer();

    fs.writeFileSync(
      path.join(__dirname, "public", "apple-touch-icon.png"),
      appleTouchIcon
    );

    console.log("✅ Favicon gerado com sucesso!");
    console.log("📁 Arquivos criados:");
    console.log("  - src/app/favicon.ico");
    console.log("  - public/favicon.ico");
    console.log("  - public/favicon.svg");
    console.log("  - public/apple-touch-icon.png");
    console.log(
      "  - public/favicon-{16,32,48,64,128,256}x{16,32,48,64,128,256}.png"
    );
  } catch (error) {
    console.error("❌ Erro ao gerar favicon:", error);
  }
}

generateFavicon();
