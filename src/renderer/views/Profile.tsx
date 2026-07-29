import React, { useEffect, useState } from 'react';
import { getElectronAPI } from '../api/electronAPI';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const api = getElectronAPI();
    api.getProfileInfo().then((data) => setProfile(data));
  }, []);

  if (!profile) return <div className="text-slate-400">Loading profile information...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">License & Hardware Binding</h1>
        <p className="text-sm text-slate-400">System identification and node activation status</p>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4 max-w-2xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Application Name</span>
          <span className="text-white font-semibold">{profile.appName}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Version</span>
          <span className="text-white font-mono">{profile.version}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Hardware Fingerprint ID</span>
          <span className="text-sky-400 font-mono text-xs bg-slate-800 px-3 py-1 rounded">{profile.hardwareId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">License Tier</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs">
            {profile.licenseStatus?.tier} ACTIVE
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Licensed To</span>
          <span className="text-white font-medium">{profile.licenseStatus?.licensedTo}</span>
        </div>
      </div>
    </div>
  );
};
