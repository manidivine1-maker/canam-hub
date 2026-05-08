"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import VehicleCard from "../../components/VehicleCard";
import CtaStrip from "../../components/CtaStrip";
import type { Vehicle, VehicleType } from "../../data/vehicles";

const TYPES: [VehicleType | "all", string][] = [["all", "All"], ["sxs", "Side-by-Side"], ["atv", "ATV"], ["utility", "Utility"], ["used", "Pre-Owned"]];

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<VehicleType | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    fetch("/api/vehicles")
      .then(r => r.json())
      .then(data => { setVehicles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    let list = [...vehicles];
    if (type !== "all") list = list.filter(v => v.type === type);
    if (query.trim()) { const q = query.toLowerCase(); list = list.filter(v => v.name.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q)); }
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => b.year - a.year);
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [vehicles, type, query, sort]);

  return (
    <>
      {/* Header */}
      <div className="bg-[#060709] px-[5%] pt-12 pb-6 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-1">Our Inventory</h1>
          <p className="font-cond text-[12px] tracking-[0.2em] uppercase text-[#6b7694]">{vehicles.length} vehicles available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#060709] px-[5%] py-5 border-b border-[#1e2333] sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#0c0e14] border border-[#1e2333] px-3 py-2 min-w-[200px]">
            <Search size={13} className="text-[#6b7694] shrink-0"/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="bg-transparent text-white text-sm outline-none w-full placeholder:text-[#6b7694] font-cond"/>
            {query && <button onClick={() => setQuery("")}><X size={13} className="text-[#6b7694]"/></button>}
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {TYPES.map(([val, lbl]) => (
              <button key={val} onClick={() => setType(val)} className={`font-cond text-[11px] tracking-[0.1em] uppercase px-4 py-2 border transition-all ${type === val ? "border-white text-white" : "border-[#1e2333] text-[#6b7694] hover:border-[#6b7694] hover:text-white"}`}>{lbl}</button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} className="ml-auto bg-[#0c0e14] border border-[#1e2333] text-[#9ba4be] font-cond text-[11px] tracking-wide px-3 py-2 outline-none cursor-pointer">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-[#060709] px-[5%] py-10">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-[#f97316]/30 border-t-[#f97316] rounded-full animate-spin"/>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
              {results.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i}/>)}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="font-playfair text-2xl text-white mb-2">{vehicles.length === 0 ? "No vehicles yet" : "No results"}</p>
              <p className="text-[#6b7694] font-cond text-sm">{vehicles.length === 0 ? "Check back soon." : "Try a different filter."}</p>
            </div>
          )}
        </div>
      </div>

      <CtaStrip title="Can't Find What You Need?" subtitle="We source vehicles to order." actions={[{ label: "Request a Vehicle", href: "/contact", primary: true }]}/>
    </>
  );
}