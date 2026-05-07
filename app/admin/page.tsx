"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Save, X, Upload, Car, CalendarDays, MessageSquare, Settings, LogOut, Eye, EyeOff, Check } from "lucide-react";

const ADMIN_PASSWORD = "canam2024";

interface Vehicle { id:number; brand:string; name:string; year:number; type:string; badge:string; engine:string; hp:number; seats:number; specs:string[]; price:number; monthly:number|null; emoji:string; color:string; featured:boolean; image:string; images:string[]; description:string; }
interface Rental { id:number; name:string; emoji:string; popular:boolean; tagline:string; description:string; halfDay:number; fullDay:number; weekend:number; deposit:number; features:string[]; gear:string[]; image:string; }
interface Testimonial { id:number; name:string; initials:string; location:string; role:string; vehicle:string; rating:number; text:string; }
interface SiteInfo { name:string; tagline:string; phone:string; phoneRaw:string; email:string; address:string; mapUrl:string; instagram:string; facebook:string; hours:{day:string;time:string;open:boolean}[]; }

function Toast({msg,ok}:{msg:string;ok:boolean}){
  return <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 font-cond text-[13px] font-bold tracking-wide text-white shadow-xl ${ok?"bg-green-600":"bg-red-600"}`}>{ok?"✅":"❌"} {msg}</div>;
}

function ImageUpload({value,onChange,folder}:{value:string;onChange:(p:string)=>void;folder:string}){
  const ref=useRef<HTMLInputElement>(null);
  const [busy,setBusy]=useState(false);
  const upload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];if(!file)return;
    setBusy(true);const fd=new FormData();fd.append("file",file);fd.append("folder",folder);
    const res=await fetch("/api/upload",{method:"POST",body:fd});const data=await res.json();
    if(data.ok)onChange(data.path);setBusy(false);
  };
  return (
    <div>
      <label className="label">Main Photo</label>
      <div className="flex gap-3 items-center">
        {value&&<img src={value} alt="" className="w-20 h-14 object-cover border border-[#1e2333]"/>}
        <button type="button" onClick={()=>ref.current?.click()} className="btn-outline text-[12px] py-2" disabled={busy}><Upload size={14}/>{busy?"Uploading...":value?"Change Photo":"Upload Photo"}</button>
        {value&&<button type="button" onClick={()=>onChange("")} className="text-[#6b7694] hover:text-red-400"><X size={16}/></button>}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={upload}/>
      </div>
      {value&&<p className="text-[#6b7694] text-xs mt-1">{value}</p>}
    </div>
  );
}

function MultiImageUpload({onUpload,folder}:{onUpload:(p:string)=>void;folder:string}){
  const ref=useRef<HTMLInputElement>(null);
  const [busy,setBusy]=useState(false);
  const upload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];if(!file)return;
    setBusy(true);const fd=new FormData();fd.append("file",file);fd.append("folder",folder);
    const res=await fetch("/api/upload",{method:"POST",body:fd});const data=await res.json();
    if(data.ok)onUpload(data.path);setBusy(false);
    if(ref.current)ref.current.value="";
  };
  return (
    <div>
      <button type="button" onClick={()=>ref.current?.click()} className="btn-outline text-[12px] py-2" disabled={busy}>
        <Upload size={14}/>{busy?"Uploading...":"Add Another Photo"}
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={upload}/>
    </div>
  );
}

function PasswordGate({onUnlock}:{onUnlock:()=>void}){
  const [pw,setPw]=useState("");const [show,setShow]=useState(false);const [error,setError]=useState(false);
  const attempt=()=>{if(pw===ADMIN_PASSWORD){onUnlock();}else{setError(true);setTimeout(()=>setError(false),2000);}};
  return (
    <div className="min-h-screen bg-[#060709] flex items-center justify-center px-4">
      <div className="bg-[#0c0e14] border border-[#1e2333] p-10 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="font-playfair text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-[#6b7694] text-sm mb-8">CanAm Off Road Hub - Content Management</p>
        <div className="relative mb-4">
          <input type={show?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&attempt()} placeholder="Enter admin password" className={`input text-center pr-12 ${error?"border-red-500":""}`}/>
          <button onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7694] hover:text-white">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button>
        </div>
        {error&&<p className="text-red-400 text-sm mb-4">Incorrect password.</p>}
        <button onClick={attempt} className="btn-gold w-full justify-center">Unlock Dashboard</button>
      </div>
    </div>
  );
}

function Modal({modal,onClose,onSave}:{modal:{type:string;mode:string;data?:unknown};onClose:()=>void;onSave:(d:unknown)=>void}){
  const isV=modal.type==="vehicle",isR=modal.type==="rental",isT=modal.type==="testimonial";
  const VB:Vehicle={id:0,brand:"Can-Am",name:"New Vehicle",year:2024,type:"sxs",badge:"new",engine:"976cc V-Twin",hp:100,seats:2,specs:["100 HP","2-Seat"],price:10000,monthly:null,emoji:"🏎️",color:"Black",featured:false,image:"",images:[],description:"Vehicle description"};
  const RB:Rental={id:0,name:"",emoji:"🏍️",popular:false,tagline:"",description:"",halfDay:0,fullDay:0,weekend:0,deposit:300,features:[],gear:[],image:""};
  const TB:Testimonial={id:0,name:"",initials:"",location:"",role:"Verified Buyer",vehicle:"",rating:5,text:""};
  const [form,setForm]=useState<unknown>(modal.data??(isV?VB:isR?RB:TB));
  const v=form as Vehicle;const r=form as Rental;const t=form as Testimonial;
  const sv=(k:keyof Vehicle,val:unknown)=>setForm((p:unknown)=>({...(p as Vehicle),[k]:val}));
  const sr=(k:keyof Rental,val:unknown)=>setForm((p:unknown)=>({...(p as Rental),[k]:val}));
  const st=(k:keyof Testimonial,val:unknown)=>setForm((p:unknown)=>({...(p as Testimonial),[k]:val}));

  const handleSave=()=>{
    console.log("Saving form:",form);
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-[#0c0e14] border border-[#1e2333] w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2333]">
          <h3 className="font-playfair text-xl font-bold text-white">{modal.mode==="add"?"Add":"Edit"} {isV?"Vehicle":isR?"Rental":"Review"}</h3>
          <button onClick={onClose} className="text-[#6b7694] hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 flex flex-col gap-4 overflow-y-auto" style={{maxHeight:"65vh"}}>
          {isV&&(<>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Brand</label><input className="input" value={v.brand} onChange={e=>sv("brand",e.target.value)}/></div>
              <div><label className="label">Model Name *</label><input className="input" value={v.name} onChange={e=>sv("name",e.target.value)} placeholder="Maverick X3"/></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="label">Year</label><input className="input" type="number" value={v.year} onChange={e=>sv("year",Number(e.target.value))}/></div>
              <div><label className="label">Type</label><select className="input" value={v.type} onChange={e=>sv("type",e.target.value)}><option value="sxs">Side-by-Side</option><option value="atv">ATV</option><option value="utility">Utility</option><option value="used">Pre-Owned</option></select></div>
              <div><label className="label">Badge</label><select className="input" value={v.badge??""} onChange={e=>sv("badge",e.target.value||null)}><option value="">None</option><option value="hot">Best Seller</option><option value="new">New</option><option value="cpo">CPO Certified</option></select></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="label">Engine</label><input className="input" value={v.engine} onChange={e=>sv("engine",e.target.value)}/></div>
              <div><label className="label">HP</label><input className="input" type="number" value={v.hp} onChange={e=>sv("hp",Number(e.target.value))}/></div>
              <div><label className="label">Seats</label><input className="input" type="number" value={v.seats} onChange={e=>sv("seats",Number(e.target.value))}/></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Price ($)</label><input className="input" type="number" value={v.price} onChange={e=>sv("price",Number(e.target.value))}/></div>
              <div><label className="label">Monthly ($ or 0)</label><input className="input" type="number" value={v.monthly??0} onChange={e=>sv("monthly",Number(e.target.value)||null)}/></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Color</label><input className="input" value={v.color} onChange={e=>sv("color",e.target.value)}/></div>
              <div><label className="label">Emoji</label><input className="input" value={v.emoji} onChange={e=>sv("emoji",e.target.value)}/></div>
            </div>
            <div><label className="label">Specs (one per line)</label><textarea className="input resize-none" rows={3} value={v.specs.join("\n")} onChange={e=>sv("specs",e.target.value.split("\n").filter(Boolean))}/></div>
            <div><label className="label">Description</label><textarea className="input resize-none" rows={2} value={v.description} onChange={e=>sv("description",e.target.value)}/></div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={v.featured} onChange={e=>sv("featured",e.target.checked)} className="accent-[#f97316] w-4 h-4"/><span className="font-cond text-[12px] uppercase tracking-wide text-[#9ba4be]">Show on Homepage</span></label>
            <ImageUpload value={v.image} onChange={val=>sv("image",val)} folder="vehicles"/>
            <div>
              <label className="label">Additional Photos</label>
              <div className="flex flex-col gap-2">
                {(v.images||[]).map((img:string,i:number)=>(
                  <div key={i} className="flex items-center gap-2">
                    <img src={img} alt="" className="w-16 h-10 object-cover border border-[#1e2333]"/>
                    <span className="text-[#6b7694] text-xs flex-1 truncate">{img}</span>
                    <button type="button" onClick={()=>sv("images",(v.images||[]).filter((_:string,j:number)=>j!==i))} className="text-red-400 hover:text-red-300"><X size={14}/></button>
                  </div>
                ))}
                <MultiImageUpload onUpload={(path:string)=>sv("images",[...(v.images||[]),path])} folder="vehicles"/>
              </div>
            </div>
          </>)}
          {isR&&(<>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Name *</label><input className="input" value={r.name} onChange={e=>sr("name",e.target.value)}/></div>
              <div><label className="label">Emoji</label><input className="input" value={r.emoji} onChange={e=>sr("emoji",e.target.value)}/></div>
            </div>
            <div><label className="label">Tagline</label><input className="input" value={r.tagline} onChange={e=>sr("tagline",e.target.value)}/></div>
            <div><label className="label">Description</label><textarea className="input resize-none" rows={2} value={r.description} onChange={e=>sr("description",e.target.value)}/></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="label">Half Day ($)</label><input className="input" type="number" value={r.halfDay} onChange={e=>sr("halfDay",Number(e.target.value))}/></div>
              <div><label className="label">Full Day ($)</label><input className="input" type="number" value={r.fullDay} onChange={e=>sr("fullDay",Number(e.target.value))}/></div>
              <div><label className="label">Weekend ($)</label><input className="input" type="number" value={r.weekend} onChange={e=>sr("weekend",Number(e.target.value))}/></div>
            </div>
            <div><label className="label">Deposit ($)</label><input className="input" type="number" value={r.deposit} onChange={e=>sr("deposit",Number(e.target.value))}/></div>
            <div><label className="label">Features (one per line)</label><textarea className="input resize-none" rows={3} value={r.features.join("\n")} onChange={e=>sr("features",e.target.value.split("\n").filter(Boolean))}/></div>
            <div><label className="label">Gear Included (one per line)</label><textarea className="input resize-none" rows={2} value={r.gear.join("\n")} onChange={e=>sr("gear",e.target.value.split("\n").filter(Boolean))}/></div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={r.popular} onChange={e=>sr("popular",e.target.checked)} className="accent-[#f97316] w-4 h-4"/><span className="font-cond text-[12px] uppercase tracking-wide text-[#9ba4be]">Mark as Most Popular</span></label>
            <ImageUpload value={r.image} onChange={val=>sr("image",val)} folder="rentals"/>
          </>)}
          {isT&&(<>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Customer Name *</label><input className="input" value={t.name} onChange={e=>st("name",e.target.value)} placeholder="Marcus J."/></div>
              <div><label className="label">Initials</label><input className="input" maxLength={2} value={t.initials} onChange={e=>st("initials",e.target.value.toUpperCase())} placeholder="MJ"/></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Location</label><input className="input" value={t.location} onChange={e=>st("location",e.target.value)} placeholder="Austin, TX"/></div>
              <div><label className="label">Role</label><select className="input" value={t.role} onChange={e=>st("role",e.target.value)}><option>Verified Buyer</option><option>Rental Customer</option><option>Service Customer</option></select></div>
            </div>
            <div><label className="label">Vehicle / Service</label><input className="input" value={t.vehicle} onChange={e=>st("vehicle",e.target.value)}/></div>
            <div><label className="label">Star Rating</label><select className="input" value={t.rating} onChange={e=>st("rating",Number(e.target.value))}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{"★".repeat(n)} ({n} stars)</option>)}</select></div>
            <div><label className="label">Review Text *</label><textarea className="input resize-none" rows={4} value={t.text} onChange={e=>st("text",e.target.value)}/></div>
          </>)}
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1e2333] bg-[#0c0e14]">
          <button type="button" onClick={onClose} className="btn-outline py-2.5 px-6">Cancel</button>
          <button type="button" onClick={handleSave} className="btn-gold py-2.5 px-6"><Save size={15}/>{modal.mode==="add"?"Add":"Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}

function SiteEditor({data,onChange,onSave}:{data:SiteInfo;onChange:(d:SiteInfo)=>void;onSave:(d:SiteInfo)=>void}){
  const set=(k:keyof SiteInfo,v:unknown)=>onChange({...data,[k]:v});
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl font-bold text-white">Site Info & Contact Details</h2>
        <button onClick={()=>onSave(data)} className="btn-gold"><Save size={16}/>Save All Changes</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#0c0e14] border border-[#1e2333] p-6">
          <div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Contact Information</div>
          <div className="flex flex-col gap-4">
            <div><label className="label">Business Name</label><input className="input" value={data.name} onChange={e=>set("name",e.target.value)}/></div>
            <div><label className="label">Tagline</label><input className="input" value={data.tagline} onChange={e=>set("tagline",e.target.value)}/></div>
            <div><label className="label">WhatsApp (displayed)</label><input className="input" value={data.phone} onChange={e=>set("phone",e.target.value)} placeholder="(503) 913-4945"/></div>
            <div><label className="label">WhatsApp Raw (no spaces)</label><input className="input" value={data.phoneRaw} onChange={e=>set("phoneRaw",e.target.value)} placeholder="15039134945"/></div>
            <div><label className="label">Email</label><input className="input" type="email" value={data.email} onChange={e=>set("email",e.target.value)}/></div>
            <div><label className="label">Location</label><input className="input" value={data.address} onChange={e=>set("address",e.target.value)} placeholder="United States"/></div>
            <div><label className="label">Google Maps Embed URL</label><input className="input" value={data.mapUrl} onChange={e=>set("mapUrl",e.target.value)}/></div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-[#0c0e14] border border-[#1e2333] p-6">
            <div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Social Media</div>
            <div className="flex flex-col gap-4">
              <div><label className="label">Instagram URL</label><input className="input" value={data.instagram} onChange={e=>set("instagram",e.target.value)}/></div>
              <div><label className="label">Facebook URL</label><input className="input" value={data.facebook} onChange={e=>set("facebook",e.target.value)}/></div>
            </div>
          </div>
          <div className="bg-[#0c0e14] border border-[#1e2333] p-6">
            <div className="font-cond text-[11px] tracking-[0.2em] uppercase text-[#f97316] mb-5">Business Hours</div>
            {data.hours.map((h,i)=>(
              <div key={i} className="flex items-center gap-3 mb-3">
                <span className="font-cond text-[12px] text-[#9ba4be] w-32 shrink-0">{h.day}</span>
                <input className="input flex-1" value={h.time} onChange={e=>{const hrs=[...data.hours];hrs[i]={...hrs[i],time:e.target.value};set("hours",hrs);}}/>
                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                  <input type="checkbox" checked={h.open} onChange={e=>{const hrs=[...data.hours];hrs[i]={...hrs[i],open:e.target.checked};set("hours",hrs);}} className="accent-[#f97316] w-4 h-4"/>
                  <span className="font-cond text-[11px] text-[#6b7694] uppercase">Open</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [unlocked,setUnlocked]=useState(false);
  const [tab,setTab]=useState<"vehicles"|"rentals"|"testimonials"|"site">("vehicles");
  const [toast,setToast]=useState<{msg:string;ok:boolean}|null>(null);
  const [vehicles,setVehicles]=useState<Vehicle[]>([]);
  const [rentals,setRentals]=useState<Rental[]>([]);
  const [testimonials,setTestimonials]=useState<Testimonial[]>([]);
  const [siteInfo,setSiteInfo]=useState<SiteInfo|null>(null);
  const [modal,setModal]=useState<{type:"vehicle"|"rental"|"testimonial";mode:"add"|"edit";data?:unknown}|null>(null);
  const showToast=(msg:string,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const reload=()=>{fetch("/api/vehicles").then(r=>r.json()).then(setVehicles);fetch("/api/rentals").then(r=>r.json()).then(setRentals);fetch("/api/testimonials").then(r=>r.json()).then(setTestimonials);};
  useEffect(()=>{if(!unlocked)return;reload();fetch("/api/site").then(r=>r.json()).then(setSiteInfo);},[unlocked]);
  if(!unlocked)return <PasswordGate onUnlock={()=>setUnlocked(true)}/>;
  const TABS=[{id:"vehicles",icon:<Car size={16}/>,label:"Inventory",count:vehicles.length},{id:"rentals",icon:<CalendarDays size={16}/>,label:"Rentals",count:rentals.length},{id:"testimonials",icon:<MessageSquare size={16}/>,label:"Reviews",count:testimonials.length},{id:"site",icon:<Settings size={16}/>,label:"Site Info",count:null}] as const;
  return (
    <div className="min-h-screen bg-[#060709]">
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
      {modal&&(
        <Modal modal={modal} onClose={()=>setModal(null)} onSave={async(data)=>{
          const url=`/api/${modal.type==="vehicle"?"vehicles":modal.type==="rental"?"rentals":"testimonials"}`;
          const res=await fetch(url,{method:modal.mode==="add"?"POST":"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
          const json=await res.json();
          if(json.ok){reload();showToast(`${modal.mode==="add"?"Added":"Updated"} successfully!`);setModal(null);}
          else showToast("Something went wrong.",false);
        }}/>
      )}
      <div className="bg-[#0c0e14] border-b border-[#1e2333] px-6 py-4 flex items-center justify-between">
        <div><div className="font-playfair text-[22px] font-bold text-white">Admin Dashboard</div><div className="font-cond text-[10px] tracking-[0.2em] uppercase text-[#f97316]">CanAm Off Road Hub</div></div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="btn-outline text-[12px] py-2 px-4"><Eye size={14}/>View Site</a>
          <button onClick={()=>setUnlocked(false)} className="btn-red py-2 px-4"><LogOut size={14}/>Lock</button>
        </div>
      </div>
      <div className="bg-[#0c0e14] border-b border-[#1e2333] px-6 flex gap-1">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-2 font-cond text-[12px] tracking-[0.1em] uppercase px-5 py-4 border-b-2 transition-all ${tab===t.id?"text-[#f97316] border-[#f97316]":"text-[#6b7694] border-transparent hover:text-white"}`}>
            {t.icon}{t.label}
            {t.count!==null&&<span className={`text-[10px] px-1.5 py-0.5 ${tab===t.id?"bg-[#f97316]/20 text-[#f97316]":"bg-[#1e2333] text-[#6b7694]"}`}>{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="px-6 py-8 max-w-[1400px] mx-auto">
        {tab==="vehicles"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-white">Inventory <span className="text-[#6b7694] text-lg">({vehicles.length})</span></h2>
              <button onClick={()=>setModal({type:"vehicle",mode:"add"})} className="btn-gold"><Plus size={16}/>Add Vehicle</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {vehicles.length===0&&<div className="text-center py-16 text-[#6b7694]"><Car size={40} className="mx-auto mb-3 opacity-30"/><p>No vehicles yet. Click Add Vehicle to get started.</p></div>}
              {vehicles.map(v=>(
                <div key={v.id} className="bg-[#0c0e14] border border-[#1e2333] p-4 flex items-center gap-4 hover:border-[#f97316]/30 transition-colors">
                  <div className="w-16 h-12 bg-[#12151e] flex items-center justify-center shrink-0 overflow-hidden">
                    {v.image?<img src={v.image} alt={v.name} className="w-full h-full object-cover"/>:<span className="text-2xl">{v.emoji}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-playfair font-bold text-white text-[15px]">{v.name}</span>
                      {v.badge&&<span className={`font-cond text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${v.badge==="hot"?"bg-red-600 text-white":v.badge==="new"?"bg-[#f97316] text-white":"bg-emerald-700 text-white"}`}>{v.badge}</span>}
                      {v.featured&&<span className="font-cond text-[9px] font-bold uppercase px-2 py-0.5 bg-blue-700 text-white">Featured</span>}
                      {v.images&&v.images.length>0&&<span className="font-cond text-[9px] uppercase px-2 py-0.5 bg-[#1e2333] text-[#9ba4be]">{v.images.length+1} photos</span>}
                    </div>
                    <div className="font-cond text-[11px] text-[#6b7694] mt-0.5">{v.year} - {v.type} - {v.engine}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-playfair font-bold text-[#f97316] text-[17px]">${v.price.toLocaleString()}</div>
                    {v.monthly&&<div className="text-[#6b7694] text-xs">${v.monthly}/mo</div>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={()=>setModal({type:"vehicle",mode:"edit",data:v})} className="w-8 h-8 bg-[#1e2333] hover:bg-[#252b3d] text-[#9ba4be] hover:text-white flex items-center justify-center transition-colors"><Pencil size={14}/></button>
                    <button onClick={async()=>{if(!confirm(`Delete "${v.name}"?`))return;await fetch("/api/vehicles",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:v.id})});setVehicles(p=>p.filter(x=>x.id!==v.id));showToast("Deleted.");}} className="w-8 h-8 bg-[#1e2333] hover:bg-red-900/40 text-[#6b7694] hover:text-red-400 flex items-center justify-center transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="rentals"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-white">Rental Fleet</h2>
              <button onClick={()=>setModal({type:"rental",mode:"add"})} className="btn-gold"><Plus size={16}/>Add Rental</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {rentals.length===0&&<div className="text-center py-16 text-[#6b7694]"><CalendarDays size={40} className="mx-auto mb-3 opacity-30"/><p>No rentals yet.</p></div>}
              {rentals.map(r=>(
                <div key={r.id} className="bg-[#0c0e14] border border-[#1e2333] p-4 flex items-center gap-4 hover:border-[#f97316]/30 transition-colors">
                  <div className="text-3xl shrink-0">{r.emoji}</div>
                  <div className="flex-1"><div className="flex items-center gap-2"><span className="font-playfair font-bold text-white">{r.name}</span>{r.popular&&<span className="font-cond text-[9px] font-bold uppercase px-2 py-0.5 bg-[#f97316] text-white">Popular</span>}</div><div className="font-cond text-[11px] text-[#6b7694] mt-0.5">{r.tagline}</div></div>
                  <div className="text-right shrink-0"><div className="font-playfair font-bold text-[#f97316]">${r.halfDay}/half · ${r.fullDay}/day</div></div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={()=>setModal({type:"rental",mode:"edit",data:r})} className="w-8 h-8 bg-[#1e2333] hover:bg-[#252b3d] text-[#9ba4be] hover:text-white flex items-center justify-center transition-colors"><Pencil size={14}/></button>
                    <button onClick={async()=>{if(!confirm(`Delete "${r.name}"?`))return;await fetch("/api/rentals",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:r.id})});setRentals(p=>p.filter(x=>x.id!==r.id));showToast("Deleted.");}} className="w-8 h-8 bg-[#1e2333] hover:bg-red-900/40 text-[#6b7694] hover:text-red-400 flex items-center justify-center transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="testimonials"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-white">Customer Reviews</h2>
              <button onClick={()=>setModal({type:"testimonial",mode:"add"})} className="btn-gold"><Plus size={16}/>Add Review</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {testimonials.length===0&&<div className="text-center py-16 text-[#6b7694]"><MessageSquare size={40} className="mx-auto mb-3 opacity-30"/><p>No reviews yet.</p></div>}
              {testimonials.map(t=>(
                <div key={t.id} className="bg-[#0c0e14] border border-[#1e2333] p-4 flex items-start gap-4 hover:border-[#f97316]/30 transition-colors">
                  <div className="w-10 h-10 bg-[#12151e] border border-[#1e2333] flex items-center justify-center font-playfair font-bold text-[#f97316] shrink-0">{t.initials}</div>
                  <div className="flex-1"><div className="flex items-center gap-2 flex-wrap"><span className="font-playfair font-bold text-white">{t.name}</span><span className="text-[#f97316]">{"★".repeat(t.rating)}</span><span className="font-cond text-[10px] text-[#6b7694] uppercase">{t.location}</span></div><div className="font-cond text-[11px] text-[#f97316] mt-0.5">{t.vehicle}</div><p className="text-[#9ba4be] text-sm mt-1 line-clamp-2">{t.text}</p></div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={()=>setModal({type:"testimonial",mode:"edit",data:t})} className="w-8 h-8 bg-[#1e2333] hover:bg-[#252b3d] text-[#9ba4be] hover:text-white flex items-center justify-center transition-colors"><Pencil size={14}/></button>
                    <button onClick={async()=>{if(!confirm(`Delete review by "${t.name}"?`))return;await fetch("/api/testimonials",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t.id})});setTestimonials(p=>p.filter(x=>x.id!==t.id));showToast("Deleted.");}} className="w-8 h-8 bg-[#1e2333] hover:bg-red-900/40 text-[#6b7694] hover:text-red-400 flex items-center justify-center transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="site"&&siteInfo&&<SiteEditor data={siteInfo} onChange={setSiteInfo} onSave={async(d)=>{const res=await fetch("/api/site",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});const json=await res.json();if(json.ok)showToast("Saved!");else showToast("Error.",false);}}/>}
      </div>
    </div>
  );
}