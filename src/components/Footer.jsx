import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Globe } from 'lucide-react';
import { businessConfig } from '../config/businessConfig.js';
import { createWhatsAppLink, getCallLink, getPhoneDisplay } from '../utils/whatsapp.js';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={businessConfig.logoPath} alt="Mirantar logo" className="h-11 w-11 rounded-full bg-white object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div>
              <p className="font-display text-xl font-bold tracking-[0.18em]">MIRANTAR</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-200">{businessConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Pune-based private travel service focused on comfortable, reliable and personalised journeys across Maharashtra.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={createWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-gold !px-5 !py-2.5 text-sm">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href={getCallLink()} className="btn-outline !px-5 !py-2.5 text-sm">
              <Phone size={16} /> Call
            </a>
          </div>
        </div>
        <nav aria-label="Quick links">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-200">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="text-white/75 hover:text-white" to="/">Home</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/tours">Tours</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/ganpati-special">Ganpati Special</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/vehicle">Our Vehicle</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/about">About</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/contact">Contact</Link></li>
            <li><Link className="text-white/75 hover:text-white" to="/custom-trip">Custom Trip / Get a Quote</Link></li>
          </ul>
        </nav>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-200">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link className="hover:text-white" to="/tours?cat=Religious+%26+Spiritual">Religious Tours</Link></li>
            <li><Link className="hover:text-white" to="/tours?cat=Hill+Stations+%26+Nature">Hill Station Tours</Link></li>
            <li><Link className="hover:text-white" to="/tours?cat=Heritage+%26+Forts">Heritage Tours</Link></li>
            <li><Link className="hover:text-white" to="/custom-trip">Custom Trips</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-200">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2"><Phone size={15} className="text-gold-200" /> {getPhoneDisplay()}</li>
            <li className="flex items-center gap-2"><MessageCircle size={15} className="text-gold-200" /> WhatsApp: {getPhoneDisplay()}</li>
            <li className="flex items-center gap-2"><Globe size={15} className="text-gold-200" /> {businessConfig.website}</li>
            <li className="text-white/60">{businessConfig.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-white/55">
          <p>© 2026 Mirantar. All rights reserved.</p>
          <p className="uppercase tracking-[0.25em]">Moving Forward. Always.</p>
        </div>
      </div>
    </footer>
  );
}
