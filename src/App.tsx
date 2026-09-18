import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StaffBar from './components/auth/StaffBar';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import StickyMobileCTA from './components/StickyMobileCTA';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import Booking from './pages/Booking';

// Auth & Protected Internal Portals
import Login from './pages/Login';
import ManagerPortal from './pages/ManagerPortal';
import AdminPortal from './pages/AdminPortal';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md p-8 rounded-[28px] bg-white/80 border border-[#d7caeb] shadow-[0_16px_50px_rgba(88,63,123,0.08)] backdrop-blur-xl">
        <span className="text-[12px] font-mono text-[#7d5fc0] uppercase tracking-[0.18em]">
          404 Error
        </span>
        <h1 className="font-display text-[32px] font-extrabold text-[#1f1630] mt-2 mb-4">
          Page Not Found
        </h1>
        <p className="text-[15px] text-[#5b4f6d] mb-6 leading-relaxed">
          The requested system route does not exist. Please return to the homepage or explore our services hub.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#7d5fc0] text-white font-medium text-[14px] hover:bg-[#6948b2] transition-all duration-200 shadow-[0_12px_24px_rgba(125,95,192,0.18)]"
        >
          Return to Home →
        </a>
      </div>
    </div>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#7b5ac5] selection:text-white">
      <ScrollToTop />
      {/* Staff Session Toolbar (Rendered only for authenticated staff) */}
      <StaffBar />
      <Header />
      <main className="flex-grow relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(circle_at_top,_rgba(123,90,197,0.18),_transparent_45%)]" />
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCTA />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-strategy-call" element={<Booking />} />

            {/* Staff Authentication Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Manager Reception Portal (Role: MANAGER or ADMIN) */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute allowedRoles={['MANAGER', 'ADMIN']}>
                  <ManagerPortal />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Master Control Portal (Role: ADMIN only) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminPortal />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}
