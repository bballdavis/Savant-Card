import { chromium } from "playwright";
import process from "node:process";

/* global document, localStorage */

const baseUrl = process.env.DEMO_URL ?? "http://127.0.0.1:5173/demo/index.html";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1100 }, deviceScaleFactor: 1 });
await page.goto(baseUrl);
await page.waitForLoadState("load");
await page.waitForTimeout(1200);

async function captureTheme(theme) {
  await page.evaluate((nextTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("savant-demo-theme", nextTheme);
  }, theme);
  await page.waitForTimeout(300);

  await page.locator(".demo-width.wide").first().screenshot({
    path: `docs/design/demo-smoke-${theme}-desktop.png`,
  });
  await page.locator(".demo-width.phone").first().screenshot({
    path: `docs/design/demo-smoke-${theme}-mobile.png`,
  });
}

await captureTheme("dark");
await captureTheme("light");

await browser.close();
