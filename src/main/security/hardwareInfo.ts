import os from 'node:os';
import crypto from 'node:crypto';

export function getHardwareId(): string {
  const cpus = os.cpus().map((c) => c.model).join(';');
  const hostname = os.hostname();
  const rawString = `${hostname}-${cpus}-${os.arch()}`;
  return crypto.createHash('sha256').update(rawString).digest('hex').substring(0, 24).toUpperCase();
}
