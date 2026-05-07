"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
const LINKS = [{href:"/",label:"Home"},{href:"/inventory",label:"Inventory"},{href:"/rentals",label:"Rentals"},{href:"/testimonials",label:"Reviews"},{href:"/gallery",label:"Gallery"},{href:"/contact",label:"Contact"}];
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen,setMenu] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn(); window.addEventListener("scroll",fn,{passive:true});
    return () => window.removeEventListener("scroll",fn);
  },[]);
  useEffect(() => { setMenu(false); },[pathname]);
  return (
    <>
      <div className="hidden md:flex items-center justify-between bg-[#060709] border-b border-[#1e2333] px-[5%] py-2">
        <div className="flex items-center gap-6">
          <a href="tel:5551234567" className="flex items-center gap-2 font-cond text-[11px] tracking-[0.1em] text-[#6b7694] hover:text-[#f97316] transition-colors"><Phone size={12} className="text-[#f97316]"/>(555) 123-4567</a>
          <a href="mailto:info@canamoffroadhub.com" className="flex items-center gap-2 font-cond text-[11px] tracking-[0.1em] text-[#6b7694] hover:text-[#f97316] transition-colors"><Mail size={12} className="text-[#f97316]"/>info@canamoffroadhub.com</a>
        </div>
        <div className="flex items-center gap-6 font-cond text-[11px] tracking-[0.08em] text-[#6b7694]">
          <span><span className="text-[#9ba4be]">Mon-Fri:</span> 9AM-6PM</span>
          <span><span className="text-[#9ba4be]">Sat:</span> 9AM-4PM</span>
          <span className="text-red-400"><span className="text-[#9ba4be]">Sun:</span> Closed</span>
        </div>
      </div>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled?"top-0 bg-[#060709]/95 backdrop-blur-sm border-b border-[#1e2333] shadow-lg":"top-0 md:top-[33px] bg-transparent"}`}>
        <div className="flex items-center justify-between px-[5%] h-[68px]">
          <Link href="/" className="group flex flex-col">
            <span className="font-playfair text-[20px] font-bold leading-tight text-white group-hover:text-[#f97316] transition-colors">CanAm Off Road Hub</span>
            <span className="font-cond text-[9px] tracking-[0.22em] uppercase text-[#f97316]">Premium ATVs - SxS - Off-Road Vehicles</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-8 list-none">
            {LINKS.map(({href,label}) => (
              <li key={href}><Link href={href} className={`font-cond text-[12px] tracking-[0.12em] uppercase transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-[#f97316] after:transition-all after:duration-300 ${pathname===href?"text-[#f97316] after:w-full":"text-[#9ba4be] hover:text-[#f97316] after:w-0 hover:after:w-full"}`}>{label}</Link></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:inline-block btn-gold text-[12px] py-2.5 px-5">Get a Quote</Link>
            <button onClick={() => setMenu(!menuOpen)} className="lg:hidden text-white hover:text-[#f97316] transition-colors" aria-label="Toggle navigation">
              {menuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#0c0e14] border-t border-[#1e2333] ${menuOpen?"max-h-96 opacity-100":"max-h-0 opacity-0"}`}>
          <div className="flex flex-col px-[5%] py-5 gap-1">
            {LINKS.map(({href,label}) => (
              <Link key={href} href={href} className={`font-cond text-[13px] tracking-[0.1em] uppercase py-3 border-b border-[#1e2333] transition-colors ${pathname===href?"text-[#f97316]":"text-[#9ba4be] hover:text-[#f97316]"}`}>{label}</Link>
            ))}
            <Link href="/contact" className="btn-gold mt-4 text-center justify-center">Get a Quote</Link>
          </div>
        </div>
      </nav>
      <div className="h-[68px] md:h-[101px]" />
    </>
  );
}
