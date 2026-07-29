import React, { useState } from 'react';
import { Dashboard } from './views/Dashboard';
import { InvoiceRegistry } from './views/InvoiceRegistry';
import { Reconciliation } from './views/Reconciliation';
import { TallySync } from './views/TallySync';
import { Profile } from './views/Profile';
import { AuditLogs } from './views/AuditLogs';

type ViewType = 'dashboard' | 'registry' | 'reconcile' | 'tally' | 'profile' | 'audit';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const navItems: Array<{ id: ViewType; label: string; icon: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'registry', label: 'Invoice Registry', icon: '🧾' },
    { id: 'reconcile', label: 'Reconciliation', icon: '⚡' },
    { id: 'tally', label: 'Tally Integration', icon: '🔄' },
    { id: 'profile', label: 'License & System', icon: '🔒' },
    { id: 'audit', label: 'Audit Logs', icon: '📜' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-slate-800 flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
              MFD
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white tracking-wide">MFD Invoice Ops</h1>
              <p className="text-[10px] text-sky-400 font-mono">v1.0.0 Enterprise</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeView === item.id
                    ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Local Database</p>
          <p className="font-mono text-[11px] truncate">%APPDATA%/MFDInvoiceOps/data.db</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 bg-slate-950/80">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'registry' && <InvoiceRegistry />}
        {activeView === 'reconcile' && <Reconciliation />}
        {activeView === 'tally' && <TallySync />}
        {activeView === 'profile' && <Profile />}
        {activeView === 'audit' && <AuditLogs />}
      </main>
    </div>
  );
};

export default App;
