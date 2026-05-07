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
