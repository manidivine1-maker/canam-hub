import { Star } from "lucide-react";
import type { Testimonial } from "../data/testimonials";
export default function TestimonialCard({ testimonial:t }:{ testimonial:Testimonial }) {
  return (
    <div className="bg-[#181c28] border border-[#1e2333] p-7 relative overflow-hidden hover:border-[#f97316]/30 transition-colors duration-300">
      <div className="absolute top-3 left-5 font-playfair text-[72px] text-[#f97316]/10 leading-none font-bold select-none">"</div>
      <div className="flex gap-0.5 mb-4">{Array(t.rating).fill(0).map((_,i) => <Star key={i} size={13} className="text-[#f97316] fill-[#f97316]" />)}</div>
      <div className="font-cond text-[10px] tracking-[0.16em] uppercase text-[#f97316] bg-[#f97316]/10 px-2 py-1 inline-block mb-4">{t.vehicle}</div>
      <blockquote className="text-[#9ba4be] text-[14px] leading-[1.8] italic mb-5 relative">"{t.text}"</blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-[#1e2333]">
        <div className="w-10 h-10 bg-[#12151e] border border-[#252b3d] flex items-center justify-center font-playfair text-[16px] font-bold text-[#f97316] shrink-0">{t.initials}</div>
        <div>
          <div className="font-cond text-[14px] font-bold tracking-wide text-white">{t.name}</div>
          <div className="font-cond text-[11px] uppercase tracking-wide text-[#6b7694]">{t.role} - {t.location}</div>
        </div>
      </div>
    </div>
  );
}
