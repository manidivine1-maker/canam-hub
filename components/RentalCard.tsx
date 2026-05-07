import Link from "next/link";
import { Check } from "lucide-react";
import type { Rental } from "../data/rentals";
export default function RentalCard({ rental:r }:{ rental:Rental }) {
  return (
    <div className={`bg-[#181c28] border card-lift relative overflow-hidden ${r.popular?"border-[#f97316]/50":"border-[#1e2333]"}`}>
      {r.popular && <div className="absolute top-0 right-0 bg-[#f97316] font-cond text-[11px] font-bold tracking-[0.14em] uppercase text-white px-4 py-1.5">Most Popular</div>}
      <div className="p-7">
        <div className={`text-[40px] mb-4 ${r.popular?"mt-5":""}`}>{r.emoji}</div>
        <div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-2">{r.tagline}</div>
        <h3 className="font-playfair text-[22px] font-bold mb-3">{r.name}</h3>
        <p className="text-[#9ba4be] text-sm leading-relaxed mb-5">{r.description}</p>
        <div className="flex flex-wrap gap-5 pb-5 mb-5 border-b border-[#1e2333]">
          {r.halfDay>0&&<div><div className="font-playfair text-[30px] font-bold text-[#f97316] leading-none">${r.halfDay}</div><div className="text-[#6b7694] text-xs mt-1">Half Day</div></div>}
          {r.fullDay>0&&<div><div className="font-playfair text-[30px] font-bold text-[#9ba4be] leading-none">${r.fullDay}</div><div className="text-[#6b7694] text-xs mt-1">Full Day</div></div>}
          {r.weekend>0&&<div><div className="font-playfair text-[30px] font-bold text-[#9ba4be] leading-none">${r.weekend}</div><div className="text-[#6b7694] text-xs mt-1">Weekend</div></div>}
          {r.halfDay===0&&<div><div className="font-cond text-[22px] font-bold text-[#f97316] tracking-wide">Custom Quote</div><div className="text-[#6b7694] text-xs mt-1">Contact for pricing</div></div>}
        </div>
        <ul className="flex flex-col gap-2 mb-5 list-none">{r.features.map(f=><li key={f} className="flex items-center gap-2.5 text-sm text-[#9ba4be]"><Check size={13} className="text-[#f97316] shrink-0"/>{f}</li>)}</ul>
        <div className="flex flex-wrap gap-2 mb-6">{r.gear.map(g=><span key={g} className="font-cond text-[10px] tracking-wide uppercase text-[#6b7694] bg-[#12151e] border border-[#1e2333] px-2.5 py-1">{g}</span>)}</div>
        <Link href="/contact" className={`block w-full text-center font-cond text-[13px] font-bold tracking-[0.14em] uppercase py-3.5 transition-all ${r.popular?"bg-[#f97316] hover:bg-[#ea580c] text-white":"border border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"}`}>Reserve Now</Link>
        <p className="text-center text-[#6b7694] text-xs mt-2.5">${r.deposit} refundable deposit - Min. age 18</p>
      </div>
    </div>
  );
}
