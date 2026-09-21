import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-navy-950 pt-32 pb-20 text-white text-center">
      <div className="container-x">
        <p className="eyebrow !text-gold-200 justify-center">404</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">This road doesn&apos;t exist… yet.</h1>
        <p className="mt-3 text-white/70">The page you&apos;re looking for has moved or never existed.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-gold">Back Home</Link>
          <Link to="/tours" className="btn-outline">Explore Tours</Link>
        </div>
      </div>
    </div>
  );
}
