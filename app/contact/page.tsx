"use client";
import { useState } from "react";
import { Mail, MapPin, Clock, MessageSquare, Check } from "lucide-react";
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
                {icon:<MapPin size={20}/>,label:"Location",content:<div><p className="text-[#9ba4be] text-sm font-bold">United States</p><p className="text-[#9ba4be] text-xs mt-1">Nationwide Delivery Available</p></div>},
                {icon:<MessageSquare size={20}/>,label:"WhatsApp Us",content:<div><a href="https://wa.me/15039134945" target="_blank" rel="noopener noreferrer" className="font-playfair text-[18px] font-bold text-white hover:text-[#f97316] transition-colors">(503) 913-4945</a><div className="mt-2"><a href="https://wa.me/15039134945" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#f97316] font-cond hover:underline"><MessageSquare size={13}/>Message on WhatsApp</a></div><p className="text-[#6b7694] text-xs mt-1">Fastest way to reach us</p></div>},
                {icon:<Mail size={20}/>,label:"Email Us",content:<div><a href="mailto:canam.offroadhub@gmail.com" className="text-[#9ba4be] text-sm hover:text-[#f97316] transition-colors">canam.offroadhub@gmail.com</a><p className="text-[#6b7694] text-xs mt-1">Response within 2-4 hours</p></div>},
                {icon:<Clock size={20}/>,label:"Business Hours",content:<div className="flex flex-col divide-y divide-[#1e2333]">{[{day:"Mon-Fri",time:"9AM-6PM",open:true},{day:"Saturday",time:"9AM-4PM",open:true},{day:"Sunday",time:"Closed",open:false}].map(({day,time,open})=><div key={day} className="flex justify-between text-sm gap-6 py-1.5"><span className="text-[#9ba4be]">{day}</span><span className={open?"text-green-400":"text-red-400"}>{time}</span></div>)}</div>},
              ].map(item=>(
                <div key={item.label} className="flex items-start gap-4 p-5 bg-[#181c28] border border-[#1e2333] hover:border-[#f97316]/30 transition-colors">
                  <div className="w-11 h-11 bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center text-[#f97316] shrink-0">{item.icon}</div>
                  <div><div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-2">{item.label}</div>{item.content}</div>
                </div>
              ))}
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
                    <div><label className="label">WhatsApp Number</label><input type="tel" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="(503) 913-4945" className="input"/></div>
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
      <CtaStrip title="Ready to Start Your Adventure?" subtitle="We are here Monday through Saturday." actions={[{label:"WhatsApp Us",href:"https://wa.me/15039134945",primary:true},{label:"Browse Inventory",href:"/inventory",primary:false}]}/>
    </>
  );
}