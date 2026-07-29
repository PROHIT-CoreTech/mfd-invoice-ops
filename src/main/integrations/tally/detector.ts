import axios from 'axios';
import { TallyConnectionStatus } from '@shared/types/tally';

export async function testTallyConnection(port = 9000): Promise<TallyConnectionStatus> {
  const pingXml = `<ENVELOPE><HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER><BODY><EXPORTDATA><REQUESTDESC><REPORTNAME>List of Companies</REPORTNAME></REQUESTDESC></EXPORTDATA></BODY></ENVELOPE>`;

  try {
    const res = await axios.post(`http://localhost:${port}`, pingXml, {
      headers: { 'Content-Type': 'text/xml' },
      timeout: 3000,
    });

    return {
      isConnected: res.status === 200,
      port,
      version: 'Tally Prime / ERP 9 Detected',
      activeCompany: 'MFD Agency Private Limited',
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return {
      isConnected: false,
      port,
      lastCheckedAt: new Date().toISOString(),
    };
  }
}
