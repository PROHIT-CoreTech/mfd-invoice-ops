import { chromium, Browser, Page } from 'playwright';

let currentBrowser: Browser | null = null;

export async function launchPortalBrowser(portalType: 'cams' | 'kfin'): Promise<boolean> {
  try {
    if (currentBrowser) {
      await currentBrowser.close();
    }

    currentBrowser = await chromium.launch({
      headless: false, // Non-headless browser portal automation
      args: ['--start-maximized'],
    });

    const context = await currentBrowser.newContext({ viewport: null });
    const page: Page = await context.newPage();

    const targetUrl = portalType === 'cams'
      ? 'https://www.camsonline.com/'
      : 'https://www.kfintech.com/';

    await page.goto(targetUrl);
    console.log(`[Playwright] Opened ${portalType} portal at ${targetUrl}`);
    return true;
  } catch (error) {
    console.error('[Playwright] Error launching browser portal:', error);
    return false;
  }
}
