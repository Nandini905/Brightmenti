import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if redirect query param is present
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');

  useEffect(() => {
    if (isAuthenticated && user) {
      if (redirectParam) {
        navigate(redirectParam, { replace: true });
      } else if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/manager', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, redirectParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both work email and security password.');
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
      return;
    }

    // Redirect based on role
    if (redirectParam) {
      navigate(redirectParam, { replace: true });
    } else if (result.role === 'ADMIN') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/manager', { replace: true });
    }
  };

  const handleFillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-[#7b5ac5] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#110e1a]/95 border border-[#7b5ac5]/30 shadow-[0_24px_80px_rgba(123,90,197,0.25)] backdrop-blur-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b5ac5]/15 border border-[#7b5ac5]/30 text-[11px] font-mono uppercase tracking-[0.2em] text-[#be9bf8] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#be9bf8]" />
            Internal Staff Portal
          </div>
          <h1 className="font-display text-[26px] font-bold text-white tracking-tight">
            Institutional Sign In
          </h1>
          <p className="text-[13px] text-[#9A9A9E] mt-1.5">
            Role-Based Access for Managing Directors and Engineering Leads.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-[13px] mb-6 flex items-start gap-2.5 animate-fadeIn">
            <span className="text-red-400 font-bold text-base leading-none mt-0.5">⚠️</span>
            <div className="flex-1 leading-snug">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-mono uppercase tracking-wider text-white/70 mb-1.5">
              Work Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@brightmenti.com"
              className="w-full px-4 py-3 rounded-xl bg-[#181324] border border-white/[0.1] text-white placeholder-white/25 focus:border-[#7b5ac5] focus:outline-none transition-colors text-[14px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12px] font-mono uppercase tracking-wider text-white/70">
                Security Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-mono text-[#be9bf8] hover:text-white transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#181324] border border-white/[0.1] text-white placeholder-white/25 focus:border-[#7b5ac5] focus:outline-none transition-colors text-[14px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7b5ac5] to-[#6040a8] hover:from-[#8c6dd5] hover:to-[#714bc4] text-white font-semibold text-[14px] transition-all shadow-[0_8px_24px_rgba(123,90,197,0.35)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Authenticate & Access Portal →</span>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Credentials Panel for Seamless Evaluation */}
        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2.5 text-center">
            Quick Test Accounts (Click to Fill)
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleFillCredentials('admin@brightmenti.com', 'Admin@123456')}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#7b5ac5]/20 border border-white/[0.06] hover:border-[#7b5ac5]/40 text-left transition-all text-[12px] flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="font-semibold text-white">👑 Administrator</span>
                <div className="text-[11px] text-white/50">admin@brightmenti.com</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7b5ac5]/30 text-[#be9bf8]">
                ADMIN
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleFillCredentials('sarah.manager@brightmenti.com', 'Manager@123456')}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#7b5ac5]/20 border border-white/[0.06] hover:border-[#7b5ac5]/40 text-left transition-all text-[12px] flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="font-semibold text-white">🧑‍💼 Manager (Sarah Jenkins)</span>
                <div className="text-[11px] text-white/50">sarah.manager@brightmenti.com</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                MANAGER
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleFillCredentials('alex.manager@brightmenti.com', 'Manager@123456')}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#7b5ac5]/20 border border-white/[0.06] hover:border-[#7b5ac5]/40 text-left transition-all text-[12px] flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="font-semibold text-white">🧑‍💼 Manager (Alexander Vance)</span>
                <div className="text-[11px] text-white/50">alex.manager@brightmenti.com</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                MANAGER
              </span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[12px] text-white/40 hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
