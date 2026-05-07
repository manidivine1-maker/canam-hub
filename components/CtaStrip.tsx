import Link from "next/link";
interface Action { label:string; href:string; primary:boolean; }
interface Props { title:string; subtitle:string; actions:Action[]; }
export default function CtaStrip({ title, subtitle, actions }:Props) {
  return (
    <section className="relative overflow-hidden border-y border-[#f97316]/20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/10 via-[#f97316]/5 to-[#f97316]/10" />
      <div className="relative z-10 px-[5%] py-16 text-center max-w-[1400px] mx-auto">
        <h2 className="font-playfair font-bold text-[clamp(26px,4vw,48px)] text-white mb-4 leading-tight">{title}</h2>
        <p className="text-[#9ba4be] text-[17px] mb-9 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {actions.map(a => <Link key={a.label} href={a.href} className={a.primary?"btn-gold":"btn-outline"}>{a.label}</Link>)}
        </div>
      </div>
    </section>
  );
}
