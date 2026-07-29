import React, { useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const Reconciliation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handlePortalLaunch = async (portal: 'cams' | 'kfin') => {
    setLoading(true);
    setStatusMsg(`Launching non-headless ${portal.toUpperCase()} browser portal...`);
    const api = getElectronAPI();
    const res = await api.startPortalLogin(portal);
    setLoading(false);
    if (res.success) {
      setStatusMsg(`${portal.toUpperCase()} browser session started successfully.`);
    } else {
      setStatusMsg(`Failed to launch ${portal.toUpperCase()} portal browser.`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Portal & Statement Reconciliation</h1>
        <p className="text-sm text-slate-400">Automated CAMS & KFintech portal browser login & statement comparison</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">CAMS Portal Automation</h2>
          <p className="text-sm text-slate-400">Launch non-headless Playwright browser for CAMS distributor portal statement download.</p>
          <button
            disabled={loading}
            onClick={() => handlePortalLaunch('cams')}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            Launch CAMS Portal Browser
          </button>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">KFintech Portal Automation</h2>
          <p className="text-sm text-slate-400">Launch non-headless Playwright browser for KFintech portal statement download.</p>
          <button
            disabled={loading}
            onClick={() => handlePortalLaunch('kfin')}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            Launch KFintech Portal Browser
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 glass-panel rounded-xl border border-sky-500/30 text-sky-300 text-sm font-medium">
          {statusMsg}
        </div>
      )}
    </div>
  );
};
