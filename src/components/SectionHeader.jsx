export default function SectionHeader({ eyebrow, title, sub, align = 'center', dark = false }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={`flex flex-col gap-3 ${alignCls} reveal`}>
      {eyebrow && <span className="eyebrow"><span className="inline-block h-px w-8 bg-gold" />{eyebrow}<span className="inline-block h-px w-8 bg-gold" /></span>}
      <h2 className={`font-display text-3xl sm:text-4xl font-semibold leading-tight ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {sub && <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${dark ? 'text-white/75' : 'text-slate-600'}`}>{sub}</p>}
    </div>
  );
}
