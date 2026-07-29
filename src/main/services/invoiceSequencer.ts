export function generateNextInvoiceNumber(prefix = 'INV', currentCount = 0): string {
  const nextNum = currentCount + 1;
  const padded = String(nextNum).padStart(5, '0');
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${padded}`;
}
