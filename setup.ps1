Write-Host "Part 4 - Pages and API routes..." -ForegroundColor Green

Set-Content -Path "app/page.tsx" -Encoding UTF8 -Value @'
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import CtaStrip from "../components/CtaStrip";
import SectionHeader from "../components/SectionHeader";
import VehicleCard from "../components/VehicleCard";
import TestimonialCard from "../components/TestimonialCard";
import { vehicles } from "../data/vehicles";
import { testimonials } from "../data/testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const WHY = [
  {icon:"🏆",title:"Authorized Dealer",desc:"Factory-certified technicians and genuine OEM parts on every job."},
  {icon:"💎",title:"White-Glove Service",desc:"No pressure, no rush. Every customer gets our complete attention."},
  {icon:"💰",title:"Flexible Financing",desc:"Pre-approval in minutes with 8+ lending partners. All credit welcome."},
  {icon:"🗓️",title:"Try Before You Buy",desc:"Rent any machine before you commit. Fee credited toward purchase."},
  {icon:"🔧",title:"Expert Service",desc:"State-of-the-art workshop with fast turnarounds and honest pricing."},
  {icon:"🤝",title:"Trade-Ins Welcome",desc:"Fair-value appraisals accepted toward any new or pre-owned vehicle."},
  {icon:"🚚",title:"Delivery Available",desc:"White-glove delivery with full walk-through anywhere in the region."},
  {icon:"📦",title:"Parts & Accessories",desc:"Genuine Can-Am parts and accessories in stock. Express orders too."},
];
export default function HomePage() {
  const featured = vehicles.filter(v => v.featured);
  const topThree = testimonials.slice(0,3);
  return (
    <>
      <Hero />
      <Ticker />
      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <SectionHeader eyebrow="Featured Vehicles" title="HOT OFF THE LOT" subtitle="Hand-selected machines ready for delivery. New arrivals weekly." />
            <Link href="/inventory" className="btn-outline shrink-0 whitespace-nowrap self-start lg:self-auto">View All Inventory <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0,3).map((v,i) => <VehicleCard key={v.id} vehicle={v} index={i}/>)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#0c0e14]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="The Hub Advantage" title="WHY CHOOSE US" subtitle="We do not just sell machines - we build lasting relationships." className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#1e2333]" style={{gap:"1px",background:"#1e2333"}}>
            {WHY.map(item => (
              <div key={item.title} className="bg-[#181c28] p-7 group hover:bg-[#1e2333] transition-colors">
                <div className="text-[34px] mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{item.icon}</div>
                <h3 className="font-playfair text-[17px] font-bold mb-2.5 leading-snug group-hover:text-[#fb923c] transition-colors">{item.title}</h3>
                <p className="text-[#9ba4be] text-[13px] leading-[1.75]">{item.desc}</p>
                <div className="w-7 h-0.5 bg-[#f97316] mt-5 group-hover:w-14 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <SectionHeader eyebrow="Customer Reviews" title="WHAT OUR RIDERS SAY" subtitle="Over 500 happy customers and counting." />
            <Link href="/testimonials" className="btn-outline shrink-0 whitespace-nowrap self-start lg:self-auto">All Reviews <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topThree.map(t => <TestimonialCard key={t.id} testimonial={t}/>)}
          </div>
        </div>
      </section>
      <CtaStrip title="Ready to Find Your Perfect Ride?" subtitle="Visit the showroom, schedule a test ride, or get a personalized quote." actions={[{label:"Get a Free Quote",href:"/contact",primary:true},{label:"Book a Rental",href:"/rentals",primary:false},{label:"Browse Inventory",href:"/inventory",primary:false}]} />
    </>
  );
}
'@
Write-Host "  app/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/inventory/page.tsx" -Encoding UTF8 -Value @'
"use client";
import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import VehicleCard from "../../components/VehicleCard";
import CtaStrip from "../../components/CtaStrip";
import SectionHeader from "../../components/SectionHeader";
import { vehicles } from "../../data/vehicles";
import type { VehicleType } from "../../data/vehicles";
const TYPES:[VehicleType|"all",string][] = [["all","All"],["sxs","SxS"],["atv","ATVs"],["utility","Utility"],["used","Pre-Owned"]];
export default function InventoryPage() {
  const [type,setType] = useState<VehicleType|"all">("all");
  const [query,setQuery] = useState("");
  const [sort,setSort] = useState("featured");
  const [maxPrice,setMaxPrice] = useState(40000);
  const results = useMemo(() => {
    let list = [...vehicles];
    if(type!=="all") list=list.filter(v=>v.type===type);
    if(query.trim()){const q=query.toLowerCase();list=list.filter(v=>v.name.toLowerCase().includes(q)||v.brand.toLowerCase().includes(q)||v.specs.some(s=>s.toLowerCase().includes(q)));}
    list=list.filter(v=>v.price<=maxPrice);
    if(sort==="price-low") list.sort((a,b)=>a.price-b.price);
    else if(sort==="price-high") list.sort((a,b)=>b.price-a.price);
    else if(sort==="newest") list.sort((a,b)=>b.year-a.year);
    else list.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));
    return list;
  },[type,query,sort,maxPrice]);
  const clearAll=()=>{setType("all");setQuery("");setSort("featured");setMaxPrice(40000);};
  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-8 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Full Inventory" title="BROWSE ALL VEHICLES" subtitle={`${vehicles.length} vehicles available.`} className="mb-7" />
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#12151e] border border-[#1e2333] px-3 py-2.5 min-w-[240px] flex-1 max-w-[320px]">
              <Search size={14} className="text-[#6b7694] shrink-0"/>
              <input type="text" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search vehicles..." className="bg-transparent text-white text-sm outline-none w-full placeholder:text-[#6b7694]"/>
              {query&&<button onClick={()=>setQuery("")} className="text-[#6b7694] hover:text-[#f97316]"><X size={13}/></button>}
            </div>
            {TYPES.map(([val,lbl])=>(
              <button key={val} onClick={()=>setType(val)} className={`font-cond text-[12px] font-semibold tracking-[0.1em] uppercase px-4 py-2.5 border transition-all ${type===val?"bg-[#f97316] border-[#f97316] text-white":"bg-transparent border-[#1e2333] text-[#9ba4be] hover:border-[#f97316] hover:text-[#f97316]"}`}>{lbl}</button>
            ))}
            <select value={sort} onChange={e=>setSort(e.target.value)} className="bg-[#12151e] border border-[#1e2333] text-[#9ba4be] font-cond text-[12px] px-3 py-2.5 outline-none hover:border-[#f97316] transition-colors cursor-pointer ml-auto">
              <option value="featured">Featured</option><option value="price-low">Price Low</option><option value="price-high">Price High</option><option value="newest">Newest</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <SlidersHorizontal size={14} className="text-[#6b7694] shrink-0"/>
            <span className="font-cond text-[11px] tracking-[0.14em] uppercase text-[#6b7694] whitespace-nowrap">Max Price</span>
            <input type="range" min={5000} max={40000} step={500} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="flex-1 max-w-xs accent-[#f97316] cursor-pointer"/>
            <span className="font-playfair font-bold text-[#f97316] whitespace-nowrap">${maxPrice.toLocaleString()}</span>
            <button onClick={clearAll} className="font-cond text-[11px] tracking-[0.1em] uppercase text-[#6b7694] hover:text-[#f97316] transition-colors flex items-center gap-1.5"><X size={12}/>Reset</button>
          </div>
          <p className="font-cond text-[12px] tracking-wide text-[#6b7694] mt-3">Showing <span className="text-[#f97316] font-bold">{results.length}</span> of {vehicles.length} vehicles</p>
        </div>
      </section>
      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          {results.length>0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((v,i)=><VehicleCard key={v.id} vehicle={v} index={i}/>)}
            </div>
          ):(
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="font-playfair text-2xl font-bold text-white mb-3">No vehicles match your filters</h3>
              <button onClick={clearAll} className="btn-gold mt-4">Clear All Filters</button>
            </div>
          )}
        </div>
      </section>
      <CtaStrip title="Can't Find What You Need?" subtitle="We source vehicles to order." actions={[{label:"Request a Vehicle",href:"/contact",primary:true}]}/>
    </>
  );
}
'@
Write-Host "  app/inventory/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/rentals/page.tsx" -Encoding UTF8 -Value @'
import RentalCard from "../../components/RentalCard";
import SectionHeader from "../../components/SectionHeader";
import CtaStrip from "../../components/CtaStrip";
import { rentals } from "../../data/rentals";
import type { Metadata } from "next";
export const metadata:Metadata = {title:"Rentals"};
export default function RentalsPage() {
  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-10 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Rental Fleet" title="HIT THE TRAILS TODAY" subtitle="No experience required. All rentals include helmet, goggles, and a full safety briefing."/>
        </div>
      </section>
      <section className="section-pad bg-[#0c0e14]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {rentals.map(r=><RentalCard key={r.id} rental={r}/>)}
          </div>
        </div>
      </section>
      <section className="section-pad-sm bg-[#12151e] border-y border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="How It Works" title="FROM BOOKING TO TRAIL" className="mb-10"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{step:"01",title:"Choose Your Machine",desc:"Browse the fleet and pick the vehicle that matches your adventure."},{step:"02",title:"Book & Deposit",desc:"Reserve online or call us. A refundable deposit locks your machine in."},{step:"03",title:"Safety Briefing",desc:"Our team walks you through controls, trail rules, and safety protocols."},{step:"04",title:"Hit the Trail",desc:"You are off! Explore with peace of mind and 24/7 roadside support."}].map(s=>(
              <div key={s.step} className="bg-[#181c28] border border-[#1e2333] p-6">
                <div className="font-cond font-bold text-[48px] text-[#f97316]/20 leading-none mb-3">{s.step}</div>
                <h3 className="font-playfair text-[17px] font-bold mb-2">{s.title}</h3>
                <p className="text-[#9ba4be] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaStrip title="Ready to Ride Today?" subtitle="Book online or call us to check availability." actions={[{label:"Call (555) 123-4567",href:"/contact",primary:true},{label:"Online Booking",href:"/contact",primary:false}]}/>
    </>
  );
}
'@
Write-Host "  app/rentals/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/testimonials/page.tsx" -Encoding UTF8 -Value @'
import TestimonialCard from "../../components/TestimonialCard";
import SectionHeader from "../../components/SectionHeader";
import CtaStrip from "../../components/CtaStrip";
import { testimonials } from "../../data/testimonials";
import { Star } from "lucide-react";
import type { Metadata } from "next";
export const metadata:Metadata = {title:"Customer Reviews"};
export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-10 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Customer Reviews" title="WHAT OUR RIDERS SAY" subtitle="Over 500 happy customers. Real riders, real experiences."/>
        </div>
      </section>
      <section className="bg-[#060709] px-[5%] py-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#0c0e14] border border-[#1e2333] p-8">
            <div className="text-center sm:text-left">
              <div className="font-playfair text-[54px] font-bold text-[#f97316] leading-none">4.9</div>
              <div className="flex gap-0.5 mt-1.5 justify-center sm:justify-start">{Array(5).fill(0).map((_,i)=><Star key={i} size={15} className="text-[#f97316] fill-[#f97316]"/>)}</div>
            </div>
            <div className="w-px h-14 bg-[#1e2333] hidden sm:block"/>
            <div className="text-center sm:text-left">
              <div className="font-playfair text-[22px] font-bold text-white mb-1">Average Customer Rating</div>
              <p className="text-[#9ba4be] text-sm">Based on 500+ verified reviews</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {testimonials.map(t=><TestimonialCard key={t.id} testimonial={t}/>)}
          </div>
        </div>
      </section>
      <CtaStrip title="Join Our Happy Riders" subtitle="Experience the CanAm Off Road Hub difference." actions={[{label:"Get a Free Quote",href:"/contact",primary:true},{label:"Browse Inventory",href:"/inventory",primary:false}]}/>
    </>
  );
}
'@
Write-Host "  app/testimonials/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/gallery/page.tsx" -Encoding UTF8 -Value @'
import Image from "next/image";
import SectionHeader from "../../components/SectionHeader";
import type { Metadata } from "next";
export const metadata:Metadata = {title:"Gallery"};
const GALLERY = [
  {src:"",alt:"Maverick X3 on Desert Dunes",emoji:"🏎️",wide:true,tall:true},
  {src:"",alt:"Outlander Trail Ride",emoji:"🏍️",wide:false,tall:false},
  {src:"",alt:"Family Adventure Day",emoji:"👨‍👩‍👧‍👦",wide:false,tall:false},
  {src:"",alt:"Our Showroom Floor",emoji:"🏪",wide:false,tall:false},
  {src:"",alt:"Renegade Mud Run",emoji:"💨",wide:false,tall:false},
  {src:"",alt:"Defender HD10 Farm Work",emoji:"🚜",wide:true,tall:false},
  {src:"",alt:"Safety Gear",emoji:"🪖",wide:false,tall:false},
  {src:"",alt:"Golden Hour Trail",emoji:"🌅",wide:false,tall:true},
  {src:"",alt:"Race Day",emoji:"🏁",wide:false,tall:false},
];
export default function GalleryPage() {
  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-10 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Photo Gallery" title="LIFE AT THE HUB" subtitle="From our showroom to the trails."/>
        </div>
      </section>
      <section className="section-pad bg-[#060709]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
            {GALLERY.map((item,i) => (
              <div key={i} className={`relative overflow-hidden bg-[#12151e] border border-[#1e2333] hover:border-[#f97316]/50 transition-colors group cursor-pointer flex items-center justify-center ${item.wide?"col-span-2":""} ${item.tall?"row-span-2":""}`}>
                {item.src ? (
                  <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw"/>
                ) : (
                  <span className="text-[64px] group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-cond text-[12px] tracking-[0.1em] uppercase text-white">{item.alt}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-cond text-[12px] tracking-[0.15em] uppercase text-[#6b7694] mt-10">Follow @CanAmOffRoadHub on Instagram for daily trail content</p>
        </div>
      </section>
    </>
  );
}
'@
Write-Host "  app/gallery/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/contact/page.tsx" -Encoding UTF8 -Value @'
"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Check } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import CtaStrip from "../../components/CtaStrip";
interface F {firstName:string;lastName:string;email:string;phone:string;inquiry:string;vehicle:string;message:string;}
const BLANK:F={firstName:"",lastName:"",email:"",phone:"",inquiry:"",vehicle:"",message:""};
export default function ContactPage() {
  const [form,setForm]=useState<F>(BLANK);
  const [errors,setErrors]=useState<Partial<F>>({});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const validate=()=>{const e:Partial<F>={};if(!form.firstName.trim())e.firstName="Required";if(!form.lastName.trim())e.lastName="Required";if(!form.email||!/\S+@\S+\.\S+/.test(form.email))e.email="Valid email required";if(!form.message.trim()||form.message.length<10)e.message="At least 10 characters";return e;};
  const submit=async(e:React.FormEvent)=>{e.preventDefault();const errs=validate();if(Object.keys(errs).length>0){setErrors(errs);return;}setSubmitting(true);await new Promise(r=>setTimeout(r,1000));setSubmitting(false);setSubmitted(true);};
  const upd=(k:keyof F,v:string)=>{setForm(p=>({...p,[k]:v}));setErrors(p=>({...p,[k]:undefined}));};
  return (
    <>
      <section className="bg-[#0c0e14] px-[5%] pt-10 pb-10 border-b border-[#1e2333]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Get in Touch" title="LETS TALK MACHINES" subtitle="Buying, renting, financing, or just curious - our team is here for you."/>
        </div>
      </section>
      <section className="section-pad bg-[#0c0e14]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14">
            <div className="flex flex-col gap-4">
              {[
                {icon:<MapPin size={20}/>,label:"Visit Us",content:<div><p className="text-[#9ba4be] text-sm">123 Off-Road Way</p><p className="text-[#9ba4be] text-sm">Centre, CM 12345</p></div>},
                {icon:<Phone size={20}/>,label:"Call or WhatsApp",content:<div><a href="tel:5551234567" className="font-playfair text-[18px] font-bold text-white hover:text-[#f97316] transition-colors">(555) 123-4567</a><div className="mt-1"><a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#f97316] font-cond"><MessageSquare size={13}/>WhatsApp Us</a></div></div>},
                {icon:<Mail size={20}/>,label:"Email Us",content:<div><a href="mailto:info@canamoffroadhub.com" className="text-[#9ba4be] text-sm hover:text-[#f97316] transition-colors">info@canamoffroadhub.com</a><p className="text-[#6b7694] text-xs mt-1">Response within 2-4 hours</p></div>},
                {icon:<Clock size={20}/>,label:"Business Hours",content:<div className="flex flex-col divide-y divide-[#1e2333]">{[{day:"Mon-Fri",time:"9AM-6PM",open:true},{day:"Saturday",time:"9AM-4PM",open:true},{day:"Sunday",time:"Closed",open:false}].map(({day,time,open})=><div key={day} className="flex justify-between text-sm gap-6 py-1.5"><span className="text-[#9ba4be]">{day}</span><span className={open?"text-green-400":"text-red-400"}>{time}</span></div>)}</div>},
              ].map(item=>(
                <div key={item.label} className="flex items-start gap-4 p-5 bg-[#181c28] border border-[#1e2333] hover:border-[#f97316]/30 transition-colors">
                  <div className="w-11 h-11 bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center text-[#f97316] shrink-0">{item.icon}</div>
                  <div><div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-2">{item.label}</div>{item.content}</div>
                </div>
              ))}
              <div className="bg-[#12151e] border border-[#1e2333] h-44 flex flex-col items-center justify-center gap-2 text-[#6b7694] mt-2">
                <span className="text-[32px]">🗺️</span>
                <span className="font-cond text-[11px] tracking-[0.12em] uppercase">123 Off-Road Way, Centre, CM</span>
                <span className="text-xs opacity-60">Replace with Google Maps embed</span>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="bg-[#181c28] border border-green-500/30 p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-5"><Check size={32} className="text-green-400"/></div>
                  <h3 className="font-playfair text-[28px] font-bold text-green-400 mb-3">Message Sent!</h3>
                  <p className="text-[#9ba4be] text-[15px] leading-relaxed mb-8 max-w-sm">A specialist will contact you within <strong className="text-white">1 business hour</strong>.</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a href="/inventory" className="btn-gold text-[12px] py-2.5 px-6">Browse Inventory</a>
                    <button onClick={()=>{setSubmitted(false);setForm(BLANK);}} className="btn-outline text-[12px] py-2.5 px-6">Send Another</button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#181c28] border border-[#1e2333] p-8">
                  <h3 className="font-playfair text-[24px] font-bold text-white mb-1">Send Us a Message</h3>
                  <p className="text-[#9ba4be] text-sm mb-7">Fill out the form and we will get back to you fast.</p>
                  <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
                    <div className="grid grid-cols-2 gap-4">
                      {([["firstName","First Name","John"],["lastName","Last Name","Doe"]] as const).map(([k,l,p])=>(
                        <div key={k}><label className="label">{l}</label><input value={form[k]} onChange={e=>upd(k,e.target.value)} placeholder={p} className={`input ${errors[k]?"border-red-500":""}`}/>{errors[k]&&<p className="text-red-400 text-xs mt-1">{errors[k]}</p>}</div>
                      ))}
                    </div>
                    <div><label className="label">Email *</label><input type="email" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="john@example.com" className={`input ${errors.email?"border-red-500":""}`}/>{errors.email&&<p className="text-red-400 text-xs mt-1">{errors.email}</p>}</div>
                    <div><label className="label">Phone / WhatsApp</label><input type="tel" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="(555) 000-0000" className="input"/></div>
                    <div><label className="label">Inquiry Type</label><select value={form.inquiry} onChange={e=>upd("inquiry",e.target.value)} className="input"><option>Select inquiry type</option><option>Purchasing a Vehicle</option><option>Renting a Vehicle</option><option>Schedule a Test Ride</option><option>Financing</option><option>Service and Repairs</option><option>General Question</option></select></div>
                    <div><label className="label">Vehicle of Interest</label><input value={form.vehicle} onChange={e=>upd("vehicle",e.target.value)} placeholder="e.g. Maverick X3 Turbo RR..." className="input"/></div>
                    <div><label className="label">Your Message *</label><textarea value={form.message} onChange={e=>upd("message",e.target.value)} rows={4} placeholder="Tell us about your riding experience, budget, or any questions..." className={`input resize-none ${errors.message?"border-red-500":""}`}/>{errors.message&&<p className="text-red-400 text-xs mt-1">{errors.message}</p>}</div>
                    <button type="submit" disabled={submitting} className={`btn-gold justify-center text-[14px] py-4 mt-1 ${submitting?"opacity-70 cursor-wait":""}`}>
                      {submitting?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending...</>:"Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <CtaStrip title="Ready to Start Your Adventure?" subtitle="We are here Monday through Saturday." actions={[{label:"Call Now",href:"tel:5551234567",primary:true},{label:"Browse Inventory",href:"/inventory",primary:false}]}/>
    </>
  );
}
'@
Write-Host "  app/contact/page.tsx" -ForegroundColor Cyan

Set-Content -Path "app/api/vehicles/route.ts" -Encoding UTF8 -Value @'
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","vehicles.json");
function read(){try{return JSON.parse(readFileSync(FILE,"utf-8"));}catch{return[];}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function POST(req:Request){const body=await req.json();const data=read();const item={...body,id:Date.now()};data.push(item);write(data);return NextResponse.json({ok:true,item});}
export async function PUT(req:Request){const body=await req.json();const data=read();const idx=data.findIndex((v:{id:number})=>v.id===body.id);if(idx===-1)return NextResponse.json({ok:false},{status:404});data[idx]=body;write(data);return NextResponse.json({ok:true});}
export async function DELETE(req:Request){const{id}=await req.json();write(read().filter((v:{id:number})=>v.id!==id));return NextResponse.json({ok:true});}
'@

Set-Content -Path "app/api/rentals/route.ts" -Encoding UTF8 -Value @'
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","rentals.json");
function read(){try{return JSON.parse(readFileSync(FILE,"utf-8"));}catch{return[];}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function POST(req:Request){const body=await req.json();const data=read();const item={...body,id:Date.now()};data.push(item);write(data);return NextResponse.json({ok:true,item});}
export async function PUT(req:Request){const body=await req.json();const data=read();const idx=data.findIndex((v:{id:number})=>v.id===body.id);if(idx===-1)return NextResponse.json({ok:false},{status:404});data[idx]=body;write(data);return NextResponse.json({ok:true});}
export async function DELETE(req:Request){const{id}=await req.json();write(read().filter((v:{id:number})=>v.id!==id));return NextResponse.json({ok:true});}
'@

Set-Content -Path "app/api/testimonials/route.ts" -Encoding UTF8 -Value @'
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","testimonials.json");
function read(){try{return JSON.parse(readFileSync(FILE,"utf-8"));}catch{return[];}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function POST(req:Request){const body=await req.json();const data=read();const item={...body,id:Date.now()};data.push(item);write(data);return NextResponse.json({ok:true,item});}
export async function PUT(req:Request){const body=await req.json();const data=read();const idx=data.findIndex((v:{id:number})=>v.id===body.id);if(idx===-1)return NextResponse.json({ok:false},{status:404});data[idx]=body;write(data);return NextResponse.json({ok:true});}
export async function DELETE(req:Request){const{id}=await req.json();write(read().filter((v:{id:number})=>v.id!==id));return NextResponse.json({ok:true});}
'@

Set-Content -Path "app/api/site/route.ts" -Encoding UTF8 -Value @'
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","site.json");
const DEFAULT = {name:"CanAm Off Road Hub",tagline:"Premium ATVs, SxS & Off-Road Vehicles",phone:"(555) 123-4567",phoneRaw:"15551234567",email:"info@canamoffroadhub.com",address:"123 Off-Road Way, Centre, CM 12345",mapUrl:"",instagram:"",facebook:"",hours:[{day:"Monday - Friday",time:"9:00 AM - 6:00 PM",open:true},{day:"Saturday",time:"9:00 AM - 4:00 PM",open:true},{day:"Sunday",time:"Closed",open:false}]};
function read(){try{const d=JSON.parse(readFileSync(FILE,"utf-8"));return Object.keys(d).length>0?d:DEFAULT;}catch{return DEFAULT;}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function PUT(req:Request){const body=await req.json();write(body);return NextResponse.json({ok:true});}
'@

Set-Content -Path "app/api/upload/route.ts" -Encoding UTF8 -Value @'
import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
export async function POST(req:Request){
  try{
    const formData=await req.formData();
    const file=formData.get("file") as File;
    const folder=(formData.get("folder") as string)||"vehicles";
    if(!file)return NextResponse.json({ok:false,error:"No file"},{status:400});
    const bytes=await file.arrayBuffer();
    const buffer=Buffer.from(bytes);
    const safeName=file.name.replace(/[^a-zA-Z0-9.\-_]/g,"-").toLowerCase();
    const dir=join(process.cwd(),"public",folder);
    mkdirSync(dir,{recursive:true});
    writeFileSync(join(dir,safeName),buffer);
    return NextResponse.json({ok:true,path:`/${folder}/${safeName}`});
  }catch(e){return NextResponse.json({ok:false,error:String(e)},{status:500});}
}
'@
Write-Host "  API routes done" -ForegroundColor Cyan

Write-Host "ALL PARTS DONE! Now run: npm run dev" -ForegroundColor Green
Write-Host "Open: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Admin: http://localhost:3000/admin" -ForegroundColor Yellow