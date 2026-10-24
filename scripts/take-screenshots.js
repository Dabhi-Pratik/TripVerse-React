import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, "../screenshots");

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    defaultViewport: {
      width: 1366,
      height: 768,
      deviceScaleFactor: 2, // HiDPI crisp screenshots
    },
  });

  const page = await browser.newPage();

  const pagesToCapture = [
    {
      name: "01-home-hero.png",
      url: "http://localhost:5173/",
      waitFor: 2000,
    },
    {
      name: "02-home-featured.png",
      url: "http://localhost:5173/",
      waitFor: 1500,
      action: async (p) => {
        await p.evaluate(() => {
          const featured = document.querySelector(".tv-featured-section") || document.querySelectorAll("section")[1];
          if (featured) featured.scrollIntoView({ behavior: "instant" });
        });
        await new Promise((r) => setTimeout(r, 1000));
      },
    },
    {
      name: "03-trips-catalog.png",
      url: "http://localhost:5173/trips",
      waitFor: 2000,
    },
    {
      name: "04-trip-details.png",
      url: "http://localhost:5173/trips/1",
      waitFor: 2000,
    },
    {
      name: "05-booking-form.png",
      url: "http://localhost:5173/booking/1?preview=true",
      waitFor: 2000,
    },
    {
      name: "06-my-bookings.png",
      url: "http://localhost:5173/myBookings?preview=true",
      waitFor: 2000,
    },
    {
      name: "07-auth.png",
      url: "http://localhost:5173/auth",
      waitFor: 1500,
    },
  ];

  for (const item of pagesToCapture) {
    console.log(`Navigating to ${item.url} -> ${item.name}...`);
    await page.goto(item.url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, item.waitFor));

    if (item.action) {
      await item.action(page);
    }

    const dest = path.join(screenshotsDir, item.name);
    await page.screenshot({ path: dest });
    console.log(`Saved screenshot to ${dest}`);
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
