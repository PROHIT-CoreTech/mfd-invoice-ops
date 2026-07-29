export const IPC_CHANNELS = {
  // Invoice Channels
  INVOICE_GET_ALL: 'invoice:get-all',
  INVOICE_GET_BY_ID: 'invoice:get-by-id',
  INVOICE_CREATE: 'invoice:create',
  INVOICE_UPDATE: 'invoice:update',
  INVOICE_DELETE: 'invoice:delete',

  // Tally Integration Channels
  TALLY_TEST_CONNECT: 'tally:test-connect',
  TALLY_SYNC_INVOICE: 'tally:sync-invoice',
  TALLY_GET_STATUS: 'tally:get-status',

  // Portal Automation Channels
  PORTAL_START_LOGIN: 'portal:start-login',
  PORTAL_FETCH_DATA: 'portal:fetch-data',

  // Profile & License Channels
  PROFILE_GET_INFO: 'profile:get-info',
  LICENSE_VALIDATE: 'license:validate',

  // Audit Logs
  AUDIT_GET_LOGS: 'audit:get-logs',
} as const;
