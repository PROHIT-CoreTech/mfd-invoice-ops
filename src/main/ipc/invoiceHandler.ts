import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipcChannels';
import { getDatabase } from '@main/database/client';
import { Invoice } from '@shared/types/invoice';
import { logAuditEvent } from '@main/database/auditLogger';

export function registerInvoiceHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.INVOICE_GET_ALL, async () => {
    const db = getDatabase();
    const stmt = db.prepare(`SELECT * FROM invoices ORDER BY createdAt DESC`);
    return stmt.all() as Invoice[];
  });

  ipcMain.handle(IPC_CHANNELS.INVOICE_CREATE, async (_, invoiceData: Partial<Invoice>) => {
    const db = getDatabase();
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: invoiceData.invoiceNumber || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      cycleId: invoiceData.cycleId || 'cycle_q1',
      distributorId: invoiceData.distributorId || 'dist_001',
      distributorName: invoiceData.distributorName || 'Sample Distributor',
      grossAmount: invoiceData.grossAmount || 1000.0,
      taxAmount: invoiceData.taxAmount || 180.0,
      netAmount: invoiceData.netAmount || 1180.0,
      status: invoiceData.status || ('DRAFT' as any),
      tallyVoucherId: invoiceData.tallyVoucherId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const stmt = db.prepare(`
      INSERT INTO invoices (id, invoiceNumber, cycleId, distributorId, distributorName, grossAmount, taxAmount, netAmount, status, tallyVoucherId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      newInvoice.id,
      newInvoice.invoiceNumber,
      newInvoice.cycleId,
      newInvoice.distributorId,
      newInvoice.distributorName,
      newInvoice.grossAmount,
      newInvoice.taxAmount,
      newInvoice.netAmount,
      newInvoice.status,
      newInvoice.tallyVoucherId || null,
      newInvoice.createdAt,
      newInvoice.updatedAt
    );

    logAuditEvent('INFO', 'INVOICE_CREATED', `Invoice ${newInvoice.invoiceNumber} created`);
    return newInvoice;
  });
}
