import { API_URL } from './config';

export type LeadKind = 'demo' | 'hardware' | 'partner';
export interface LeadInput {
  name: string;
  company: string;
  email: string;
  message: string;
  kind: LeadKind;
}
export type LeadResult = { status: 'sent' } | { status: 'queued' } | { status: 'error'; message: string };

const QUEUE_KEY = 'facepay.leadQueue';

function queueLocally(lead: LeadInput) {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    q.push({ ...lead, queuedAt: new Date().toISOString() });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {
    /* storage unavailable: still show graceful state */
  }
}

/** POSTs to `${NEXT_PUBLIC_API_URL}/v1/leads`; queues locally when the API is unset. */
export async function submitLead(lead: LeadInput): Promise<LeadResult> {
  if (!API_URL) {
    queueLocally(lead);
    return { status: 'queued' };
  }
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      let message = 'Something went wrong. Please try again.';
      try {
        const j = await res.json();
        message = j?.error?.message || message;
      } catch {}
      return { status: 'error', message };
    }
    return { status: 'sent' };
  } catch {
    queueLocally(lead);
    return { status: 'queued' };
  }
}
