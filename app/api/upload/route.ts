import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dgpa77jqb",
  api_key:    "641532864343218",
  api_secret: "fE3bVVzMJRZNtdEI1BRGvjE9Blg",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File;
    const folder   = (formData.get("folder") as string) || "vehicles";

    if (!file) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `canam-hub/${folder}`, resource_type: "image" },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ ok: true, path: result.secure_url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}