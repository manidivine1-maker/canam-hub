"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import type { Vehicle } from "../../../data/vehicles";

const WA_NUMBER = "15039134945";
const BIZ_EMAIL = "canam.offroadhub@gmail.com";

/* ── Shop Now Modal ── */
function ShopModal({ vehicle: v, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [interests, setInterests] = useState({ purchase: false, rent: false, testDrive: false });
  const [financing, setFinancing] = useState(false);
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggleInterest = (k: keyof typeof interests) => setInterests(p => ({ ...p, [k]: !p[k] }));
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return alert("Please fill in your name, phone, and email.");
    setBusy(true);
    const interestList = [interests.purchase && "Purchase", interests.rent && "Rent", interests.testDrive && "Test Drive"].filter(Boolean).join(", ") || "Not specified";
    const msg = `*New Inquiry — CanAm Off Road Hub*\n\n*Vehicle:* ${v.year} ${v.brand} ${v.name}\n*Color:* ${v.color}\n\n*Interest:* ${interestList}\n*Financing:* ${financing ? "Yes" : "No"}\n*Delivery:* ${delivery === "delivery" ? "Delivery to location" : "Self Pickup"}\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Message:* ${form.message || "—"}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

    const subject = encodeURIComponent(`Vehicle Inquiry: ${v.year} ${v.brand} ${v.name}`);
    const body = encodeURIComponent(msg.replace(/\*/g, ""));
    window.open(`mailto:${BIZ_EMAIL}?subject=${subject}&body=${body}`, "_blank");

    setSent(true);
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="bg-[#0c0e14] border border-[#1e2333] w-full max-w-lg my-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#6b7694] hover:text-white z-10"><X size={20}/></button>

        {sent ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 bg-[#f97316]/10 border border-[#f97316]/30 rounded-full flex items-center justify-center mx-auto mb-5"><Check size={24} className="text-[#f97316]"/></div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">Request Sent</h3>
            <p className="text-[#9ba4be] text-sm leading-relaxed mb-6">Your inquiry has been sent via WhatsApp and email. Our team will be in touch shortly.</p>
            <button onClick={onClose} className="btn-gold w-full justify-center">Close</button>
          </div>
        ) : (
          <>
            <div className="px-7 py-6 border-b border-[#1e2333]">
              <p className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#f97316] mb-1">Secure This Vehicle</p>
              <h3 className="font-playfair text-xl font-bold text-white leading-snug">{v.year} {v.brand} {v.name}</h3>
              <p className="font-cond text-[11px] text-[#6b7694] mt-1">{v.color}</p>
            </div>

            <div className="px-7 py-6 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: "65vh" }}>
              <div>
                <p className="font-cond text-[11px] tracking-[0.15em] uppercase text-[#9ba4be] mb-3">I am interested in</p>
                <div className="flex flex-col gap-2">
                  {([["purchase", "Purchase This Vehicle"], ["rent", "Rent This Vehicle"], ["testDrive", "Schedule a Test Drive"]] as const).map(([k, label]) => (
                    <label key={k} className="flex items-center gap-3 cursor-pointer group/cb">
                      <div onClick={() => toggleInterest(k)} className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all ${interests[k] ? "bg-[#f97316] border-[#f97316]" : "border-[#3a4060] group-hover/cb:border-[#f97316]/60"}`}>
                        {interests[k] && <Check size={10} className="text-white"/>}
                      </div>
                      <span className="font-cond text-[12px] text-[#9ba4be]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer bg-[#12151e] border border-[#1e2333] px-4 py-3">
                <div onClick={() => setFinancing(p => !p)} className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all ${financing ? "bg-[#f97316] border-[#f97316]" : "border-[#3a4060]"}`}>
                  {financing && <Check size={10} className="text-white"/>}
                </div>
                <span className="font-cond text-[12px] text-[#9ba4be]">I would like to purchase via <span className="text-white font-bold">Financing</span></span>
              </label>

              <div className="bg-[#f97316]/5 border border-[#f97316]/20 px-4 py-3">
                <p className="font-cond text-[11px] tracking-wide text-[#f97316]">💳 A <strong>$2,000 deposit</strong> is required to secure this vehicle.</p>
              </div>

              <div>
                <p className="font-cond text-[11px] tracking-[0.15em] uppercase text-[#9ba4be] mb-3">Preferred Delivery Method</p>
                <div className="flex flex-col gap-2">
                  {([["delivery", "Delivery to My Preferred Location"], ["pickup", "Self Pickup"]] as const).map(([val, label]) => (
                    <label key={val} onClick={() => setDelivery(val)} className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${delivery === val ? "border-[#f97316]" : "border-[#3a4060]"}`}>
                        {delivery === val && <div className="w-2 h-2 rounded-full bg-[#f97316]"/>}
                      </div>
                      <span className="font-cond text-[12px] text-[#9ba4be]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-cond text-[11px] tracking-[0.15em] uppercase text-[#9ba4be]">Your Information</p>
                <input className="input" placeholder="Full Name *" value={form.name} onChange={set("name")}/>
                <input className="input" placeholder="Phone Number *" value={form.phone} onChange={set("phone")}/>
                <input className="input" type="email" placeholder="Email Address *" value={form.email} onChange={set("email")}/>
                <textarea className="input resize-none" rows={3} placeholder="Message (optional)" value={form.message} onChange={set("message")}/>
              </div>

              <div className="bg-[#12151e] border border-[#1e2333] px-4 py-3 flex flex-col gap-1.5">
                <p className="font-cond text-[10px] tracking-[0.15em] uppercase text-[#6b7694] mb-1">Or reach us directly</p>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" className="font-cond text-[12px] text-[#25d366] hover:underline">📱 WhatsApp: +1 (503) 913-4945</a>
                <a href={`mailto:${BIZ_EMAIL}`} className="font-cond text-[12px] text-[#f97316] hover:underline">✉️ {BIZ_EMAIL}</a>
              </div>
            </div>

            <div className="px-7 py-5 border-t border-[#1e2333]">
              <button onClick={handleSubmit} disabled={busy} className="btn-gold w-full justify-center text-[13px] py-3.5">
                {busy ? "Sending..." : "Secure This Vehicle Now →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Product Page ── */
export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/vehicles")
      .then(r => r.json())
      .then((data: Vehicle[]) => {
        const v = data.find(x => String(x.id) === params.id);
        setVehicle(v ?? null);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-[#060709] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#f97316]/30 border-t-[#f97316] rounded-full animate-spin"/>
    </div>
  );

  if (!vehicle) return (
    <div className="min-h-screen bg-[#060709] flex flex-col items-center justify-center gap-4">
      <p className="font-playfair text-2xl text-white">Vehicle not found.</p>
      <Link href="/inventory" className="btn-gold">Back to Inventory</Link>
    </div>
  );

  const v = vehicle;
  const allImages = v.image && v.images && v.images.length > 0 ? [v.image, ...v.images] : v.image ? [v.image] : v.images ?? [];

  const goTo = (i: number) => {
    setCurrent(i);
    thumbsRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      {showModal && <ShopModal vehicle={v} onClose={() => setShowModal(false)}/>}

      <div className="min-h-screen bg-[#060709]">
        <div className="bg-[#0c0e14] border-b border-[#1e2333] px-[5%] py-3">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 font-cond text-[11px] tracking-wide text-[#6b7694]">
            <Link href="/" className="hover:text-[#f97316] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/inventory" className="hover:text-[#f97316] transition-colors">Inventory</Link>
            <span>/</span>
            <span className="text-[#9ba4be]">{v.name}</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-[5%] py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Gallery */}
            <div className="lg:sticky lg:top-6">
              <div className="relative w-full aspect-[4/3] bg-[#12151e] overflow-hidden border border-[#1e2333]">
                {allImages.length > 0 ? (
                  <Image src={allImages[current]} alt={`${v.name} ${current + 1}`} fill className="object-cover transition-opacity duration-300" sizes="(max-width:1024px) 100vw, 50vw"/>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[80px]">{v.emoji}</div>
                )}
                {allImages.length > 1 && (
                  <>
                    <button onClick={() => goTo(current === 0 ? allImages.length - 1 : current - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors"><ChevronLeft size={20}/></button>
                    <button onClick={() => goTo(current === allImages.length - 1 ? 0 : current + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-[#f97316] text-white flex items-center justify-center transition-colors"><ChevronRight size={20}/></button>
                    <div className="absolute bottom-3 right-3 z-20 bg-black/70 font-cond text-[11px] text-white px-2.5 py-1">{current + 1} / {allImages.length}</div>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div ref={thumbsRef} className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => goTo(i)} className={`relative shrink-0 w-[80px] h-[56px] border-2 overflow-hidden transition-all ${i === current ? "border-[#f97316]" : "border-[#1e2333] hover:border-[#f97316]/50"}`}>
                      <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover"/>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-cond text-[11px] tracking-[0.25em] uppercase text-[#f97316] mb-2">{v.brand} · {v.year} · {v.type === "sxs" ? "Side-by-Side" : v.type === "atv" ? "ATV" : v.type}</p>
                <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">{v.name}</h1>
                <p className="font-cond text-[13px] tracking-wide text-[#6b7694] uppercase">{v.color}</p>
              </div>

              <div className="border-t border-b border-[#1e2333] py-5">
                <div className="font-playfair text-[38px] font-bold text-[#f97316] leading-none">${v.price.toLocaleString()}</div>
                {v.monthly ? <p className="font-cond text-[12px] text-[#6b7694] mt-1">from ${v.monthly}/mo* · Financing available</p> : null}
              </div>

              {v.description && (
                <div>
                  <p className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#9ba4be] mb-3">About This Vehicle</p>
                  <p className="text-[#9ba4be] text-[14px] leading-relaxed whitespace-pre-line">{v.description}</p>
                </div>
              )}

              {v.specs && v.specs.length > 0 && (
                <div>
                  <p className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#9ba4be] mb-3">Key Specifications</p>
                  <ul className="flex flex-col gap-2">
                    {v.specs.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 font-cond text-[12px] text-[#9ba4be] tracking-wide">
                        <span className="text-[#f97316] mt-0.5 shrink-0">—</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <button onClick={() => setShowModal(true)} className="btn-gold w-full justify-center text-[14px] py-4 tracking-[0.15em]">
                  Shop Now — Secure This Vehicle
                </button>
                <p className="font-cond text-[10px] text-[#6b7694] text-center mt-3 tracking-wide">$2,000 deposit required · Financing available · Delivery to your location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}