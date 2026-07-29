import axios from 'axios';
import { TallyVoucherRequest, TallySyncResult } from '@shared/types/tally';

export async function sendVoucherToTallyERP9(request: TallyVoucherRequest, port = 9000): Promise<TallySyncResult> {
  // Legacy Tally ERP 9 XML envelope format
  const xmlPayload = `<ENVELOPE><HEADER><TALLYREQUEST>Import Data</TALLYREQUEST></HEADER><BODY><IMPORTDATA><REQUESTDESC><REPORTNAME>Vouchers</REPORTNAME></REQUESTDESC><REQUESTDATA><TALLYMESSAGE><VOUCHER VCHTYPE="${request.voucherType}"><DATE>${request.date}</DATE><AMOUNT>${request.amount}</AMOUNT></VOUCHER></TALLYMESSAGE></REQUESTDATA></IMPORTDATA></BODY></ENVELOPE>`;

  try {
    const response = await axios.post(`http://localhost:${port}`, xmlPayload, {
      headers: { 'Content-Type': 'text/xml' },
      timeout: 5000,
    });
    return {
      success: response.status === 200,
      voucherId: `ERP9_VCH_${Date.now()}`,
      rawXmlResponse: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Tally ERP 9 connection error',
    };
  }
}
