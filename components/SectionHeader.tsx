interface Props { eyebrow:string; title:string; subtitle?:string; centered?:boolean; className?:string; }
export default function SectionHeader({ eyebrow, title, subtitle, centered=false, className="" }:Props) {
  return (
    <div className={`${centered?"text-center":""} ${className}`}>
      <div className={`flex items-center gap-4 mb-4 ${centered?"justify-center":""}`}>
        <div className="w-7 h-px bg-[#f97316] flex-shrink-0" />
        <span className="font-cond text-[11px] tracking-[0.24em] uppercase text-[#f97316]">{eyebrow}</span>
      </div>
      <h2 className="font-cond font-bold text-[clamp(32px,5vw,56px)] tracking-wide leading-none text-white mb-4">{title}</h2>
      <div className={`w-11 h-0.5 bg-[#f97316] mb-5 ${centered?"mx-auto":""}`} />
      {subtitle && <p className={`font-playfair italic text-[17px] leading-relaxed text-[#9ba4be] ${centered?"max-w-lg mx-auto":"max-w-xl"}`}>{subtitle}</p>}
    </div>
  );
}
