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
  {icon:"ðŸ†",title:"Authorized Dealer",desc:"Factory-certified technicians and genuine OEM parts on every job."},
  {icon:"ðŸ’Ž",title:"White-Glove Service",desc:"No pressure, no rush. Every customer gets our complete attention."},
  {icon:"ðŸ’°",title:"Flexible Financing",desc:"Pre-approval in minutes with 8+ lending partners. All credit welcome."},
  {icon:"ðŸ—“ï¸",title:"Try Before You Buy",desc:"Rent any machine before you commit. Fee credited toward purchase."},
  {icon:"ðŸ”§",title:"Expert Service",desc:"State-of-the-art workshop with fast turnarounds and honest pricing."},
  {icon:"ðŸ¤",title:"Trade-Ins Welcome",desc:"Fair-value appraisals accepted toward any new or pre-owned vehicle."},
  {icon:"ðŸšš",title:"Delivery Available",desc:"White-glove delivery with full walk-through anywhere in the region."},
  {icon:"ðŸ“¦",title:"Parts & Accessories",desc:"Genuine Can-Am parts and accessories in stock. Express orders too."},
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
