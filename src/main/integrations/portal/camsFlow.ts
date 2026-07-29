import { Page } from 'playwright';

export async function executeCamsLoginFlow(page: Page, credentials: { username: string; pass: string }): Promise<boolean> {
  try {
    await page.fill('input[name="username"]', credentials.username);
    await page.fill('input[name="password"]', credentials.pass);
    await page.click('button[type="submit"]');
    return true;
  } catch {
    return false;
  }
}
