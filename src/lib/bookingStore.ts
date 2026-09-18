// Strategy Call Booking Store & Management Service
import { type BookingFormData } from './validation';

export interface StrategyBooking {
  id: string;
  createdAt: string;
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
  managerNotes?: string;
  contactedAt?: string;
}

const STORAGE_KEY = 'brightmenti_strategy_bookings';

export function getStoredBookings(): StrategyBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load bookings from storage', err);
    return [];
  }
}

export function saveStoredBookings(bookings: StrategyBooking[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to save bookings to storage', err);
  }
}

export function createStrategyBooking(data: BookingFormData): StrategyBooking {
  const newBooking: StrategyBooking = {
    id: `BM-STRAT-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    name: data.name.trim(),
    company: data.company.trim(),
    industry: data.industry,
    budget: data.budget,
    preferredTime: data.preferredTime,
    goal: data.goal.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    website: data.website?.trim() || '',
    status: 'pending'
  };

  const existing = getStoredBookings();
  const updated = [newBooking, ...existing];
  saveStoredBookings(updated);

  // Dispatch custom event for real-time reactivity across components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('new_strategy_call_request', {
        detail: { booking: newBooking }
      })
    );
  }

  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: StrategyBooking['status'],
  notes?: string
): StrategyBooking | null {
  const list = getStoredBookings();
  const index = list.findIndex((b) => b.id === id);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    status,
    managerNotes: notes !== undefined ? notes : list[index].managerNotes,
    contactedAt: status === 'contacted' || status === 'accepted' ? new Date().toISOString() : list[index].contactedAt
  };

  saveStoredBookings(list);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('strategy_booking_updated', {
        detail: { booking: list[index] }
      })
    );
  }

  return list[index];
}

export function getFormattedManagerSummary(b: StrategyBooking): string {
  return [
    'New Strategy Call Request',
    '────────────────────────',
    `Name: ${b.name}`,
    `Company: ${b.company}`,
    `Industry: ${b.industry}`,
    `Budget: ${b.budget}`,
    `Preferred Time: ${b.preferredTime}`,
    `Objective: ${b.goal}`,
    `Phone: ${b.phone}`,
    `Email: ${b.email}${b.website ? `\nWebsite: ${b.website}` : ''}`,
    `Submitted: ${new Date(b.createdAt).toLocaleString()}`,
    `Reference ID: ${b.id}`
  ].join('\n');
}

export function generateGoogleCalendarUrl(b: StrategyBooking): string {
  const title = encodeURIComponent(`Brightmenti Strategy Session with ${b.name} (${b.company})`);
  const details = encodeURIComponent(
    `Strategy Session with ${b.name} from ${b.company}\n\n` +
    `Industry: ${b.industry}\n` +
    `Budget: ${b.budget}\n` +
    `Time Preference: ${b.preferredTime}\n` +
    `Core Objective:\n${b.goal}\n\n` +
    `Contact:\nEmail: ${b.email}\nPhone: ${b.phone}`
  );
  const location = encodeURIComponent('Google Meet (Link will be provided prior to session)');
  
  // Create a placeholder date 2 days from now
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 2);
  startDate.setHours(10, 0, 0, 0);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  const startIso = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endIso = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${endIso}`;
}

export function downloadICSFile(b: StrategyBooking): void {
  const title = `Brightmenti Strategy Session: ${b.name} (${b.company})`;
  const description = `Strategy Session with ${b.name} (${b.company})\\nObjective: ${b.goal.replace(/\n/g, ' ')}\\nContact: ${b.email} | ${b.phone}`;
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brightmenti//Strategy Session//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${b.id}@brightmenti.com`,
    `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Google Meet Video Call',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${b.id}-strategy-session.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
