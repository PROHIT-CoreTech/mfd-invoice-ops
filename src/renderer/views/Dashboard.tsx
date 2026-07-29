import React, { useEffect, useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ totalInvoices: 0, reconciled: 0, pendingSync: 0, totalAmount: 0 });

  useEffect(() => {
    const api = getElectronAPI();
    api.getInvoices().then((invoices: any[]) => {
      const total = invoices.length;
      const reconciled = invoices.filter((i) => i.status === 'RECONCILED').length;
      const pendingSync = invoices.filter((i) => i.status !== 'TALLY_SYNCED').length;
      const sum = invoices.reduce((acc, curr) => acc + (curr.netAmount || 0), 0);

      setStats({ totalInvoices: total, reconciled, pendingSync, totalAmount: sum });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">MFD Invoice Automation Operations & Metrics</p>
        </div>
        <button
          onClick={async () => {
            const api = getElectronAPI();
            await api.createInvoice({ distributorName: 'Axis Mutual Fund', grossAmount: 85000, taxAmount: 15300, netAmount: 100300 });
            window.location.reload();
          }}
          className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-sky-600/20 transition-all cursor-pointer"
        >
          + Quick Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Invoices</p>
          <p className="text-3xl font-extrabold text-white mt-2">{stats.totalInvoices}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Reconciled</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">{stats.reconciled}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Pending Tally Sync</p>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">{stats.pendingSync}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">Total Volume (₹)</p>
          <p className="text-3xl font-extrabold text-sky-400 mt-2">₹{stats.totalAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};
