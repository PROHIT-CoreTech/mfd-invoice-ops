import axios from 'axios';
import { TallyVoucherRequest, TallySyncResult } from '@shared/types/tally';

export async function sendVoucherToTallyPrime(request: TallyVoucherRequest, port = 9000): Promise<TallySyncResult> {
  const xmlPayload = `
    <ENVELOPE>
      <HEADER>
        <TALLYREQUEST>Import Data</TALLYREQUEST>
      </HEADER>
      <BODY>
        <IMPORTDATA>
          <REQUESTDESC>
            <REPORTNAME>Vouchers</REPORTNAME>
          </REQUESTDESC>
          <REQUESTDATA>
            <TALLYMESSAGE xmlns:UDF="TallyUDF">
              <VOUCHER VCHTYPE="${request.voucherType}" ACTION="Create">
                <DATE>${request.date}</DATE>
                <NARRATION>${request.narration}</NARRATION>
                <PARTYLEDGERNAME>${request.partyLedgerName}</PARTYLEDGERNAME>
                <AMOUNT>${request.amount}</AMOUNT>
              </VOUCHER>
            </TALLYMESSAGE>
          </REQUESTDATA>
        </IMPORTDATA>
      </BODY>
    </ENVELOPE>
  `;

  try {
    const response = await axios.post(`http://localhost:${port}`, xmlPayload, {
      headers: { 'Content-Type': 'text/xml' },
      timeout: 5000,
    });
    return {
      success: response.status === 200,
      voucherId: `VCH-${Date.now()}`,
      rawXmlResponse: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to Tally Prime XML server',
    };
  }
}
