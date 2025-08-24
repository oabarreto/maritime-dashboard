const sharp = require("sharp");
const toIco = require("to-ico");
const fs = require("fs");
const path = require("path");

async function generateFavicon() {
  try {
    console.log("🚢 Gerando favicon para Maritime Dashboard...");

    // Criar PNG a partir do SVG
    const pngBuffer = await sharp(path.join(__dirname, "public", "favicon.svg"))
      .resize(32, 32)
      .png()
      .toBuffer();

    // Converter PNG para ICO
    const icoBuffer = await toIco([pngBuffer]);

    // Salvar favicon.ico na pasta src/app
    fs.writeFileSync(
      path.join(__dirname, "src", "app", "favicon.ico"),
      icoBuffer
    );

    // Salvar também na pasta public
    fs.writeFileSync(path.join(__dirname, "public", "favicon.ico"), icoBuffer);

    // Criar versões em diferentes tamanhos
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

    // Apple touch icon
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
