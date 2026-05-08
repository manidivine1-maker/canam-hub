"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Vehicle } from "../data/vehicles";

const BADGE:Record<string,{label:string;bg:string}> = {
  hot:{label:"Best Seller",bg:"bg-red-600"},
  new:{label:"New 2024",bg:"bg-[#f97316]"},
  cpo:{label:"CPO Cert.",bg:"bg-emerald-700"},
};
const TYPE_LABEL:Record<string,string> = {sxs:"Side-by-Side",atv:"ATV",utility:"Utility",used:"Pre-Owned"};

export default function VehicleCard({ vehicle:v }:{ vehicle:Vehicle; index?:number }) {
  const badge = v.badge ? BADGE[v.badge] : null;
  const images = v.images && v.images.length > 0 ? v.images : v.image ? [v.image] : [];
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <article className="bg-[#181c28] border border-[#1e2333] overflow-hidden card-lift group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Image zone */}
      <div className="h-[200px] bg-[#12151e] flex items-center justify-center relative overflow-hidden">
        {images.length > 0 ? (
          <>
            <Image
              src={images[current]}
              alt={`${v.name} photo ${current + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width:768px) 100vw,33vw"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16}/>
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16}/>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1">
                  {images.map((_,i) => (
                    <button
                      key={i}
                      onClick={e => { e.preventDefault(); setCurrent(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-[#f97316] w-3" : "bg-white/50"}`}
                    />
                  ))}
                </div>
                <div className="absolute top-2 right-2 z-30 bg-black/60 font-cond text-[10px] text-white px-2 py-0.5">
                  {current + 1}/{images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <span className="absolute font-cond font-bold text-[130px] text-white/[0.035] leading-none select-none pointer-events-none">{v.type.toUpperCase()}</span>
            <span className="text-[76px] relative z-10 transition-transform duration-300 group-hover:scale-110" role="img" aria-label={v.name}>{v.emoji}</span>
            <span className="absolute bottom-2 left-2 font-cond text-[10px] uppercase tracking-wider text-[#6b7694] bg-black/50 px-2 py-0.5 z-20">{v.color}</span>
          </>
        )}
        {badge && <span className={`absolute top-0 left-0 font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-white px-3 py-1.5 z-20 ${badge.bg}`}>{badge.label}</span>}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#f97316] mb-1">{v.brand} - {v.engine}</div>
        <h3 className="font-playfair text-[19px] font-bold leading-tight mb-1 group-hover:text-[#fb923c] transition-colors">{v.name}</h3>
        <div className="text-[#6b7694] text-sm mb-3">{v.year} - {TYPE_LABEL[v.type]}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {v.specs.map(s => <span key={s} className="font-cond text-[10px] tracking-wide uppercase text-[#9ba4be] bg-[#12151e] border border-[#1e2333] px-2 py-0.5">{s}</span>)}
        </div>
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