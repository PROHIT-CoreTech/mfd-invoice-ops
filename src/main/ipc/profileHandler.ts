import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipcChannels';
import { validateLicense } from '@main/security/licenseValidator';
import { getHardwareId } from '@main/security/hardwareInfo';
import { getAuditLogs } from '@main/database/auditLogger';

export function registerProfileHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.PROFILE_GET_INFO, async () => {
    const hwId = getHardwareId();
    const license = validateLicense('DEMO-KEY-12345');
    return {
      hardwareId: hwId,
      licenseStatus: license,
      appName: 'MFD Invoice Automation',
      version: '1.0.0',
    };
  });

  ipcMain.handle(IPC_CHANNELS.AUDIT_GET_LOGS, async () => {
    return getAuditLogs();
  });
}
