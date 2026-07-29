import React, { useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const TallySync: React.FC = () => {
  const [port, setPort] = useState<number>(9000);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const api = getElectronAPI();
    const result = await api.testTallyConnection(port);
    setStatus(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Tally Integration Sync</h1>
        <p className="text-sm text-slate-400">HTTP & XML Integration with Tally Prime / Tally ERP 9 (Default Port: 9000)</p>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-6 max-w-xl">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">Tally XML Server Port</label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(parseInt(e.target.value) || 9000)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:border-sky-500"
          />
        </div>

        <button
          disabled={loading}
          onClick={testConnection}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Testing Connection...' : 'Test Tally Connection'}
        </button>

        {status && (
          <div className={`p-4 rounded-lg border text-sm space-y-1 ${
            status.isConnected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <p className="font-bold">{status.isConnected ? '✓ Connection Established' : '✕ Unable to Connect to Tally Server'}</p>
            {status.isConnected && (
              <>
                <p>Port: {status.port}</p>
                <p>Company: {status.activeCompany}</p>
                <p>Version: {status.version}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
