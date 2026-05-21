import { chromium, devices, type Page } from "playwright";
import fs from "fs/promises";

const BASE_URL = "http://localhost:3001";
const OUTPUT_DIR = "screenshots-wordpress-final";

const viewports = {
  desktop: { width: 1440, height: 1200 },
  mobile: devices["iPhone 13"].viewport,
};

const themes = ["light", "dark"] as const;

type Theme = (typeof themes)[number];
type Capture = {
  name: string;
  path: string;
  prepare?: (page: Page) => Promise<void>;
};

const captures: Capture[] = [
  {
    name: "homepage",
    path: "/",
  },
  {
    name: "munkak-oldal",
    path: "/munkak",
  },
  {
    name: "munka-1",
    path: "/munka/1",
  },
  {
    name: "munka-1-jelentkezes-1-szemelyes-adatok",
    path: "/munka/1/jelentkezes",
  },
  {
    name: "munka-1-jelentkezes-2-iskolai-adatok",
    path: "/munka/1/jelentkezes",
    prepare: async (page) => {
      await fillStepOne(page);
      await page.getByRole("button", { name: "Következő" }).click();
      await page.getByRole("heading", { name: "Iskolai adatok" }).waitFor();
    },
  },
  {
    name: "munka-1-jelentkezes-3-dokumentumok",
    path: "/munka/1/jelentkezes",
    prepare: async (page) => {
      await fillStepOne(page);
      await page.getByRole("button", { name: "Következő" }).click();
      await page.getByRole("heading", { name: "Iskolai adatok" }).waitFor();
      await fillStepTwo(page);
      await page.getByRole("button", { name: "Következő" }).click();
      await page.getByRole("heading", { name: "Dokumentumok" }).waitFor();
    },
  },
  {
    name: "munka-1-jelentkezes-4-ellenorzes",
    path: "/munka/1/jelentkezes",
    prepare: async (page) => {
      await fillApplicationToReview(page);
    },
  },
];

function filenameFrom(name: string, theme: Theme, viewport: string) {
  return `${OUTPUT_DIR}/${theme}/${viewport}/${name}.png`;
}

async function applyTheme(page: Page, theme: Theme) {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    document.documentElement.style.colorScheme = selectedTheme;
  }, theme);
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

async function fillStepOne(page: Page) {
  await page.locator('input[placeholder="pl. Kovács"]').fill("Kovács");
  await page.locator('input[placeholder="pl. Anna"]').fill("Anna");
  await page.locator('input[placeholder="pl. anna@email.hu"]').fill("anna@example.com");
  await page.locator('input[placeholder="pl. +36 30 123 4567"]').fill("+36 30 123 4567");
  await page.locator('input[type="date"]').fill("2003-05-21");
}

async function fillStepTwo(page: Page) {
  await page.getByPlaceholder("pl. Budapesti Műszaki Egyetem").fill("Budapesti Műszaki Egyetem");
  await page.getByPlaceholder("pl. Gazdaságinformatikus").fill("Gazdaságinformatikus");
  await page.getByPlaceholder("pl. 2027").fill("2027");
  await page.getByPlaceholder("pl. 1234567890").fill("1234567890");
}

async function fillApplicationToReview(page: Page) {
  await fillStepOne(page);
  await page.getByRole("button", { name: "Következő" }).click();
  await page.getByRole("heading", { name: "Iskolai adatok" }).waitFor();
  await fillStepTwo(page);
  await page.getByRole("button", { name: "Következő" }).click();
  await page.getByRole("heading", { name: "Dokumentumok" }).waitFor();
  await page
    .getByPlaceholder("Írd le röviden, mikor tudnál kezdeni, milyen tapasztalatod van, vagy miért érdekel a munka...")
    .fill("Heti több alkalommal ráérek, rendezvényes tapasztalattal is rendelkezem.");
  await page.getByRole("button", { name: "Következő" }).click();
  await page.getByRole("heading", { name: "Ellenőrzés" }).waitFor();
}

async function main() {
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

      console.log(`\nTaking screenshots: ${theme} theme, ${viewportName} view`);

      for (let i = 0; i < captures.length; i++) {
        const capture = captures[i];
        const url = `${BASE_URL}${capture.path}`;
        const path = filenameFrom(capture.name, theme, viewportName);
        const progress = `[${i + 1}/${captures.length}]`;

        try {
          await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 15000,
          });

          await page.waitForLoadState("load", { timeout: 5000 }).catch(() => undefined);
          await capture.prepare?.(page);
          await prepareForScreenshot(page);
          await waitForImages(page);
          await page.waitForTimeout(250);

          await page.screenshot({
            path,
            fullPage: true,
          });

          console.log(`${progress} ${capture.name}`);
          totalScreenshots++;
        } catch (error) {
          console.error(`${progress} Failed: ${url}`);
          console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
          failedScreenshots++;
        }
      }

      await page.close();
    }
  }

  await browser.close();

  console.log(`\nScreenshots completed: ${totalScreenshots} successful, ${failedScreenshots} failed`);
  console.log(`Location: ./${OUTPUT_DIR}/`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
