import { InvoiceStatus } from '@shared/types/invoice';

const ALLOWED_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
  [InvoiceStatus.DRAFT]: [InvoiceStatus.RECONCILED],
  [InvoiceStatus.RECONCILED]: [InvoiceStatus.TALLY_SYNCED, InvoiceStatus.DRAFT],
  [InvoiceStatus.TALLY_SYNCED]: [InvoiceStatus.SIGNED],
  [InvoiceStatus.SIGNED]: [InvoiceStatus.UPLOADED],
  [InvoiceStatus.UPLOADED]: [],
};

export function canTransition(current: InvoiceStatus, next: InvoiceStatus): boolean {
  const allowed = ALLOWED_TRANSITIONS[current] || [];
  return allowed.includes(next);
}
