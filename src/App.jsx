import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import Tours from './pages/Tours.jsx';
import GanpatiSpecial from './pages/GanpatiSpecial.jsx';
import GanpatiDetail from './pages/GanpatiDetail.jsx';
import TourDetails from './pages/TourDetails.jsx';
import Vehicle from './pages/Vehicle.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CustomTrip from './pages/CustomTrip.jsx';
import NotFound from './pages/NotFound.jsx';
import { useReveal } from './hooks/useReveal.js';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-950">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetails />} />
          <Route path="/ganpati-special" element={<GanpatiSpecial />} />
          <Route path="/ganpati-special/:slug" element={<GanpatiDetail />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-trip" element={<CustomTrip />} />
          <Route path="/quote" element={<CustomTrip />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
