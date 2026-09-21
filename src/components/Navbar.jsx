import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import { NAV_LINKS } from '../data/site.js';
import { businessConfig } from '../config/businessConfig.js';
import { createWhatsAppLink, getCallLink, getPhoneDisplay } from '../utils/whatsapp.js';

function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Mirantar home">
      <img
        src={businessConfig.logoPath}
        alt="Mirantar logo"
        className={`${compact ? 'h-9 w-9' : 'h-10 w-10 sm:h-11 sm:w-11'} rounded-full object-cover bg-white`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="leading-none">
        <span className="block font-display text-lg sm:text-xl font-bold tracking-[0.18em] text-white">
          MIRANTAR
        </span>
        <span className="mt-1 hidden sm:block text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-200">
          Moving Forward. Always.
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  const bookLink = createWhatsAppLink();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy-950/95 shadow-card backdrop-blur py-2' : 'bg-gradient-to-b from-navy-950/90 to-navy-950/40 py-3 sm:py-4'
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-4" aria-label="Primary">
          <Logo compact={scrolled} />
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-white/15 text-gold-200' : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href={getCallLink()} className="btn-outline !px-5 !py-2.5 text-sm">
              <Phone size={16} /> {getPhoneDisplay()}
            </a>
            <a href={bookLink} target="_blank" rel="noreferrer" className="btn-gold !py-2.5">
              <MessageCircle size={16} /> Book on WhatsApp
            </a>
          </div>
          <button
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-navy-900 p-6 pt-20 text-white shadow-card">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? 'bg-white/15 text-gold-200' : 'text-white/90 hover:bg-white/10'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/custom-trip"
                className="rounded-xl px-4 py-3 text-base font-semibold text-white/90 hover:bg-white/10"
              >
                Custom Trip / Get a Quote
              </NavLink>
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <a href={bookLink} target="_blank" rel="noreferrer" className="btn-gold w-full">
                <MessageCircle size={18} /> Book on WhatsApp
              </a>
              <a href={getCallLink()} className="btn-outline w-full">
                <Phone size={18} /> Call {getPhoneDisplay()}
              </a>
              <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/50">{businessConfig.tagline}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
