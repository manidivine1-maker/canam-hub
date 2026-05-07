import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "../data/vehicles";
const BADGE:Record<string,{label:string;bg:string}> = {
  hot:{label:"Best Seller",bg:"bg-red-600"},new:{label:"New 2024",bg:"bg-[#f97316]"},cpo:{label:"CPO Cert.",bg:"bg-emerald-700"},
};
const TYPE_LABEL:Record<string,string> = {sxs:"Side-by-Side",atv:"ATV",utility:"Utility",used:"Pre-Owned"};
export default function VehicleCard({ vehicle:v }:{ vehicle:Vehicle; index?:number }) {
  const badge = v.badge ? BADGE[v.badge] : null;
  return (
    <article className="bg-[#181c28] border border-[#1e2333] overflow-hidden card-lift group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <div className="h-[200px] bg-[#12151e] flex items-center justify-center relative overflow-hidden">
        {v.image ? (
          <Image src={v.image} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw,33vw" />
        ) : (
          <>
            <span className="absolute font-cond font-bold text-[130px] text-white/[0.035] leading-none select-none pointer-events-none">{v.type.toUpperCase()}</span>
            <span className="text-[76px] relative z-10 transition-transform duration-300 group-hover:scale-110" role="img" aria-label={v.name}>{v.emoji}</span>
          </>
        )}
        {badge && <span className={`absolute top-0 left-0 font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-white px-3 py-1.5 z-20 ${badge.bg}`}>{badge.label}</span>}
        <span className="absolute bottom-2 right-2 font-cond text-[10px] uppercase tracking-wider text-[#6b7694] bg-black/50 px-2 py-0.5 z-20">{v.color}</span>
      </div>
      <div className="p-5">
        <div className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#f97316] mb-1">{v.brand} - {v.engine}</div>
        <h3 className="font-playfair text-[19px] font-bold leading-tight mb-1 group-hover:text-[#fb923c] transition-colors">{v.name}</h3>
        <div className="text-[#6b7694] text-sm mb-3">{v.year} - {TYPE_LABEL[v.type]}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">{v.specs.map(s => <span key={s} className="font-cond text-[10px] tracking-wide uppercase text-[#9ba4be] bg-[#12151e] border border-[#1e2333] px-2 py-0.5">{s}</span>)}</div>
        <div className="flex items-end justify-between pt-4 border-t border-[#1e2333]">
          <div>
            <div className="font-playfair text-[22px] font-bold leading-none">${v.price.toLocaleString()}</div>
            {v.monthly ? <div className="text-[#6b7694] text-xs mt-1">from ${v.monthly}/mo*</div> : <div className="text-[#6b7694] text-xs mt-1">Clean title - Inspected</div>}
          </div>
          <Link href="/contact" className="border border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white font-cond text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 transition-all duration-200">Get Quote</Link>
        </div>
      </div>
    </article>
  );
}
