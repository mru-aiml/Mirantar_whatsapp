import SafeImage from './SafeImage.jsx';

export default function Hero({ kicker, title, sub, sub2, image, alt, children }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <SafeImage src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover opacity-40" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/55 to-navy-950" aria-hidden="true" />
      <div className="container-x relative flex min-h-[88vh] flex-col justify-center gap-6 py-28 sm:py-32">
        {kicker && <p className="eyebrow !text-gold-200">{kicker}</p>}
        <h1 className="max-w-3xl font-display text-4xl sm:text-6xl font-semibold leading-[1.05]">{title}</h1>
        {sub && <p className="max-w-2xl text-base sm:text-xl font-medium text-white/90">{sub}</p>}
        {sub2 && <p className="max-w-2xl text-sm sm:text-base text-white/70">{sub2}</p>}
        {children && <div className="mt-2 flex flex-col sm:flex-row gap-3">{children}</div>}
      </div>
    </section>
  );
}
