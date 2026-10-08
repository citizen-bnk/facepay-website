'use client';
import { useId, useState } from 'react';
import { submitLead, type LeadKind } from '@/lib/leads';

const kinds: { v: LeadKind; l: string }[] = [
  { v: 'demo', l: 'Request a demo' },
  { v: 'hardware', l: 'Hardware enquiry' },
  { v: 'partner', l: 'Partnership / API' },
];

export function LeadForm({ defaultKind = 'demo', compact = false }: { defaultKind?: LeadKind; compact?: boolean }) {
  const id = useId();
  const [kind, setKind] = useState<LeadKind>(defaultKind);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'queued' | 'error'>('idle');
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('website')) return; // honeypot
    setState('sending');
    const r = await submitLead({
      kind,
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
    });
    if (r.status === 'error') { setErr(r.message); setState('error'); } else setState(r.status);
  }

  if (state === 'sent' || state === 'queued') {
    return (
      <div role="status" className="rounded-2xl border border-gold/40 bg-white/5 p-6">
        <p className="text-lg font-bold gold-text">Thank you. We have your request.</p>
        <p className="mt-2 text-sm text-white/85">
          {state === 'sent'
            ? 'Our team will be in touch shortly.'
            : 'Our servers are not connected in this environment, so your request has been saved in a local queue on this device and will be sent once the service is available.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-describedby={`${id}-note`}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1 block text-xs font-semibold">Full name</label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className="field" placeholder="Full Name" />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1 block text-xs font-semibold">Business email</label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="field" placeholder="Business Email" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-co`} className="mb-1 block text-xs font-semibold">Company / organisation</label>
          <input id={`${id}-co`} name="company" required autoComplete="organization" className="field" placeholder="Company / Organization" />
        </div>
        <div>
          <label htmlFor={`${id}-kind`} className="mb-1 block text-xs font-semibold">I&apos;m interested in</label>
          <select id={`${id}-kind`} value={kind} onChange={(e) => setKind(e.target.value as LeadKind)} className="field">
            {kinds.map((k) => <option key={k.v} value={k.v} className="text-black">{k.l}</option>)}
          </select>
        </div>
      </div>
      {!compact && (
        <div>
          <label htmlFor={`${id}-msg`} className="mb-1 block text-xs font-semibold">Message</label>
          <textarea id={`${id}-msg`} name="message" rows={4} className="field" placeholder="Tell us about your business and what you need" />
        </div>
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <p id={`${id}-note`} className="text-xs text-slate2">
        We use these details only to respond to your enquiry. No biometric data is collected on this form.
      </p>
      {state === 'error' && <p role="alert" className="text-sm text-red-300">{err}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn-gold w-full disabled:opacity-60">
        {state === 'sending' ? 'Sending...' : kind === 'demo' ? 'Request a Demo' : 'Send enquiry'}
      </button>
    </form>
  );
}
