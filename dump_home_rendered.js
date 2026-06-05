import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://wheat-termite-712594.hostingersite.com/', { waitUntil: 'networkidle' });
  
  // Find where "At Triam TMT, we are driven by" is located and get its container outer HTML
  const introHtml = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.textContent.includes('At Triam TMT, we are driven by') && e.tagName === 'P');
    if (!el) return 'Not found';
    
    // Find the section or parent containing this text
    let parent = el.parentElement;
    while (parent && !parent.classList.contains('container') && parent.tagName !== 'SECTION') {
      parent = parent.parentElement;
    }
    return parent ? parent.outerHTML : el.outerHTML;
  });
  
  fs.writeFileSync('original_intro_section.html', introHtml);
  console.log('Intro section HTML saved to original_intro_section.html');
  await browser.close();
}

run().catch(console.error);
