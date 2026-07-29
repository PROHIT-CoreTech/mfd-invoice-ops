import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipcChannels';
import { testTallyConnection } from '@main/integrations/tally/detector';
import { logAuditEvent } from '@main/database/auditLogger';

export function registerTallyHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.TALLY_TEST_CONNECT, async (_, port?: number) => {
    const targetPort = port || 9000;
    const status = await testTallyConnection(targetPort);
    logAuditEvent('INFO', 'TALLY_TEST_CONNECT', `Tested connection to port ${targetPort}. Result: ${status.isConnected}`);
    return status;
  });

  ipcMain.handle(IPC_CHANNELS.TALLY_SYNC_INVOICE, async (_, invoiceId: string) => {
    logAuditEvent('INFO', 'TALLY_SYNC_INVOICE', `Initiating Tally sync for invoice ${invoiceId}`);
    return { success: true, voucherId: `TALLY_VCH_${Date.now()}` };
  });
}
