import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export function DisclaimerBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
        <AlertTriangle size={14} className="shrink-0" />
        <p className="leading-snug">
          Unofficial AZ-900 study tool. Not affiliated with Microsoft. Practice questions are original
          and are not actual certification exam questions.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="ml-1 rounded p-1 text-amber-700 hover:bg-amber-100"
          aria-label="Dismiss disclaimer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
