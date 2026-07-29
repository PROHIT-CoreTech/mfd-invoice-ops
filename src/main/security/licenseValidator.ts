import { getHardwareId } from './hardwareInfo';

export interface LicenseStatus {
  isValid: boolean;
  tier: 'TRIAL' | 'PRO' | 'ENTERPRISE';
  expiresAt: string;
  boundHardwareId: string;
  licensedTo: string;
}

export function validateLicense(key: string): LicenseStatus {
  const currentHwId = getHardwareId();
  // Validates license format or default demo key
  const isKeyValid = key.startsWith('MFD-') || key === 'DEMO-KEY-12345';

  return {
    isValid: isKeyValid,
    tier: isKeyValid ? 'PRO' : 'TRIAL',
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    boundHardwareId: currentHwId,
    licensedTo: 'MFD Agency Operations',
  };
}
