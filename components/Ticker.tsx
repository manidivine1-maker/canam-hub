const ITEMS = ["Can-Am Maverick X3","Can-Am Defender","Can-Am Outlander","Can-Am Renegade","Premium Trail Rentals","Flexible Financing","Factory-Certified Service","Test Rides Available","Same-Day Delivery","CPO Pre-Owned Vehicles"];
export default function Ticker() {
  return (
    <div className="bg-[#f97316] py-3 overflow-hidden" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...ITEMS,...ITEMS].map((item,i) => (
          <span key={i} className="inline-flex items-center gap-5 px-7 font-cond text-[13px] font-bold tracking-[0.14em] uppercase text-white">
            {item}<span className="text-white/50 text-[9px]">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}
