import React from 'react';
import { Navigate, useLocation, Link } from 'react-router';
import { useAuth, type UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="h-10 w-10 rounded-full border-2 border-[#7b5ac5] border-t-transparent animate-spin" />
        <p className="text-[14px] font-mono text-[#be9bf8]">Verifying institutional session...</p>
      </div>
    );
  }

  // Not logged in -> Redirect to login with return path
  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role not allowed -> Show 403 Forbidden
  if (role && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-[#130f1f]/90 border border-red-500/30 shadow-[0_20px_70px_rgba(239,68,68,0.15)] backdrop-blur-xl">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4 text-3xl font-mono font-bold">
            403
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
            Access Forbidden • Institutional Perimeter
          </span>
          <h1 className="font-display text-[26px] sm:text-[30px] font-bold text-white mt-2 mb-3">
            Unauthorized Security Clearance
          </h1>
          <p className="text-[14px] text-[#9A9A9E] mb-6 leading-relaxed">
            Your current account clearance (<strong className="text-[#be9bf8]">{role}</strong>) does not have authorization to access the requested system perimeter.
          </p>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left text-[12px] font-mono text-white/60 mb-6 space-y-1">
            <div>User: <strong className="text-white">{user.name}</strong> ({user.email})</div>
            <div>Clearance: <strong className="text-white">{user.role}</strong></div>
            <div>Destination: <span className="text-red-300">{location.pathname}</span></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {role === 'MANAGER' && (
              <Link
                to="/manager"
                className="px-5 py-2.5 rounded-xl bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white font-medium text-[13px] transition-colors"
              >
                Go to Manager Reception Portal →
              </Link>
            )}
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-[13px] border border-white/[0.1] transition-colors"
            >
              Public Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
