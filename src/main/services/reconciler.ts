export interface ReconciliationResult {
  matched: number;
  mismatched: number;
  discrepancies: Array<{ id: string; reason: string }>;
}

export function reconcilePortalWithExcel(portalData: any[], excelData: any[]): ReconciliationResult {
  let matched = 0;
  let mismatched = 0;
  const discrepancies: Array<{ id: string; reason: string }> = [];

  for (const item of portalData) {
    const match = excelData.find((ex) => ex.id === item.id);
    if (!match) {
      mismatched++;
      discrepancies.push({ id: item.id, reason: 'Record missing in Excel statement' });
    } else if (match.amount !== item.amount) {
      mismatched++;
      discrepancies.push({ id: item.id, reason: `Amount mismatch: Portal (${item.amount}) vs Excel (${match.amount})` });
    } else {
      matched++;
    }
  }

  return { matched, mismatched, discrepancies };
}
