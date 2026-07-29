import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

export function getDatabasePath(): string {
  const appDataDir = process.env.APPDATA || (
    process.platform === 'darwin'
      ? path.join(process.env.HOME || '', 'Library', 'Application Support')
      : path.join(process.env.HOME || '', '.config')
  );
  
  const targetDir = path.join(appDataDir, 'MFDInvoiceOps');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return path.join(targetDir, 'data.db');
}

let dbInstance: Database.Database | null = null;

export function initDatabase(): Database.Database {
  if (dbInstance) return dbInstance;

  const dbPath = getDatabasePath();
  console.log(`[DB] Initializing SQLite database at: ${dbPath}`);
  
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');

  // Auto-migrate essential tables
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoiceNumber TEXT NOT NULL,
      cycleId TEXT NOT NULL,
      distributorId TEXT NOT NULL,
      distributorName TEXT NOT NULL,
      grossAmount REAL NOT NULL,
      taxAmount REAL NOT NULL,
      netAmount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      tallyVoucherId TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      level TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT NOT NULL,
      userId TEXT
    );
  `);

  return dbInstance;
}

export function getDatabase(): Database.Database {
  if (!dbInstance) {
    return initDatabase();
  }
  return dbInstance;
}
