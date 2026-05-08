"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Vehicle } from "../data/vehicles";

const TYPE_LABEL: Record<string, string> = { sxs: "Side-by-Side", atv: "ATV", utility: "Utility", used: "Pre-Owned" };

export default function VehicleCard({ vehicle: v }: { vehicle: Vehicle; index?: number }) {
  const images = v.images && v.images.length > 0 ? v.images : v.image ? [v.image] : [];
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => { e.preventDefault(); setCurrent(i => (i === 0 ? images.length - 1 : i - 1)); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); setCurrent(i => (i === images.length - 1 ? 0 : i + 1)); };

  return (
    <Link href={`/inventory/${v.id}`} className="group block bg-[#0c0e14] border border-[#1e2333] overflow-hidden hover:border-[#f97316]/50 transition-all duration-300">
      {/* Image */}
      <div className="relative h-[220px] bg-[#12151e] overflow-hidden">
        {images.length > 0 ? (
          <>
            <Image src={images[current]} alt={v.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw"/>
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"><ChevronLeft size={15}/></button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"><ChevronRight size={15}/></button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                  {images.map((_, i) => <span key={i} className={`block rounded-full transition-all ${i === current ? "w-4 h-1.5 bg-[#f97316]" : "w-1.5 h-1.5 bg-white/40"}`}/>)}
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[70px]">{v.emoji}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-20 bg-black/70 font-cond text-[10px] tracking-[0.15em] uppercase text-[#f97316] px-2.5 py-1">{TYPE_LABEL[v.type]}</div>
      </div>

      {/* Info */}
      <div className="p-5 border-t border-[#1e2333]">
        <p className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#6b7694] mb-1">{v.brand} · {v.year}</p>
        <h3 className="font-playfair text-[17px] font-bold text-white leading-snug mb-4 group-hover:text-[#fb923c] transition-colors">{v.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-playfair text-[22px] font-bold text-[#f97316]">${v.price.toLocaleString()}</div>
            {v.monthly ? <div className="font-cond text-[10px] text-[#6b7694] mt-0.5">from ${v.monthly}/mo*</div> : null}
          </div>
          <span className="font-cond text-[10px] font-bold tracking-[0.12em] uppercase border border-[#f97316]/40 text-[#f97316] px-3 py-1.5 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-200">View</span>
        </div>
      </div>
    </Link>
  );
}