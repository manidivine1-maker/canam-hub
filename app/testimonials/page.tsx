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
