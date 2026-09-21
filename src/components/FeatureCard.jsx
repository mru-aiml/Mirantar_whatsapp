export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="card card-hover p-6 reveal">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-200">
        <Icon size={22} />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}
