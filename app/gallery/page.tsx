import Image from "next/image";
import SectionHeader from "../../components/SectionHeader";
import type { Metadata } from "next";
export const metadata:Metadata = {title:"Gallery"};
const GALLERY = [
  {src:"",alt:"Maverick X3 on Desert Dunes",emoji:"ðŸŽï¸",wide:true,tall:true},
  {src:"",alt:"Outlander Trail Ride",emoji:"ðŸï¸",wide:false,tall:false},
  {src:"",alt:"Family Adventure Day",emoji:"ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦",wide:false,tall:false},
  {src:"",alt:"Our Showroom Floor",emoji:"ðŸª",wide:false,tall:false},
  {src:"",alt:"Renegade Mud Run",emoji:"ðŸ’¨",wide:false,tall:false},
  {src:"",alt:"Defender HD10 Farm Work",emoji:"ðŸšœ",wide:true,tall:false},
  {src:"",alt:"Safety Gear",emoji:"ðŸª–",wide:false,tall:false},
  {src:"",alt:"Golden Hour Trail",emoji:"ðŸŒ…",wide:false,tall:true},
  {src:"",alt:"Race Day",emoji:"ðŸ",wide:false,tall:false},
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
