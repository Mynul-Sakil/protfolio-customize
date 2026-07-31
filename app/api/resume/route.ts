import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    // We only want to keep one resume to save database space, so we clear old ones.
    await Resume.deleteMany({});
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const newResume = await Resume.create({
      fileName: file.name,
      contentType: file.type,
      data: buffer,
    });
    
    return NextResponse.json({ success: true, id: newResume._id });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    
    if (!resume) {
      return new NextResponse("Not Found", { status: 404 });
    }
    
    const headers = new Headers();
    headers.set("Content-Type", resume.contentType || "application/pdf");
    // headers.set("Content-Disposition", `attachment; filename="${resume.fileName}"`); // Un-comment to force download
    headers.set("Content-Disposition", `inline; filename="${resume.fileName}"`);
    
    return new NextResponse(resume.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
