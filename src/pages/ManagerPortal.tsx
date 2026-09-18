import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  generateGoogleCalendarUrl,
  downloadICSFile,
  getFormattedManagerSummary,
  type StrategyBooking
} from '../lib/bookingStore';

interface Lead {
  id: string;
  createdAt: string;
  type: string;
  name: string;
  company: string;
  industry: string;
  budget: string;
  preferredTime: string;
  goal: string;
  phone: string;
  email: string;
  website?: string;
  status: 'pending' | 'accepted' | 'contacted' | 'declined';
  assignedManagerId: string | null;
  assignedManagerName: string | null;
  managerNotes?: string;
}

export default function ManagerPortal() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');

  const fetchManagerLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/leads', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        if (data.leads?.length > 0 && !selectedLeadId) {
          setSelectedLeadId(data.leads[0].id);
          setNotesDraft(data.leads[0].managerNotes || '');
        }
      }
    } catch (err) {
      console.error('Failed to load manager leads', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLeadId]);

  useEffect(() => {
    fetchManagerLeads();
  }, [fetchManagerLeads]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  useEffect(() => {
    if (selectedLead) {
      setNotesDraft(selectedLead.managerNotes || '');
    }
  }, [selectedLead?.id]);

  const handleUpdateStatus = async (status: Lead['status'], notes?: string) => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          managerNotes: notes !== undefined ? notes : notesDraft
        })
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        setActionSuccess(`Status updated to ${status.toUpperCase()}`);
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update lead status', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await handleUpdateStatus(selectedLead.status, notesDraft);
    setActionSuccess('Manager notes saved successfully.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleAcceptAndSendInvite = async () => {
    if (!selectedLead) return;
    await handleUpdateStatus('accepted', `Accepted by ${user?.name} on ${new Date().toLocaleDateString()}`);
    // Convert to format for calendar generator
    const bookingLike: StrategyBooking = {
      ...selectedLead,
      website: selectedLead.website || ''
    };
    window.open(generateGoogleCalendarUrl(bookingLike), '_blank');
    setActionSuccess('Session Accepted! Google Calendar invitation opened in new tab.');
  };

  const handleContactWhatsApp = async () => {
    if (!selectedLead) return;
    const cleanPhone = selectedLead.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${selectedLead.name}, this is ${user?.name} from Brightmenti regarding your Strategy Session request for ${selectedLead.company}. We are ready to coordinate your technical architecture call.`
    );
    await handleUpdateStatus('contacted');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSendEmail = async () => {
    if (!selectedLead) return;
    const subject = encodeURIComponent(`Brightmenti Strategy Session Confirmation — ${selectedLead.company}`);
    const body = encodeURIComponent(
      `Hi ${selectedLead.name},\n\nThank you for requesting a Strategy Session with Brightmenti.\n\n` +
      `We reviewed your objective:\n"${selectedLead.goal}"\n\n` +
      `We have reserved your preferred window: ${selectedLead.preferredTime}.\n\n` +
      `Best regards,\n${user?.name}\nBrightmenti Strategy Management Team`
    );
    await handleUpdateStatus('contacted');
    window.location.href = `mailto:${selectedLead.email}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = () => {
    if (!selectedLead) return;
    const bookingLike: StrategyBooking = {
      ...selectedLead,
      website: selectedLead.website || ''
    };
    navigator.clipboard.writeText(getFormattedManagerSummary(bookingLike));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = leads.filter((l) => l.status === 'pending').length;
  const acceptedCount = leads.filter((l) => l.status === 'accepted').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-[1400px] mx-auto space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#120e1f]/90 border border-[#7b5ac5]/30 backdrop-blur-xl shadow-[0_16px_40px_rgba(123,90,197,0.15)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Manager Reception Hub
          </div>
          <h1 className="font-display text-[26px] sm:text-[32px] font-bold text-white tracking-tight">
            Assigned Strategy Requests
          </h1>
          <p className="text-[13px] text-[#9A9A9E]">
            Logged in as <strong className="text-white">{user?.name}</strong> (<span className="text-[#be9bf8]">{user?.email}</span>) • Showing strictly your assigned client leads.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-amber-300">{pendingCount}</div>
            <div className="text-[10px] font-mono uppercase text-amber-400/80">Pending</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-emerald-300">{acceptedCount}</div>
            <div className="text-[10px] font-mono uppercase text-emerald-400/80">Accepted</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-blue-300">{contactedCount}</div>
            <div className="text-[10px] font-mono uppercase text-blue-400/80">Contacted</div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout: Left List + Right Lead Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Assigned Leads Queue & Search Filter */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#120e1f]/90 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono uppercase tracking-wider text-[#be9bf8] font-bold">
                Assigned Queue ({filteredLeads.length})
              </span>
              <button
                onClick={fetchManagerLeads}
                className="text-[11px] font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                🔄 Refresh
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, company, industry..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#181324] border border-white/[0.1] text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-[#7b5ac5]"
            />

            {/* Status Filter Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['all', 'pending', 'accepted', 'contacted', 'declined'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-[#7b5ac5] text-white font-bold shadow-[0_2px_8px_rgba(123,90,197,0.3)]'
                      : 'bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Scroll List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="p-8 text-center text-white/40 text-[13px]">
                <div className="h-6 w-6 border-2 border-[#7b5ac5] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading assigned submissions...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-[13px] text-white/40">
                No strategy call requests match the current filters.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setNotesDraft(lead.managerNotes || '');
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedLead?.id === lead.id
                      ? 'bg-[#7b5ac5]/20 border-[#7b5ac5] shadow-[0_8px_24px_rgba(123,90,197,0.25)]'
                      : 'bg-[#120e1f]/80 border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-white text-[14px] truncate">{lead.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold shrink-0 ${
                        lead.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : lead.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : lead.status === 'declined'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#be9bf8] truncate font-medium">{lead.company}</div>
                  <div className="text-[11px] text-white/50 truncate">{lead.industry} • {lead.budget}</div>
                  <div className="text-[10px] font-mono text-white/30 mt-2 flex items-center justify-between">
                    <span>{lead.id}</span>
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Exact Manager Reception Terminal & Actions */}
        <div className="lg:col-span-8 space-y-6">
          {actionSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[13px] flex items-center justify-between animate-fadeIn">
              <span>✓ {actionSuccess}</span>
              <button onClick={() => setActionSuccess(null)} className="text-emerald-400 font-bold ml-2">×</button>
            </div>
          )}

          {selectedLead ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#120e1f]/90 border border-[#7b5ac5]/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(123,90,197,0.18)] space-y-6">
              {/* ASCII Structured Terminal Box */}
              <div className="p-6 rounded-2xl bg-[#090612] border border-[#7b5ac5]/25 font-mono text-[13px] text-[#e3d7fa] shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#7b5ac5]/20 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    <span className="font-bold text-white tracking-wide">MANAGER RECEIVES:</span>
                  </div>
                  <button
                    onClick={handleCopySummary}
                    className="px-3 py-1 rounded-lg bg-[#7b5ac5]/30 hover:bg-[#7b5ac5]/50 text-white text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Summary'}
                  </button>
                </div>

                <div className="space-y-1.5 leading-relaxed">
                  <div className="text-white font-bold text-[15px]">New Strategy Call Request</div>
                  <div className="text-[#8c6dd5] tracking-tighter">──────────────────────────────────────────────</div>
                  <div className="grid grid-cols-[140px_1fr] gap-2.5">
                    <span className="text-white/50">Name:</span>
                    <span className="text-white font-semibold">{selectedLead.name}</span>

                    <span className="text-white/50">Company:</span>
                    <span className="text-white font-semibold">{selectedLead.company}</span>

                    <span className="text-white/50">Industry:</span>
                    <span className="text-[#be9bf8]">{selectedLead.industry}</span>

                    <span className="text-white/50">Budget:</span>
                    <span className="text-emerald-400 font-bold">{selectedLead.budget}</span>

                    <span className="text-white/50">Preferred Time:</span>
                    <span className="text-amber-300">{selectedLead.preferredTime}</span>

                    <span className="text-white/50">Objective:</span>
                    <div className="text-white/90 bg-white/[0.03] p-3 rounded-lg border border-white/[0.06] break-words">
                      {selectedLead.goal}
                    </div>

                    <span className="text-white/50">Phone:</span>
                    <span className="text-white">{selectedLead.phone}</span>

                    <span className="text-white/50">Email:</span>
                    <span className="text-white">{selectedLead.email}</span>

                    {selectedLead.website && (
                      <>
                        <span className="text-white/50">Website:</span>
                        <a href={selectedLead.website} target="_blank" rel="noreferrer" className="text-[#8c6dd5] underline">
                          {selectedLead.website}
                        </a>
                      </>
                    )}

                    <span className="text-white/50">Assigned To:</span>
                    <span className="text-emerald-400">{selectedLead.assignedManagerName || 'Unassigned'}</span>
                  </div>
                  <div className="text-[#8c6dd5] tracking-tighter pt-2">──────────────────────────────────────────────</div>
                  <div className="text-[11px] text-white/40 pt-1 flex items-center justify-between">
                    <span>REFERENCE ID: {selectedLead.id}</span>
                    <span>Received: {new Date(selectedLead.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Manager Actions: Accept / Contact Client */}
              <div className="space-y-3">
                <div className="text-[12px] font-mono uppercase tracking-wider text-[#be9bf8] font-bold">
                  Manager Actions: Accept / Contact Client
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={handleAcceptAndSendInvite}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#7b5ac5] to-[#6040a8] hover:from-[#8c6dd5] hover:to-[#714bc4] text-white font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_24px_rgba(123,90,197,0.3)] transition-all cursor-pointer"
                  >
                    <span className="text-xl">📅</span>
                    <span>Accept & Send Invite</span>
                  </button>

                  <button
                    onClick={handleContactWhatsApp}
                    className="p-4 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-200 font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="text-xl">💬</span>
                    <span>Contact on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleSendEmail}
                    className="p-4 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/40 text-blue-200 font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="text-xl">✉️</span>
                    <span>Email Client</span>
                  </button>
                </div>
              </div>

              {/* Status Selector & Notes */}
              <div className="p-5 rounded-2xl bg-[#171224] border border-white/[0.08] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[12px] font-mono uppercase text-white/70">
                    Lead Workflow Status:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['pending', 'accepted', 'contacted', 'declined'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(st)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                          selectedLead.status === st
                            ? 'bg-[#7b5ac5] text-white font-bold'
                            : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.1] hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-mono text-white/70 mb-1.5">
                    Manager Internal Strategy Notes:
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      placeholder="Add diagnostic notes, preliminary architecture sprint notes, or call reminders..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#100c1c] border border-white/[0.1] text-white placeholder-white/20 text-[13px] focus:outline-none focus:border-[#7b5ac5]"
                    />
                    <button
                      onClick={handleSaveNotes}
                      className="px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-[12px] font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer self-stretch"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[12px]">
                  <span className="text-white/40 font-mono text-[11px]">
                    Assigned to: <strong className="text-white">{selectedLead.assignedManagerName}</strong>
                  </span>
                  <button
                    onClick={() => downloadICSFile({ ...selectedLead, website: selectedLead.website || '' })}
                    className="text-[#be9bf8] hover:text-white underline font-mono text-[11px] cursor-pointer"
                  >
                    📥 Download .ICS Calendar Invite
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 rounded-3xl bg-[#120e1f]/80 border border-white/[0.08] text-center text-white/40">
              Select a strategy request from the left queue to view details and dispatch actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
