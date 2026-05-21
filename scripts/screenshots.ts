import { chromium, devices, type Page } from "playwright";
import fs from "fs/promises";
import { jobs } from "../lib/jobs";

const BASE_URL = "http://localhost:3001";
const OUTPUT_DIR = "screenshots";

// Ismert statikus routok
const STATIC_ROUTES = [
  "/",
  "/munkak",
];

const JOB_IDS = Object.keys(jobs);

const viewports = {
  desktop: { width: 1440, height: 1200 },
  mobile: devices["iPhone 13"].viewport,
};

const themes = ["light", "dark"] as const;

function filenameFrom(pathname: string, theme: string, viewport: string) {
  const name =
    pathname === "/"
      ? "home"
      : pathname.replaceAll("/", "-").replace(/^-/, "").replace(/-$/, "");

  return `${OUTPUT_DIR}/${theme}/${viewport}/${name}.png`;
}

function getRoutes() {
  const discovered = new Set<string>(STATIC_ROUTES);

  for (const id of JOB_IDS) {
    discovered.add(`/munka/${id}`);
    discovered.add(`/munka/${id}/jelentkezes`);
  }

  return [...discovered].sort();
}

async function applyTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    document.documentElement.style.colorScheme = selectedTheme;
  }, theme);
}

async function waitForImages(page: Page) {
  await page
    .evaluate(() =>
      Promise.race([
        Promise.all(
          Array.from(document.images).map(
            (img) =>
              new Promise((resolve) => {
                if (img.complete) {
                  resolve(undefined);
                } else {
                  img.addEventListener("load", () => resolve(undefined), { once: true });
                  img.addEventListener("error", () => resolve(undefined), { once: true });
                }
              })
          )
        ),
        new Promise((resolve) => window.setTimeout(resolve, 2500)),
      ])
    )
    .catch(() => undefined);
}

async function prepareForScreenshot(page: Page) {
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-toast],
      [data-nextjs-dialog-overlay],
      [data-nextjs-dev-tools-button],
      [data-next-badge-root],
      [aria-label="Next.js logo"],
      .fixed.bottom-0.left-0.right-0.z-40 {
        display: none !important;
      }
    `,
  });
}

async function main() {
  const routes = getRoutes();

  console.log("\n📋 All routes to screenshot:");
  routes.forEach((route) => console.log(`  ✓ ${route}`));
  console.log(`\nTotal: ${routes.length} pages × 2 themes × 2 viewports = ${routes.length * 2 * 2} screenshots\n`);

  const browser = await chromium.launch();
  let totalScreenshots = 0;
  let failedScreenshots = 0;

  for (const theme of themes) {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      await fs.mkdir(`${OUTPUT_DIR}/${theme}/${viewportName}`, {
        recursive: true,
      });

      const page = await browser.newPage({ viewport });
      page.setDefaultTimeout(10000);
      page.setDefaultNavigationTimeout(15000);

      await applyTheme(page, theme);
      await page.route("**/*", (route) => {
        const url = route.request().url();
        if (
          url.includes("vercel-insights") ||
          url.includes("analytics") ||
          url.includes("googletagmanager") ||
          url.includes("google-analytics")
        ) {
          return route.abort();
        }

        return route.continue();
      });

      console.log(`\n📸 Taking screenshots: ${theme} theme, ${viewportName} view`);
      console.log("─".repeat(60));

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const url = `${BASE_URL}${route}`;
        const path = filenameFrom(route, theme, viewportName);

        const progress = `[${i + 1}/${routes.length}]`;

        try {
          await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 15000,
          });

          await page.waitForLoadState("load", { timeout: 5000 }).catch(() => undefined);
          await prepareForScreenshot(page);
          await waitForImages(page);
          await page.waitForTimeout(250);

          await page.screenshot({
            path,
            fullPage: true,
          });

          console.log(`${progress} ✓ ${theme}/${viewportName}${route === "/" ? "/index" : route}`);
          totalScreenshots++;
        } catch (error) {
          console.error(`${progress} ✗ Failed: ${url}`);
          console.error(`     Error: ${error instanceof Error ? error.message : String(error)}`);
          failedScreenshots++;
        }
      }

      await page.close();
    }
  }

  await browser.close();

  console.log("\n" + "─".repeat(60));
  console.log(`\n✅ Screenshots completed!`);
  console.log(`   Total successful: ${totalScreenshots}`);
  console.log(`   Total failed: ${failedScreenshots}`);
  console.log(`   Location: ./${OUTPUT_DIR}/`);
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
