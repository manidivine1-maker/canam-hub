import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kullxgarmjlhugduijsz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bGx4Z2FybWpsaHVnZHVpanN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjc5MDEsImV4cCI6MjA5Mzc0MzkwMX0.dPJbyxMeDpg1ssfbTXNs-T_Dz-kiUuFoByTAV3jrD0c"
);

const DEFAULT = {
  name:"CanAm Off Road Hub",
  tagline:"Premium ATVs, SxS & Off-Road Vehicles",
  phone:"(503) 913-4945",
  phoneRaw:"15039134945",
  email:"canam.offroadhub@gmail.com",
  address:"United States",
  mapUrl:"",instagram:"",facebook:"",
  hours:[
    {day:"Monday - Friday",time:"9:00 AM - 6:00 PM",open:true},
    {day:"Saturday",time:"9:00 AM - 4:00 PM",open:true},
    {day:"Sunday",time:"Closed",open:false}
  ]
};

export async function GET() {
  const { data } = await supabase.from("site_info").select("*").order("id").limit(1);
  if (!data || data.length === 0) return NextResponse.json(DEFAULT);
  return NextResponse.json(data[0].data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { data: existing } = await supabase.from("site_info").select("id").limit(1);
  if (existing && existing.length > 0) {
    await supabase.from("site_info").update({ data: body, updated_at: new Date().toISOString() }).eq("id", existing[0].id);
  } else {
    await supabase.from("site_info").insert({ data: body });
  }
  return NextResponse.json({ ok: true });
}