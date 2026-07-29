import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipcChannels';
import { launchPortalBrowser } from '@main/integrations/portal/browser';
import { logAuditEvent } from '@main/database/auditLogger';

export function registerPortalHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.PORTAL_START_LOGIN, async (_, portalType: 'cams' | 'kfin') => {
    logAuditEvent('INFO', 'PORTAL_START_LOGIN', `Launching ${portalType} portal browser session`);
    const success = await launchPortalBrowser(portalType);
    return { success };
  });
}
