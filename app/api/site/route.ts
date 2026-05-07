import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","site.json");
const DEFAULT = {name:"CanAm Off Road Hub",tagline:"Premium ATVs, SxS & Off-Road Vehicles",phone:"(555) 123-4567",phoneRaw:"15551234567",email:"info@canamoffroadhub.com",address:"123 Off-Road Way, Centre, CM 12345",mapUrl:"",instagram:"",facebook:"",hours:[{day:"Monday - Friday",time:"9:00 AM - 6:00 PM",open:true},{day:"Saturday",time:"9:00 AM - 4:00 PM",open:true},{day:"Sunday",time:"Closed",open:false}]};
function read(){try{const d=JSON.parse(readFileSync(FILE,"utf-8"));return Object.keys(d).length>0?d:DEFAULT;}catch{return DEFAULT;}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function PUT(req:Request){const body=await req.json();write(body);return NextResponse.json({ok:true});}
