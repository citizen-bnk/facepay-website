import { API_URL } from './config';

export type LeadKind = 'demo' | 'hardware' | 'partner';
export interface LeadInput {
  name: string;
  company: string;
  email: string;
  message: string;
  kind: LeadKind;
}
export type LeadResult = { status: 'sent' } | { status: 'error'; message: string };

/** Confirm delivery only after the enquiry service accepts the request. */
export async function submitLead(lead: LeadInput): Promise<LeadResult> {
  if (!API_URL) {
    return { status: 'error', message: 'Online enquiries are not available yet. Your request has not been sent.' };
  }
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(15000),
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
    return { status: 'error', message: 'Your request could not be confirmed. Check your connection and try again later.' };
  }
}
