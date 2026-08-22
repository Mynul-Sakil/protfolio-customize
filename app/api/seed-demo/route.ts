import { GET as seedMynulData } from "@/app/api/seed-mynul/route";

export async function GET() {
  return seedMynulData();
}
