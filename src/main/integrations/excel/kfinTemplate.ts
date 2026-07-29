export interface KfinExcelRow {
  brokerArn: string;
  schemeName: string;
  totalPayout: number;
  gstAmount: number;
}

export function parseKfinRow(rawRow: any): KfinExcelRow {
  return {
    brokerArn: rawRow['Broker ARN'] || '',
    schemeName: rawRow['Scheme Name'] || '',
    totalPayout: parseFloat(rawRow['Payout'] || '0'),
    gstAmount: parseFloat(rawRow['GST'] || '0'),
  };
}
