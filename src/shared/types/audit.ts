export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  action: string;
  details: string;
  userId?: string;
}
