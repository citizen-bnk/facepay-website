'use client';
import { useState } from 'react';

const SNIPPETS: Record<string, string> = {
  cURL: `curl -X POST https://api.facepay.com/v1/payment-intents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Idempotency-Key: 7c1f-order-12345" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchantId": "mer_abc_store",
    "amountMinor": 1200,
    "currency": "ZAR"
  }'`,
  JavaScript: `const res = await fetch('https://api.facepay.com/v1/payment-intents', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + process.env.FACEPAY_API_KEY,
    'Idempotency-Key': 'order-12345',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ merchantId: 'mer_abc_store', amountMinor: 1200, currency: 'ZAR' }),
});
const intent = await res.json();`,
  Python: `import os, requests

r = requests.post(
    "https://api.facepay.com/v1/payment-intents",
    headers={
        "Authorization": f"Bearer {os.environ['FACEPAY_API_KEY']}",
        "Idempotency-Key": "order-12345",
    },
    json={"merchantId": "mer_abc_store", "amountMinor": 1200, "currency": "ZAR"},
)
intent = r.json()`,
  PHP: `$ch = curl_init('https://api.facepay.com/v1/payment-intents');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . getenv('FACEPAY_API_KEY'),
    'Idempotency-Key: order-12345',
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode(['merchantId' => 'mer_abc_store', 'amountMinor' => 1200, 'currency' => 'ZAR']),
  CURLOPT_RETURNTRANSFER => true,
]);
$intent = json_decode(curl_exec($ch), true);`,
};

export function CodeTabs() {
  const tabs = Object.keys(SNIPPETS);
  const [t, setT] = useState(tabs[0]);
  return (
    <div className="overflow-hidden rounded-xl bg-[#0b1020] text-white">
      <div role="tablist" aria-label="Code language" className="flex border-b border-white/10 px-2">
        {tabs.map((k) => (
          <button
            key={k}
            role="tab"
            id={`tab-${k}`}
            aria-selected={t === k}
            aria-controls="code-panel"
            onClick={() => setT(k)}
            className={`min-h-[44px] px-4 text-xs font-semibold ${t === k ? 'border-b-2 border-gold text-gold-light' : 'text-slate2 hover:text-white'}`}
          >
            {k}
          </button>
        ))}
      </div>
      <pre id="code-panel" role="tabpanel" aria-labelledby={`tab-${t}`} tabIndex={0} className="overflow-x-auto p-4 text-[12px] leading-relaxed text-[#f2ce6b]">
        <code>{SNIPPETS[t]}</code>
      </pre>
    </div>
  );
}
