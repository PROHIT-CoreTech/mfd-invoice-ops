import React, { useEffect, useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const InvoiceRegistry: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const api = getElectronAPI();
    api.getInvoices().then((data) => setInvoices(data));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Invoice Registry</h1>
        <p className="text-sm text-slate-400">View and manage all processed commission invoices</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-6 py-3">Invoice #</th>
              <th className="px-6 py-3">Distributor</th>
              <th className="px-6 py-3">Gross (₹)</th>
              <th className="px-6 py-3">Tax (₹)</th>
              <th className="px-6 py-3">Net (₹)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-sky-400">{inv.invoiceNumber}</td>
                <td className="px-6 py-4 text-white font-medium">{inv.distributorName}</td>
                <td className="px-6 py-4 font-mono">₹{inv.grossAmount?.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 font-mono text-slate-400">₹{inv.taxAmount?.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 font-mono font-semibold text-white">₹{inv.netAmount?.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    inv.status === 'RECONCILED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    inv.status === 'TALLY_SYNCED' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
