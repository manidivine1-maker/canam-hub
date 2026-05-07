import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kullxgarmjlhugduijsz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bGx4Z2FybWpsaHVnZHVpanN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjc5MDEsImV4cCI6MjA5Mzc0MzkwMX0.dPJbyxMeDpg1ssfbTXNs-T_Dz-kiUuFoByTAV3jrD0c"
);

export async function GET() {
  const { data } = await supabase.from("testimonials").select("*").order("id");
  return NextResponse.json(data?.map(r => ({...r.data, id: r.id})) ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from("testimonials").insert({ data: body }).select().single();
  if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
  return NextResponse.json({ ok: true, item: {...data.data, id: data.id} });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...rest } = body;
  const { error } = await supabase.from("testimonials").update({ data: rest }).eq("id", id);
  if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
  return NextResponse.json({ ok: true });
}