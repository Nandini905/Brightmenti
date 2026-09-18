import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';

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
  updatedAt?: string;
}

interface Manager {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  assignedLeadsCount?: number;
}

interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
  ip: string;
}

export default function AdminPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'leads' | 'managers' | 'audit' | 'settings'>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterManager, setFilterManager] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Managers state
  const [managers, setManagers] = useState<Manager[]>([]);
  const [newMgrName, setNewMgrName] = useState('');
  const [newMgrEmail, setNewMgrEmail] = useState('');
  const [newMgrPassword, setNewMgrPassword] = useState('');
  const [isCreatingManager, setIsCreatingManager] = useState(false);
  const [managerFormError, setManagerFormError] = useState<string | null>(null);
  const [resetPassModal, setResetPassModal] = useState<{ id: string; name: string } | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchAdminData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [leadsRes, managersRes, auditRes] = await Promise.all([
        fetch('/api/leads', { method: 'GET' }),
        fetch('/api/managers', { method: 'GET' }),
        fetch('/api/audit-logs', { method: 'GET' })
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
        if (data.leads?.length > 0 && !selectedLead) {
          setSelectedLead(data.leads[0]);
        }
      }

      if (managersRes.ok) {
        const data = await managersRes.json();
        setManagers(data.managers || []);
      }

      if (auditRes.ok) {
        const data = await auditRes.json();
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLead]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Lead Reassignment Handler
  const handleAssignLead = async (leadId: string, managerId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedManagerId: managerId })
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        if (selectedLead?.id === leadId) {
          setSelectedLead(data.lead);
        }
        setSuccessMsg(`Lead ${leadId} assigned to ${data.lead.assignedManagerName}`);
        setTimeout(() => setSuccessMsg(null), 3000);
        // Refresh managers lead count
        fetch('/api/managers')
          .then((r) => r.json())
          .then((d) => setManagers(d.managers || []));
      }
    } catch (err) {
      console.error('Failed to assign lead', err);
    }
  };

  // Create Manager Handler
  const handleCreateManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setManagerFormError(null);

    if (!newMgrName || !newMgrEmail || !newMgrPassword) {
      setManagerFormError('Please fill in all manager details.');
      return;
    }

    try {
      const res = await fetch('/api/managers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMgrName,
          email: newMgrEmail,
          password: newMgrPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setManagerFormError(data.error || 'Failed to create manager.');
        return;
      }

      setManagers((prev) => [...prev, data.manager]);
      setNewMgrName('');
      setNewMgrEmail('');
      setNewMgrPassword('');
      setIsCreatingManager(false);
      setSuccessMsg(`Manager ${data.manager.name} created successfully.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setManagerFormError(err.message || 'Error creating manager.');
    }
  };

  // Toggle Manager Active Status
  const handleToggleManagerActive = async (mgrId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/managers/${mgrId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setManagers((prev) => prev.map((m) => (m.id === data.manager.id ? { ...m, isActive: data.manager.isActive } : m)));
        setSuccessMsg(`Manager ${data.manager.name} is now ${data.manager.isActive ? 'ACTIVE' : 'DEACTIVATED'}.`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update manager status', err);
    }
  };

  // Reset Manager Password
  const handleResetPassword = async () => {
    if (!resetPassModal || !newPasswordValue) return;
    try {
      const res = await fetch(`/api/managers/${resetPassModal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPasswordValue })
      });
      if (res.ok) {
        setSuccessMsg(`Password for ${resetPassModal.name} updated successfully.`);
        setTimeout(() => setSuccessMsg(null), 3000);
        setResetPassModal(null);
        setNewPasswordValue('');
      }
    } catch (err) {
      console.error('Failed to reset password', err);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesManager = filterManager === 'all' || l.assignedManagerId === filterManager;
    const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesManager && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-[1440px] mx-auto space-y-6">
      {/* Admin Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#130d24]/95 border border-[#7b5ac5]/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(123,90,197,0.2)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b5ac5]/20 border border-[#7b5ac5]/40 text-[11px] font-mono text-[#be9bf8] uppercase tracking-[0.2em] mb-2 font-bold">
            👑 Master Administration Perimeter
          </div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-white tracking-tight">
            Institutional Control Center
          </h1>
          <p className="text-[13px] text-[#9A9A9E]">
            Global Lead Routing, Manager Accounts, System Audit Telemetry & Access Control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/manager"
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-[13px] font-medium transition-colors border border-white/[0.1]"
          >
            Switch to Manager Reception →
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'leads', label: `Global Leads (${leads.length})`, icon: '📋' },
          { id: 'managers', label: `Staff Managers (${managers.length})`, icon: '👥' },
          { id: 'audit', label: `System Audit Logs (${auditLogs.length})`, icon: '🛡️' },
          { id: 'settings', label: 'Security & Access Settings', icon: '⚙️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#7b5ac5] text-white shadow-[0_4px_16px_rgba(123,90,197,0.35)]'
                : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[13px] flex items-center justify-between animate-fadeIn">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 font-bold ml-2">×</button>
        </div>
      )}

      {/* TAB 1: GLOBAL LEADS & ASSIGNMENTS */}
      {activeTab === 'leads' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filter & List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-[#120e1f]/90 border border-white/[0.08] space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, company, id..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#181324] border border-white/[0.1] text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-[#7b5ac5]"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Filter Manager:</label>
                  <select
                    value={filterManager}
                    onChange={(e) => setFilterManager(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#181324] border border-white/[0.1] text-white text-[12px] focus:outline-none"
                  >
                    <option value="all">All Managers</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Filter Status:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#181324] border border-white/[0.1] text-white text-[12px] focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="contacted">Contacted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedLead?.id === lead.id
                      ? 'bg-[#7b5ac5]/20 border-[#7b5ac5] shadow-[0_8px_24px_rgba(123,90,197,0.25)]'
                      : 'bg-[#120e1f]/80 border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-white text-[14px]">{lead.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        lead.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : lead.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300'
                          : lead.status === 'declined'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#be9bf8] font-medium">{lead.company}</div>
                  <div className="text-[11px] text-white/50">{lead.industry} • {lead.budget}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-2 flex items-center justify-between border-t border-white/[0.04] pt-1.5">
                    <span>Assigned: <strong className="text-white">{lead.assignedManagerName || 'Unassigned'}</strong></span>
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Inspection & Reassignment Control */}
          <div className="lg:col-span-7">
            {selectedLead ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#120e1f]/90 border border-[#7b5ac5]/30 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#be9bf8] uppercase tracking-wider">
                      Strategy Session Lead Details
                    </span>
                    <h2 className="text-[22px] font-bold text-white mt-0.5">
                      {selectedLead.name} — {selectedLead.company}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.06] text-white/70">
                    {selectedLead.id}
                  </span>
                </div>

                {/* Assignment Dropdown */}
                <div className="p-4 rounded-2xl bg-[#191427] border border-[#7b5ac5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-mono text-white/60">Lead Routing / Assigned Manager:</div>
                    <div className="text-[14px] font-bold text-white mt-0.5">
                      {selectedLead.assignedManagerName || 'Unassigned'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-white/50">Reassign:</span>
                    <select
                      value={selectedLead.assignedManagerId || ''}
                      onChange={(e) => handleAssignLead(selectedLead.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-[#100c1c] border border-white/[0.15] text-white text-[12px] focus:outline-none focus:border-[#7b5ac5] cursor-pointer"
                    >
                      {managers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.isActive ? 'Active' : 'Inactive'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lead Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-white/40 block text-[11px]">CLIENT CONTACT</span>
                    <div className="text-white mt-1 font-semibold">{selectedLead.name}</div>
                    <div className="text-white/70">{selectedLead.email}</div>
                    <div className="text-white/70">{selectedLead.phone}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-white/40 block text-[11px]">BUSINESS & BUDGET</span>
                    <div className="text-white mt-1 font-semibold">{selectedLead.company}</div>
                    <div className="text-[#be9bf8]">{selectedLead.industry}</div>
                    <div className="text-emerald-400 font-bold">{selectedLead.budget}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-white/40 block mb-1">CLIENT OBJECTIVE:</span>
                  <p className="text-[14px] text-white/90 leading-relaxed bg-[#0d0917] p-3 rounded-xl border border-white/[0.05]">
                    {selectedLead.goal}
                  </p>
                </div>

                {selectedLead.managerNotes && (
                  <div className="p-4 rounded-2xl bg-[#191427] border border-white/[0.08]">
                    <span className="text-[11px] font-mono text-[#be9bf8] block mb-1">MANAGER INTERNAL NOTES:</span>
                    <p className="text-[13px] text-white/80">{selectedLead.managerNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-16 rounded-3xl bg-[#120e1f]/80 border border-white/[0.08] text-center text-white/40">
                Select a lead to inspect details or reassign managers.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STAFF MANAGERS MANAGEMENT */}
      {activeTab === 'managers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-white">Institutional Staff Managers</h2>
              <p className="text-[13px] text-[#9A9A9E]">Manage manager clearance, activate/deactivate accounts, and reset passwords.</p>
            </div>
            <button
              onClick={() => setIsCreatingManager(!isCreatingManager)}
              className="px-4 py-2.5 rounded-xl bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white font-medium text-[13px] transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(123,90,197,0.3)]"
            >
              <span>{isCreatingManager ? '✕ Close' : '+ Add New Manager'}</span>
            </button>
          </div>

          {/* New Manager Creation Form */}
          {isCreatingManager && (
            <form onSubmit={handleCreateManager} className="p-6 rounded-3xl bg-[#140e24] border border-[#7b5ac5]/40 space-y-4 animate-fadeIn">
              <h3 className="text-[16px] font-bold text-white">Create New Manager Clearance Account</h3>
              {managerFormError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-[12px]">
                  {managerFormError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newMgrName}
                    onChange={(e) => setNewMgrName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#191329] border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#7b5ac5]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-1">Work Email Address</label>
                  <input
                    type="email"
                    required
                    value={newMgrEmail}
                    onChange={(e) => setNewMgrEmail(e.target.value)}
                    placeholder="marcus.manager@brightmenti.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#191329] border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#7b5ac5]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-1">Initial Password</label>
                  <input
                    type="password"
                    required
                    value={newMgrPassword}
                    onChange={(e) => setNewMgrPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#191329] border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#7b5ac5]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingManager(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/70 text-[12px] hover:bg-white/[0.12] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Save & Provision Account
                </button>
              </div>
            </form>
          )}

          {/* Managers List Table */}
          <div className="rounded-3xl bg-[#120e1f]/90 border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#181324] text-white/50 text-[11px] font-mono uppercase border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3.5 px-6">Manager Name</th>
                    <th className="py-3.5 px-6">Email / Login</th>
                    <th className="py-3.5 px-6">Assigned Leads</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-white/80">
                  {managers.map((mgr) => (
                    <tr key={mgr.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{mgr.name}</td>
                      <td className="py-4 px-6 font-mono text-[12px] text-[#be9bf8]">{mgr.email}</td>
                      <td className="py-4 px-6 font-mono text-[12px]">{mgr.assignedLeadsCount || 0} active leads</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                            mgr.isActive
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {mgr.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleToggleManagerActive(mgr.id, mgr.isActive)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                            mgr.isActive
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-300'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {mgr.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => setResetPassModal({ id: mgr.id, name: mgr.name })}
                          className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Password Reset Modal */}
          {resetPassModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
              <div className="max-w-md w-full p-6 rounded-3xl bg-[#140e24] border border-[#7b5ac5]/40 shadow-2xl space-y-4">
                <h3 className="text-[16px] font-bold text-white">Reset Password: {resetPassModal.name}</h3>
                <p className="text-[13px] text-white/60">Enter a new secure password for this manager account.</p>
                <input
                  type="password"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#191329] border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#7b5ac5]"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setResetPassModal(null)}
                    className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/70 text-[12px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="px-4 py-2 rounded-xl bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white text-[12px] font-semibold"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-white">Security & System Audit Telemetry</h2>
              <p className="text-[13px] text-[#9A9A9E]">Chronological immutable log of staff logins, lead submissions, status transitions, and clearance operations.</p>
            </div>
            <button
              onClick={fetchAdminData}
              className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-[12px] font-mono transition-colors cursor-pointer"
            >
              🔄 Refresh Logs
            </button>
          </div>

          <div className="rounded-3xl bg-[#0d0917] border border-white/[0.08] p-4 font-mono text-[12px] max-h-[600px] overflow-y-auto space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#8c6dd5] font-bold">{log.action}</span>
                  <span className="text-white/80">{log.details}</span>
                </div>
                <div className="flex items-center gap-3 text-white/40 shrink-0 text-[11px]">
                  <span>IP: {log.ip}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & RBAC OVERVIEW */}
      {activeTab === 'settings' && (
        <div className="p-8 rounded-3xl bg-[#120e1f]/90 border border-white/[0.08] space-y-6">
          <h2 className="text-[22px] font-bold text-white">Security & RBAC Architecture Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="font-bold text-[#be9bf8]">🔐 Cryptographic Standard</div>
              <p className="text-white/60">PBKDF2-SHA512 hashing with 100,000 iterations and per-user cryptographic salts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="font-bold text-[#be9bf8]">🍪 Cookie Policy</div>
              <p className="text-white/60">HTTP-only cookies with SameSite=Strict protection to prevent XSS/CSRF token leakage.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="font-bold text-[#be9bf8]">🛡️ Rate Limiting</div>
              <p className="text-white/60">Lockout triggers after 5 consecutive failed login attempts with 15-minute cooling window.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
