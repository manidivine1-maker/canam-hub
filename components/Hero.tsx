"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-101px)] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060709]/60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#060709] via-[#0d1320] to-[#0a0800] z-[-1]" />
      <div className="absolute inset-0 grid-bg opacity-30 z-0" />
      <div className="relative z-10 px-[5%] max-w-[1400px] mx-auto w-full py-16">
        <div className="max-w-[660px]">
          <div className="flex items-center gap-4 mb-7">
            <div className="w-9 h-px bg-[#f97316]" />
            <span className="font-cond text-[11px] tracking-[0.26em] uppercase text-[#f97316]">Authorized Can-Am Dealership - Est. 2016</span>
          </div>
          <h1 className="font-playfair font-extrabold leading-[1.02] mb-5">
            <span className="block text-[clamp(42px,7.5vw,86px)] text-white">CanAm <em className="italic text-[#f97316]">Off Road</em></span>
            <span className="block text-[clamp(42px,7.5vw,86px)] text-[#f97316]">Hub.</span>
          </h1>
          <p className="font-cond font-bold text-[clamp(18px,2.5vw,30px)] tracking-[0.08em] uppercase text-[#6b7694] mb-5">Where Adventure Begins</p>
          <p className="text-[#9ba4be] text-[17px] leading-[1.8] max-w-[520px] mb-10">Premium Can-Am ATVs, side-by-sides, and utility vehicles curated for riders who demand more. Sales, rentals, financing, and expert service all under one roof.</p>
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href="/inventory" className="btn-gold">Explore Inventory <ArrowRight size={16}/></Link>
            <Link href="/contact" className="btn-outline">Schedule Test Ride</Link>
            <Link href="/rentals" className="btn-outline">Book Rental</Link>
          </div>
          <div className="flex flex-wrap gap-10">
            {[["150+","Vehicles in Stock"],["8+","Years Experience"],["500+","Happy Riders"],["4.9","Customer Rating"]].map(([val,lbl]) => (
              <div key={lbl} className="relative pl-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-9 bg-[#f97316]" />
                <div className="font-playfair text-[30px] font-bold text-[#f97316] leading-none">{val}</div>
                <div className="font-cond text-[11px] uppercase tracking-wide text-[#6b7694] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 z-10">
        <span className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#6b7694]">Scroll</span>
        <ChevronDown size={16} className="text-[#f97316] animate-bounce"/>
      </div>
    </section>
  );
}