export interface TallyConnectionStatus {
  isConnected: boolean;
  version?: string;
  port: number;
  activeCompany?: string;
  lastCheckedAt: string;
}

export interface TallyVoucherRequest {
  voucherType: string;
  date: string;
  narration: string;
  partyLedgerName: string;
  amount: number;
  invoiceNumber: string;
}

export interface TallySyncResult {
  success: boolean;
  voucherId?: string;
  error?: string;
  rawXmlResponse?: string;
}
