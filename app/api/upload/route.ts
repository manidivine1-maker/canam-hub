import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
export async function POST(req:Request){
  try{
    const formData=await req.formData();
    const file=formData.get("file") as File;
    const folder=(formData.get("folder") as string)||"vehicles";
    if(!file)return NextResponse.json({ok:false,error:"No file"},{status:400});
    const bytes=await file.arrayBuffer();
    const buffer=Buffer.from(bytes);
    const safeName=file.name.replace(/[^a-zA-Z0-9.\-_]/g,"-").toLowerCase();
    const dir=join(process.cwd(),"public",folder);
    mkdirSync(dir,{recursive:true});
    writeFileSync(join(dir,safeName),buffer);
    return NextResponse.json({ok:true,path:`/${folder}/${safeName}`});
  }catch(e){return NextResponse.json({ok:false,error:String(e)},{status:500});}
}
