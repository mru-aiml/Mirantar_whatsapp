import { MessageCircle, Phone } from 'lucide-react';
import { businessConfig } from '../config/businessConfig.js';
import { createWhatsAppLink, getCallLink } from '../utils/whatsapp.js';

export default function WhatsAppCTA({ title = 'Ready to move?', sub = 'MIRANTAR — MOVING FORWARD. ALWAYS.', compact = false }) {
  return (
    <section className={`relative overflow-hidden rounded-3xl bg-navy text-white ${compact ? 'p-8' : 'p-8 sm:p-12'} reveal`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">{title}</h2>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gold-200">{sub}</p>
        <div className="mt-2 flex w-full flex-col sm:flex-row items-center justify-center gap-3">
          <a href={createWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-gold w-full sm:w-auto">
            <MessageCircle size={18} /> Book on WhatsApp
          </a>
          <a href={getCallLink()} className="btn-outline w-full sm:w-auto">
            <Phone size={18} /> Call Mirantar
          </a>
        </div>
        <p className="text-xs text-white/60">Enquiries on WhatsApp · Confirmed manually by Mirantar</p>
      </div>
    </section>
  );
}
