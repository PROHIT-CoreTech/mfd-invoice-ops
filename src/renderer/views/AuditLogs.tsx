import React, { useEffect, useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const api = getElectronAPI();
    api.getAuditLogs().then((data) => setLogs(data));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Audit Trail Logs</h1>
        <p className="text-sm text-slate-400">Immutable system and user operation logs stored in SQLite</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Details</th>
              <th className="px-6 py-3">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {log.level}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-white">{log.action}</td>
                <td className="px-6 py-4 text-slate-300">{log.details}</td>
                <td className="px-6 py-4 text-xs text-slate-400">{log.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
