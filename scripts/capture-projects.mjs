import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/projects", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [name, url] of [
    ["sorting", "https://sortviz.formen.cc/sort.html"],
    ["maze", "https://mazeviz.formen.cc/"],
    ["invest", "https://invest.formen.cc/"],
  ]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 25000 });
      if (name === "maze") {
        await page.getByRole("checkbox").first().check();
        await page
          .getByRole("button", { name: "Generar Laberinto", exact: true })
          .click();
        await page.waitForTimeout(1200);
      }
      await sharp(await page.screenshot())
        .webp({ quality: 85 })
        .toFile(`public/projects/${name}.webp`);
      console.log(`Captured ${name}: ${await page.title()}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
