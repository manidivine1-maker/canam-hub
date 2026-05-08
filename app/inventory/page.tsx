"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import VehicleCard from "../../components/VehicleCard";
import CtaStrip from "../../components/CtaStrip";
import SectionHeader from "../../components/SectionHeader";
import type { Vehicle, VehicleType } from "../../data/vehicles";

const TYPES: [VehicleType | "all", string][] = [["all", "All"], ["sxs", "SxS"], ["atv", "ATVs"], ["utility", "Utility"], ["used", "Pre-Owned"]];

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<VehicleType | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(100000);

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
    list = list.filter(v => v.price <= maxPrice);
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => b.year - a.year);
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [vehicles, type, query, sort, maxPrice]);

  const clearAll = () => { setType("all"); setQuery(""); setSort("featured"); setMaxPrice(100000); };

  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-8 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Full Inventory" title="BROWSE ALL VEHICLES" subtitle={`${vehicles.length} vehicles available.`} className="mb-7" />
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#12151e] border border-[#1e2333] px-3 py-2.5 min-w-[240px] flex-1 max-w-[320px]">
              <Search size={14} className="text-[#6b7694] shrink-0" />
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search vehicles..." className="bg-transparent text-white text-sm outline-none w-full placeholder:text-[#6b7694]" />
              {query && <button onClick={() => setQuery("")} className="text-[#6b7694] hover:text-[#f97316]"><X size={13} /></button>}
            </div>
            {TYPES.map(([val, lbl]) => (
              <button key={val} onClick={() => setType(val)} className={`font-cond text-[12px] font-semibold tracking-[0.1em] uppercase px-4 py-2.5 border transition-all ${type === val ? "bg-[#f97316] border-[#f97316] text-white" : "bg-transparent border-[#1e2333] text-[#9ba4be] hover:border-[#f97316] hover:text-[#f97316]"}`}>{lbl}</button>
            ))}
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-[#12151e] border border-[#1e2333] text-[#9ba4be] font-cond text-[12px] px-3 py-2.5 outline-none hover:border-[#f97316] transition-colors cursor-pointer ml-auto">
              <option value="featured">Featured</option>
              <option value="price-low">Price Low</option>
              <option value="price-high">Price High</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <SlidersHorizontal size={14} className="text-[#6b7694] shrink-0" />
            <span className="font-cond text-[11px] tracking-[0.14em] uppercase text-[#6b7694] whitespace-nowrap">Max Price</span>
            <input type="range" min={5000} max={100000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="flex-1 max-w-xs accent-[#f97316] cursor-pointer" />
            <span className="font-playfair font-bold text-[#f97316] whitespace-nowrap">${maxPrice.toLocaleString()}</span>
            <button onClick={clearAll} className="font-cond text-[11px] tracking-[0.1em] uppercase text-[#6b7694] hover:text-[#f97316] transition-colors flex items-center gap-1.5"><X size={12} />Reset</button>
          </div>
          <p className="font-cond text-[12px] tracking-wide text-[#6b7694] mt-3">Showing <span className="text-[#f97316] font-bold">{results.length}</span> of {vehicles.length} vehicles</p>
        </div>
      </section>

      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-[#f97316]/30 border-t-[#f97316] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#6b7694] font-cond uppercase tracking-wide">Loading inventory...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="font-playfair text-2xl font-bold text-white mb-3">
                {vehicles.length === 0 ? "No vehicles added yet" : "No vehicles match your filters"}
              </h3>
              <p className="text-[#9ba4be] mb-6">
                {vehicles.length === 0 ? "Add vehicles through the admin panel" : "Try adjusting your filters"}
              </p>
              {vehicles.length > 0 && <button onClick={clearAll} className="btn-gold">Clear Filters</button>}
            </div>
          )}
        </div>
      </section>

      <CtaStrip title="Can't Find What You Need?" subtitle="We source vehicles to order." actions={[{ label: "Request a Vehicle", href: "/contact", primary: true }]} />
    </>
  );
}