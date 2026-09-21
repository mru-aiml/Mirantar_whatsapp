import TourCard from './TourCard.jsx';

export default function TourGrid({ tours }) {
  if (!tours.length) {
    return <p className="py-10 text-center text-sm text-slate-500">No tours found in this category yet. Try a custom trip instead.</p>;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} />
      ))}
    </div>
  );
}
