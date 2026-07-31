"use server";

import dbConnect from "@/lib/mongodb";
import Certification from "@/models/Certification";
import { revalidatePath } from "next/cache";

export async function getCertifications() {
  await dbConnect();
  const certs = await Certification.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(certs));
}

export async function createCertification(data: any) {
  try {
    await dbConnect();
    const newCert = await Certification.create(data);
    revalidatePath("/admin/certifications");
    revalidatePath("/");
    return { success: true, certification: JSON.parse(JSON.stringify(newCert)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCertification(id: string) {
  try {
    await dbConnect();
    await Certification.findByIdAndDelete(id);
    revalidatePath("/admin/certifications");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
