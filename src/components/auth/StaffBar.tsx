import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function StaffBar() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return null;
  }

  const isCurrentPortal = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="sticky top-0 z-50 bg-[#0d0917] text-white border-b border-[#7b5ac5]/30 px-4 py-2 text-[12px] font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Staff Status & Role */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-white/60">Staff Session:</span>
          <span className="font-semibold text-white">{user.name}</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              role === 'ADMIN'
                ? 'bg-[#7b5ac5]/30 text-[#be9bf8] border border-[#7b5ac5]/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {role}
          </span>
        </div>

        {/* Right: Quick Portal Navigation & Logout */}
        <div className="flex items-center gap-2">
          {role === 'ADMIN' && (
            <Link
              to="/admin"
              className={`px-2.5 py-1 rounded transition-colors ${
                isCurrentPortal('/admin')
                  ? 'bg-[#7b5ac5] text-white font-bold'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/80'
              }`}
            >
              Admin Portal
            </Link>
          )}

          <Link
            to="/manager"
            className={`px-2.5 py-1 rounded transition-colors ${
              isCurrentPortal('/manager')
                ? 'bg-[#7b5ac5] text-white font-bold'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/80'
            }`}
          >
            Manager Portal
          </Link>

          <Link
            to="/"
            className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors"
          >
            Public Site
          </Link>

          <button
            onClick={() => logout()}
            className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-300 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
