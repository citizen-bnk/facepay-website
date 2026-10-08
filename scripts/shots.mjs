import { chromium } from 'playwright-core';
import { readdirSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:3100';
const exe = '/opt/pw-browsers/' + readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium-')) + '/chrome-linux/chrome';
mkdirSync('shots', { recursive: true });
const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const path of (process.argv[3] || '/').split(',')) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    const name = (path === '/' ? 'home' : path.slice(1)) + '-' + w;
    await p.screenshot({ path: `shots/${name}.png`, fullPage: true });
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    console.log(name, 'scrollWidth', sw);
  }
}
await b.close();
