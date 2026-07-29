export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  RECONCILED = 'RECONCILED',
  TALLY_SYNCED = 'TALLY_SYNCED',
  SIGNED = 'SIGNED',
  UPLOADED = 'UPLOADED',
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  cycleId: string;
  distributorId: string;
  distributorName: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  status: InvoiceStatus;
  tallyVoucherId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cycle {
  id: string;
  name: string; // e.g. "Q1-2026-COMMISSION"
  startDate: string;
  endDate: string;
  status: 'OPEN' | 'CLOSED' | 'PROCESSING';
  totalInvoices: number;
  reconciledCount: number;
}
