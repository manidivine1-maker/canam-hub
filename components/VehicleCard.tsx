"use client";
import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "../data/vehicles";

export default function VehicleCard({ vehicle: v }: { vehicle: Vehicle; index?: number }) {
  const img = v.image || (v.images?.[0] ?? "");

  return (
    <Link href={`/inventory/${v.id}`} className="group block">
      {/* Image */}
      <div className="relative w-full aspect-square bg-[#12151e] overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={v.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[60px]">{v.emoji}</div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="font-cond text-[11px] tracking-[0.15em] uppercase text-[#6b7694] mb-0.5">{v.brand} · {v.year}</p>
        <h3 className="font-playfair text-[16px] font-bold text-white leading-snug mb-2 group-hover:text-[#f97316] transition-colors">{v.name}</h3>
        <p className="font-playfair text-[18px] font-bold text-white">${v.price.toLocaleString()}</p>
        {v.monthly && <p className="font-cond text-[11px] text-[#6b7694] mt-0.5">from ${v.monthly}/mo*</p>}
      </div>
    </Link>
  );
}