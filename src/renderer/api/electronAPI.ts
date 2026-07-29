import { ElectronAPI } from '@main/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export const getElectronAPI = () => {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI;
  }
  // Fallback mock implementation for standalone browser preview mode
  return {
    getInvoices: async () => [
      {
        id: 'inv_mock_1',
        invoiceNumber: 'INV-2026-00001',
        cycleId: 'cycle_q1',
        distributorId: 'dist_001',
        distributorName: 'HDFC Mutual Fund Agency',
        grossAmount: 150000.0,
        taxAmount: 27000.0,
        netAmount: 177000.0,
        status: 'RECONCILED' as any,
        tallyVoucherId: 'VCH-9921',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createInvoice: async (data: any) => ({
      id: `inv_${Date.now()}`,
      invoiceNumber: data.invoiceNumber || 'INV-2026-00002',
      cycleId: 'cycle_q1',
      distributorId: 'dist_002',
      distributorName: data.distributorName || 'SBI Mutual Fund Agency',
      grossAmount: data.grossAmount || 50000,
      taxAmount: data.taxAmount || 9000,
      netAmount: data.netAmount || 59000,
      status: 'DRAFT' as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    testTallyConnection: async (port?: number) => ({
      isConnected: true,
      port: port || 9000,
      version: 'Tally Prime 3.0',
      activeCompany: 'MFD Agency Pvt Ltd',
      lastCheckedAt: new Date().toISOString(),
    }),
    syncTallyInvoice: async (id: string) => ({
      success: true,
      voucherId: `VCH-${id}`,
    }),
    startPortalLogin: async (portalType: 'cams' | 'kfin') => ({
      success: true,
    }),
    getProfileInfo: async () => ({
      hardwareId: 'DEV-HW-ID-998811',
      licenseStatus: {
        isValid: true,
        tier: 'PRO',
        expiresAt: '2027-12-31',
        boundHardwareId: 'DEV-HW-ID-998811',
        licensedTo: 'MFD Agency Operations',
      },
      appName: 'MFD Invoice Automation',
      version: '1.0.0',
    }),
    getAuditLogs: async () => [
      {
        id: 'audit_1',
        timestamp: new Date().toISOString(),
        level: 'INFO' as any,
        action: 'APP_LAUNCH',
        details: 'Dev environment initialized',
        userId: 'admin',
      },
    ],
  };
};
