export interface CamsExcelRow {
  pan: string;
  arnCode: string;
  grossCommission: number;
  tdsDeducted: number;
  netCommission: number;
}

export function parseCamsRow(rawRow: any): CamsExcelRow {
  return {
    pan: rawRow[0] || '',
    arnCode: rawRow[1] || '',
    grossCommission: parseFloat(rawRow[2] || '0'),
    tdsDeducted: parseFloat(rawRow[3] || '0'),
    netCommission: parseFloat(rawRow[4] || '0'),
  };
}
