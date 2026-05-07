import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#060709] border-t border-[#1e2333]">
      <div className="px-[5%] pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-playfair text-[21px] font-bold text-white mb-1">CanAm Off Road Hub</div>
            <div className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Premium ATVs - SxS - Off-Road Vehicles</div>
            <p className="text-[#6b7694] text-sm leading-relaxed mb-5 max-w-[220px]">Your authorized Can-Am dealership. Fueling adventures since 2016.</p>
            <div className="flex flex-col gap-2.5">
              <a href="tel:5551234567" className="flex items-center gap-2 text-sm text-[#6b7694] hover:text-[#f97316] transition-colors"><Phone size={13} className="text-[#f97316]"/>(503) 913-4945</a>
              <a href="mailto:canam.offroadhub@gmail.com" className="flex items-center gap-2 text-sm text-[#6b7694] hover:text-[#f97316] transition-colors"><Mail size={13} className="text-[#f97316]"/>canam.offroadhub@gmail.com</a>
              <span className="flex items-center gap-2 text-sm text-[#6b7694]"><MapPin size={13} className="text-[#f97316] shrink-0"/>United States</span>
            </div>
          </div>
          <div>
            <h4 className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Navigate</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {[["Home","/"],["Inventory","/inventory"],["Rentals","/rentals"],["Reviews","/testimonials"],["Gallery","/gallery"],["Contact","/contact"]].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-[#6b7694] hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Vehicles</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {["ATVs","Side-by-Sides","Utility Vehicles","Pre-Owned / CPO","Accessories","Service & Parts"].map(v => (
                <li key={v}><Link href="/inventory" className="text-sm text-[#6b7694] hover:text-white transition-colors">{v}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Hours</h4>
            <div className="flex flex-col divide-y divide-[#1e2333]">
              {[{day:"Mon - Fri",time:"9AM - 6PM",open:true},{day:"Saturday",time:"9AM - 4PM",open:true},{day:"Sunday",time:"Closed",open:false}].map(({day,time,open}) => (
                <div key={day} className="flex justify-between text-sm py-2.5">
                  <span className="text-[#9ba4be]">{day}</span>
                  <span className={open?"text-green-400":"text-red-400"}>{time}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-gold mt-5 text-[11px] py-2.5 px-5">Book a Visit</Link>
          </div>
        </div>
        <div className="border-t border-[#1e2333] pt-5 flex flex-col lg:flex-row gap-4 items-start justify-between">
          <p className="text-xs text-[#6b7694] leading-relaxed max-w-3xl">
            {`© ${year} CanAm Off Road Hub. All rights reserved. Independent authorized dealership. Not affiliated with BRP or Can-Am. All trademarks property of BRP Inc.`}
          </p>
          <div className="flex flex-wrap gap-4 shrink-0">
            {["Privacy Policy","Terms of Service","Financing Disclosure"].map(l => (
              <Link key={l} href="#" className="text-xs text-[#6b7694] hover:text-white transition-colors whitespace-nowrap">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
