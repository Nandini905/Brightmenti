import type { Connect } from 'vite';
import crypto from 'node:crypto';

export type UserRole = 'ADMIN' | 'MANAGER';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  salt: string;
  passwordHash: string;
}

export interface SystemLead {
  id: string;
  createdAt: string;
  type: 'booking' | 'contact';
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

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
  ip: string;
}

// In-memory data store with default seeds
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Initial Admin and Managers
const adminSalt = generateSalt();
const manager1Salt = generateSalt();
const manager2Salt = generateSalt();

const users: StaffUser[] = [
  {
    id: 'usr-admin-01',
    name: 'Chief Administrator',
    email: 'admin@brightmenti.com',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    salt: adminSalt,
    passwordHash: hashPassword('Admin@123456', adminSalt)
  },
  {
    id: 'usr-mgr-01',
    name: 'Sarah Jenkins',
    email: 'sarah.manager@brightmenti.com',
    role: 'MANAGER',
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    salt: manager1Salt,
    passwordHash: hashPassword('Manager@123456', manager1Salt)
  },
  {
    id: 'usr-mgr-02',
    name: 'Alexander Vance',
    email: 'alex.manager@brightmenti.com',
    role: 'MANAGER',
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    salt: manager2Salt,
    passwordHash: hashPassword('Manager@123456', manager2Salt)
  }
];

// Seed sample strategy booking leads
const leads: SystemLead[] = [
  {
    id: 'BM-STRAT-910420',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    type: 'booking',
    name: 'John Miller',
    company: 'ABC Retail Logistics',
    industry: 'D2C & E-Commerce',
    budget: '$10,000 – $25,000',
    preferredTime: 'Morning (09:00 - 12:00 EST)',
    goal: 'Migrate legacy Shopify monolith to headless Next.js architecture with custom ERP workflow automation.',
    phone: '+1 (555) 234-5678',
    email: 'john@abcretail.com',
    website: 'https://abcretail.com',
    status: 'pending',
    assignedManagerId: 'usr-mgr-01',
    assignedManagerName: 'Sarah Jenkins',
    managerNotes: 'High priority e-commerce lead from US East.'
  },
  {
    id: 'BM-STRAT-843192',
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    type: 'booking',
    name: 'Elena Rostova',
    company: 'FinPulse Systems',
    industry: 'Fintech & Web3',
    budget: '$25,000 – $50,000',
    preferredTime: 'Afternoon (12:00 - 16:00 EST)',
    goal: 'Audit automated reconciliation pipeline and deploy real-time high frequency fraud detection triggers.',
    phone: '+1 (555) 987-6543',
    email: 'elena@finpulse.io',
    website: 'https://finpulse.io',
    status: 'accepted',
    assignedManagerId: 'usr-mgr-01',
    assignedManagerName: 'Sarah Jenkins',
    managerNotes: 'Invited for Wednesday 2 PM EST technical deep dive.'
  },
  {
    id: 'BM-STRAT-721054',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    type: 'booking',
    name: 'Marcus Thorne',
    company: 'AeroCloud Software',
    industry: 'SaaS & Cloud Software',
    budget: '$50,000+',
    preferredTime: 'Morning (09:00 - 12:00 EST)',
    goal: 'Enterprise multi-tenant orchestration setup and AWS migration from legacy GCP cluster.',
    phone: '+1 (555) 345-9876',
    email: 'marcus@aerocloud.tech',
    website: 'https://aerocloud.tech',
    status: 'contacted',
    assignedManagerId: 'usr-mgr-02',
    assignedManagerName: 'Alexander Vance',
    managerNotes: 'Contacted via WhatsApp & dispatched NDA.'
  }
];

const sessions = new Map<string, { userId: string; expiresAt: number }>();
const auditLogs: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    actorId: 'usr-admin-01',
    actorName: 'Chief Administrator',
    actorRole: 'ADMIN',
    action: 'SYSTEM_INITIALIZATION',
    details: 'RBAC Security Subsystem initialized with Argon2/PBKDF2 encryption.',
    ip: '127.0.0.1'
  }
];

// Rate limiting map for login
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

function logAudit(actor: { id: string; name: string; role: string } | null, action: string, details: string, ip: string) {
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    actorId: actor?.id || 'anonymous',
    actorName: actor?.name || 'Anonymous Visitor',
    actorRole: actor?.role || 'PUBLIC',
    action,
    details,
    ip
  };
  auditLogs.unshift(log);
  if (auditLogs.length > 500) auditLogs.pop();
}

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length > 0) {
      cookies[name] = decodeURIComponent(rest.join('='));
    }
  });
  return cookies;
}

function getAuthenticatedUser(req: Connect.IncomingMessage): StaffUser | null {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.auth_session;
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  const user = users.find((u) => u.id === session.userId);
  if (!user || !user.isActive) return null;

  return user;
}

function sanitizeUser(user: StaffUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  };
}

export function createAuthMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url || '';
    const method = req.method || 'GET';
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

    if (!url.startsWith('/api/')) {
      return next();
    }

    const sendJson = (status: number, data: any, headers: Record<string, string> = {}) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
      res.end(JSON.stringify(data));
    };

    const readBody = (): Promise<any> => {
      return new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch {
            resolve({});
          }
        });
      });
    };

    // 1. POST /api/auth/login
    if (url === '/api/auth/login' && method === 'POST') {
      const attemptKey = `login_${clientIp}`;
      const attempt = loginAttempts.get(attemptKey);
      if (attempt && attempt.lockUntil > Date.now()) {
        const remainingMinutes = Math.ceil((attempt.lockUntil - Date.now()) / 60000);
        return sendJson(429, {
          error: `Too many failed login attempts. Account locked for ${remainingMinutes} minute(s).`
        });
      }

      const body = await readBody();
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(400, { error: 'Email and password are required.' });
      }

      const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user || !user.isActive) {
        // Record failed attempt
        const count = (attempt?.count || 0) + 1;
        const lockUntil = count >= 5 ? Date.now() + 15 * 60000 : 0;
        loginAttempts.set(attemptKey, { count, lockUntil });

        logAudit(null, 'LOGIN_FAILED', `Failed login attempt for email: ${email}`, clientIp);
        return sendJson(401, { error: 'Invalid email or password.' });
      }

      const computedHash = hashPassword(password, user.salt);
      if (computedHash !== user.passwordHash) {
        const count = (attempt?.count || 0) + 1;
        const lockUntil = count >= 5 ? Date.now() + 15 * 60000 : 0;
        loginAttempts.set(attemptKey, { count, lockUntil });

        logAudit(sanitizeUser(user), 'LOGIN_FAILED', `Incorrect password for ${user.email}`, clientIp);
        return sendJson(401, { error: 'Invalid email or password.' });
      }

      // Reset failed attempts
      loginAttempts.delete(attemptKey);

      // Create Session
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 7 * 86400000; // 7 days
      sessions.set(sessionToken, { userId: user.id, expiresAt });

      user.lastLoginAt = new Date().toISOString();
      logAudit(sanitizeUser(user), 'LOGIN_SUCCESS', `User ${user.email} (${user.role}) logged in successfully.`, clientIp);

      const cookieValue = `auth_session=${sessionToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${7 * 86400}`;

      return sendJson(
        200,
        {
          success: true,
          user: sanitizeUser(user),
          message: 'Authenticated successfully.'
        },
        { 'Set-Cookie': cookieValue }
      );
    }

    // 2. GET /api/auth/me
    if (url === '/api/auth/me' && method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        return sendJson(200, { authenticated: false, user: null });
      }
      return sendJson(200, { authenticated: true, user: sanitizeUser(user) });
    }

    // 3. POST /api/auth/logout
    if (url === '/api/auth/logout' && method === 'POST') {
      const cookies = parseCookies(req.headers.cookie);
      if (cookies.auth_session) {
        sessions.delete(cookies.auth_session);
      }
      const expiredCookie = 'auth_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return sendJson(200, { success: true, message: 'Logged out successfully.' }, { 'Set-Cookie': expiredCookie });
    }

    // 4. PUBLIC: POST /api/lead (Public strategy booking / contact submission)
    if (url.startsWith('/api/lead') && method === 'POST') {
      const body = await readBody();
      const leadData = body.data || body;
      const type = body.type || 'booking';

      // Auto-assign to first active manager in round-robin fashion
      const activeManagers = users.filter((u) => u.role === 'MANAGER' && u.isActive);
      const assignedManager = activeManagers.length > 0 ? activeManagers[leads.length % activeManagers.length] : null;

      const newLead: SystemLead = {
        id: `BM-STRAT-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        type,
        name: leadData.name || 'Anonymous Client',
        company: leadData.company || 'Direct Entity',
        industry: leadData.industry || 'D2C & E-Commerce',
        budget: leadData.budget || '$10,000 – $25,000',
        preferredTime: leadData.preferredTime || 'Morning (09:00 - 12:00 EST)',
        goal: leadData.goal || leadData.details || 'General strategy & technology evaluation.',
        phone: leadData.phone || '',
        email: leadData.email || '',
        website: leadData.website || '',
        status: 'pending',
        assignedManagerId: assignedManager ? assignedManager.id : null,
        assignedManagerName: assignedManager ? assignedManager.name : 'Unassigned',
        managerNotes: 'New inbound lead via public portal.'
      };

      leads.unshift(newLead);
      logAudit(
        null,
        'LEAD_SUBMITTED',
        `New ${type} submitted by ${newLead.name} (${newLead.company}). Assigned to: ${newLead.assignedManagerName}`,
        clientIp
      );

      return sendJson(200, {
        success: true,
        leadId: newLead.id,
        message: 'Strategy request received and assigned.'
      });
    }

    // 5. PROTECTED: GET /api/leads (Role-based filtering)
    if (url === '/api/leads' && method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        return sendJson(401, { error: 'Unauthorized. Staff login required.' });
      }

      if (user.role === 'ADMIN') {
        // Admin sees all leads
        return sendJson(200, { leads });
      } else if (user.role === 'MANAGER') {
        // Manager sees ONLY their assigned leads
        const managerLeads = leads.filter((l) => l.assignedManagerId === user.id);
        return sendJson(200, { leads: managerLeads });
      }

      return sendJson(403, { error: 'Forbidden.' });
    }

    // 6. PROTECTED: PATCH /api/leads/:id
    if (url.startsWith('/api/leads/') && method === 'PATCH') {
      const user = getAuthenticatedUser(req);
      if (!user) {
        return sendJson(401, { error: 'Unauthorized.' });
      }

      const leadId = url.replace('/api/leads/', '').split('?')[0];
      const leadIndex = leads.findIndex((l) => l.id === leadId);

      if (leadIndex === -1) {
        return sendJson(404, { error: 'Lead not found.' });
      }

      const targetLead = leads[leadIndex];

      // Check permission: Manager can only update their own assigned leads
      if (user.role === 'MANAGER' && targetLead.assignedManagerId !== user.id) {
        return sendJson(403, { error: 'Access denied: You are not assigned to this lead.' });
      }

      const body = await readBody();

      // Manager allowed fields
      if (body.status) {
        targetLead.status = body.status;
      }
      if (body.managerNotes !== undefined) {
        targetLead.managerNotes = body.managerNotes;
      }

      // Admin allowed fields (reassignment)
      if (user.role === 'ADMIN') {
        if (body.assignedManagerId !== undefined) {
          const mgr = users.find((u) => u.id === body.assignedManagerId && u.role === 'MANAGER');
          targetLead.assignedManagerId = mgr ? mgr.id : null;
          targetLead.assignedManagerName = mgr ? mgr.name : 'Unassigned';
          logAudit(
            sanitizeUser(user),
            'LEAD_REASSIGNED',
            `Lead ${targetLead.id} reassigned to ${targetLead.assignedManagerName}`,
            clientIp
          );
        }
      }

      targetLead.updatedAt = new Date().toISOString();
      logAudit(
        sanitizeUser(user),
        'LEAD_UPDATED',
        `Lead ${targetLead.id} updated (Status: ${targetLead.status}) by ${user.name}`,
        clientIp
      );

      return sendJson(200, { success: true, lead: targetLead });
    }

    // 7. ADMIN ONLY: GET /api/managers
    if (url === '/api/managers' && method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user || user.role !== 'ADMIN') {
        return sendJson(403, { error: 'Forbidden. Administrator credentials required.' });
      }

      const managerList = users
        .filter((u) => u.role === 'MANAGER')
        .map((m) => ({
          ...sanitizeUser(m),
          assignedLeadsCount: leads.filter((l) => l.assignedManagerId === m.id).length
        }));

      return sendJson(200, { managers: managerList });
    }

    // 8. ADMIN ONLY: POST /api/managers (Create Manager)
    if (url === '/api/managers' && method === 'POST') {
      const user = getAuthenticatedUser(req);
      if (!user || user.role !== 'ADMIN') {
        return sendJson(403, { error: 'Forbidden. Administrator credentials required.' });
      }

      const body = await readBody();
      const { name, email, password } = body;

      if (!name || !email || !password) {
        return sendJson(400, { error: 'Name, email, and password are required.' });
      }

      const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        return sendJson(409, { error: 'A staff member with this email already exists.' });
      }

      const salt = generateSalt();
      const newManager: StaffUser = {
        id: `usr-mgr-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'MANAGER',
        isActive: true,
        createdAt: new Date().toISOString(),
        salt,
        passwordHash: hashPassword(password, salt)
      };

      users.push(newManager);
      logAudit(sanitizeUser(user), 'MANAGER_CREATED', `New manager ${newManager.name} (${newManager.email}) created by Admin`, clientIp);

      return sendJson(201, {
        success: true,
        manager: sanitizeUser(newManager),
        message: 'Manager account created successfully.'
      });
    }

    // 9. ADMIN ONLY: PATCH /api/managers/:id (Toggle Active / Reset Password)
    if (url.startsWith('/api/managers/') && method === 'PATCH') {
      const user = getAuthenticatedUser(req);
      if (!user || user.role !== 'ADMIN') {
        return sendJson(403, { error: 'Forbidden. Administrator credentials required.' });
      }

      const managerId = url.replace('/api/managers/', '').split('?')[0];
      const targetManager = users.find((u) => u.id === managerId && u.role === 'MANAGER');

      if (!targetManager) {
        return sendJson(404, { error: 'Manager not found.' });
      }

      const body = await readBody();

      if (body.isActive !== undefined) {
        targetManager.isActive = Boolean(body.isActive);
        logAudit(
          sanitizeUser(user),
          'MANAGER_STATUS_CHANGE',
          `Manager ${targetManager.name} ${targetManager.isActive ? 'activated' : 'deactivated'}`,
          clientIp
        );
      }

      if (body.password) {
        const newSalt = generateSalt();
        targetManager.salt = newSalt;
        targetManager.passwordHash = hashPassword(body.password, newSalt);
        logAudit(
          sanitizeUser(user),
          'MANAGER_PASSWORD_RESET',
          `Password reset for manager ${targetManager.email}`,
          clientIp
        );
      }

      if (body.name) {
        targetManager.name = body.name.trim();
      }

      return sendJson(200, { success: true, manager: sanitizeUser(targetManager) });
    }

    // 10. ADMIN ONLY: GET /api/audit-logs
    if (url === '/api/audit-logs' && method === 'GET') {
      const user = getAuthenticatedUser(req);
      if (!user || user.role !== 'ADMIN') {
        return sendJson(403, { error: 'Forbidden. Administrator credentials required.' });
      }

      return sendJson(200, { logs: auditLogs });
    }

    next();
  };
}
