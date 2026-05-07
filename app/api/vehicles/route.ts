import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const FILE = join(process.cwd(),"data","vehicles.json");
function read(){try{return JSON.parse(readFileSync(FILE,"utf-8"));}catch{return[];}}
function write(d:unknown){writeFileSync(FILE,JSON.stringify(d,null,2));}
export async function GET(){return NextResponse.json(read());}
export async function POST(req:Request){const body=await req.json();const data=read();const item={...body,id:Date.now()};data.push(item);write(data);return NextResponse.json({ok:true,item});}
export async function PUT(req:Request){const body=await req.json();const data=read();const idx=data.findIndex((v:{id:number})=>v.id===body.id);if(idx===-1)return NextResponse.json({ok:false},{status:404});data[idx]=body;write(data);return NextResponse.json({ok:true});}
export async function DELETE(req:Request){const{id}=await req.json();write(read().filter((v:{id:number})=>v.id!==id));return NextResponse.json({ok:true});}
