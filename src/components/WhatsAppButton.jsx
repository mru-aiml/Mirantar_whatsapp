import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink, generalEnquiry } from '../utils/whatsapp.js';

export default function WhatsAppButton() {
  const link = createWhatsAppLink(generalEnquiry());
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Mirantar on WhatsApp"
      title="Chat with Mirantar"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white group-hover:block">
        Chat with Mirantar
      </span>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" aria-hidden="true" />
    </a>
  );
}
