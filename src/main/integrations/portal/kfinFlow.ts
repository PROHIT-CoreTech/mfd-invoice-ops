import { Page } from 'playwright';

export async function executeKfinLoginFlow(page: Page, credentials: { username: string; pass: string }): Promise<boolean> {
  try {
    await page.fill('#userId', credentials.username);
    await page.fill('#userPassword', credentials.pass);
    await page.click('#btnLogin');
    return true;
  } catch {
    return false;
  }
}
