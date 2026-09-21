import { Link } from 'react-router-dom';
import { Clock, Route, MessageCircle, ArrowRight, Car } from 'lucide-react';
import SafeImage from './SafeImage.jsx';
import { formatPerVehicle, bookingAdvanceShortText } from '../utils/pricing.js';

export function priceText(tour) {
  return formatPerVehicle(tour.price) || tour.priceLabel || 'Get a Quote';
}

export default function TourCard({ tour }) {
  return (
    <article className="card card-hover img-zoom flex flex-col reveal">
      <Link to={`/tours/${tour.slug}`} className="relative block aspect-[3/2] overflow-hidden" aria-label={`View ${tour.name}`}>
        <SafeImage src={tour.image} alt={tour.imageAlt || `${tour.name} with Mirantar`} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-200 backdrop-blur">
          {tour.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-navy">
            <Link to={`/tours/${tour.slug}`} className="hover:text-gold-600">{tour.name}</Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-2">{tour.short}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-gold-600" />{tour.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Route size={14} className="text-gold-600" />{tour.route}</span>
        </div>
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Car size={14} className="text-gold-600" /> Maruti Suzuki Ertiga · Up to 6 passengers
        </p>
        <p className={`text-base font-bold ${tour.price ? 'text-navy' : 'text-gold-600'}`}>{priceText(tour)}</p>
        {tour.price ? (
          <p className="text-xs font-semibold text-gold-600">{bookingAdvanceShortText()}</p>
        ) : null}
        <div className="mt-auto flex gap-2 pt-1">
          <Link to={`/tours/${tour.slug}`} className="btn-outline-navy flex-1 !px-4 !py-2.5 text-sm">
            View Details <ArrowRight size={15} />
          </Link>
          <Link to={`/tours/${tour.slug}#book`} className="btn-navy flex-1 !px-4 !py-2.5 text-sm" aria-label={`Book ${tour.name} on WhatsApp`}>
            <MessageCircle size={15} /> Book
          </Link>
        </div>
      </div>
    </article>
  );
}
