import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipcChannels';

export const electronAPI = {
  // Invoice API
  getInvoices: () => ipcRenderer.invoke(IPC_CHANNELS.INVOICE_GET_ALL),
  createInvoice: (data: any) => ipcRenderer.invoke(IPC_CHANNELS.INVOICE_CREATE, data),

  // Tally Integration
  testTallyConnection: (port?: number) => ipcRenderer.invoke(IPC_CHANNELS.TALLY_TEST_CONNECT, port),
  syncTallyInvoice: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.TALLY_SYNC_INVOICE, id),

  // Portal Automation
  startPortalLogin: (portalType: 'cams' | 'kfin') => ipcRenderer.invoke(IPC_CHANNELS.PORTAL_START_LOGIN, portalType),

  // Profile & License
  getProfileInfo: () => ipcRenderer.invoke(IPC_CHANNELS.PROFILE_GET_INFO),
  getAuditLogs: () => ipcRenderer.invoke(IPC_CHANNELS.AUDIT_GET_LOGS),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
