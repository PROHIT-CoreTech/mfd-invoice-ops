import { getDatabase } from './client';
import { AuditLogEntry, LogLevel } from '@shared/types/audit';

export function logAuditEvent(level: LogLevel, action: string, details: string, userId?: string): AuditLogEntry {
  const db = getDatabase();
  const entry: AuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    level,
    action,
    details,
    userId: userId || 'system',
  };

  const stmt = db.prepare(`
    INSERT INTO audit_logs (id, timestamp, level, action, details, userId)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(entry.id, entry.timestamp, entry.level, entry.action, entry.details, entry.userId);
  return entry;
}

export function getAuditLogs(): AuditLogEntry[] {
  const db = getDatabase();
  const stmt = db.prepare(`SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 200`);
  return stmt.all() as AuditLogEntry[];
}
