// One-off: renders the 1200×630 social card to public/og.png. Re-run if the hero copy changes.
import { chromium } from '@playwright/test';

const bars = [
  { label: 'CADS Software India', left: 30.1, width: 6.2, colour: '#6C97E0' },
  { label: 'Artus Meggitt', left: 53.4, width: 4.8, colour: '#9AA79E' },
  { label: 'Francium Tech · MoneySmart', left: 60.3, width: 39.7, colour: '#E0566C' },
];

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono&family=Manrope:wght@500;800&display=block" rel="stylesheet">
<style>
  body { margin: 0; width: 1200px; height: 630px; background: #060907; color: #EEF3EF;
         font-family: 'Manrope', sans-serif; padding: 80px 88px; box-sizing: border-box; }
  h1 { font-size: 76px; margin: 0; letter-spacing: -1.5px; }
  p { font-size: 32px; color: #9AA79E; margin: 12px 0 64px; }
  .row { position: relative; height: 54px; }
  .bar { position: absolute; top: 30px; height: 14px; border-radius: 2px; }
  .label { position: absolute; top: 0; font-size: 18px; font-weight: 500; white-space: nowrap; }
  .axis { position: relative; height: 24px; font: 16px 'Martian Mono', monospace; color: #9AA79E;
          border-top: 1px solid #1D2820; padding-top: 10px; margin-top: 12px; }
</style></head><body>
<h1>Aravindh Jawahar</h1>
<p>AI product engineer · <span style="color:#5CBF62">100K+ daily users</span></p>
${bars.map((b) => `<div class="row">
  <span class="label" style="left:${b.left > 50 ? 'auto' : b.left + '%'};right:${b.left > 50 ? 100 - b.left - b.width + '%' : 'auto'}">${b.label}</span>
  <span class="bar" style="left:${b.left}%;width:${b.width}%;background:${b.colour}"></span></div>`).join('')}
<div class="axis">${[[2015, 2.7], [2018, 27.4], [2022, 60.3], [2026, 93.2]].map(([y, x]) => `<span style="position:absolute;left:${x}%">${y}</span>`).join('')}</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
